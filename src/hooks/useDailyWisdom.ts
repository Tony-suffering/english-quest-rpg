'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import wisdomData from '@/data/wisdom.json';

interface WisdomData {
    content: string;
    content_en?: string;
    source: string;
    image_url?: string;
}

export function useDailyWisdom() {
    const [dbQuote, setDbQuote] = useState<WisdomData | null>(null);

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const matchDate = `${yyyy}-${mm}-${dd}`;
    const dateString = `${yyyy}.${mm}.${dd}`;

    useEffect(() => {
        if (!supabase) {
            return;
        }

        async function fetchWisdom() {
            try {
                const { data, error } = await supabase
                    .from('wisdoms')
                    .select('content, content_en, source, image_url')
                    .eq('date', matchDate)
                    .limit(1)
                    .maybeSingle();

                if (data && !error) {
                    setDbQuote(data);
                }
            } catch {
                // Silently handle fetch errors
            }
        }

        fetchWisdom();

        // Realtime Subscription
        const channel = supabase
            .channel('wisdoms_auto_update')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'wisdoms',
                    filter: `date=eq.${matchDate}`,
                },
                (payload) => {
                    if (payload.new) {
                        const newRecord = payload.new as WisdomData;
                        setDbQuote({
                            content: newRecord.content,
                            content_en: newRecord.content_en,
                            source: newRecord.source,
                            image_url: newRecord.image_url
                        });
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [matchDate]);

    if (dbQuote) {
        return { quote: dbQuote, dateString };
    }

    const specificQuote = (wisdomData as any[]).find((item: any) => item.date === matchDate);
    if (specificQuote) {
        return { quote: specificQuote, dateString };
    }

    const oneDay = 24 * 60 * 60 * 1000;
    const start = new Date(2025, 0, 1);
    const diffDays = Math.floor((today.getTime() - start.getTime()) / oneDay);
    const index = Math.abs(diffDays) % wisdomData.length;
    const quote = wisdomData[index];

    return { quote, dateString };
}
