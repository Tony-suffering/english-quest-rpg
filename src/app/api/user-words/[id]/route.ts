import { NextResponse } from 'next/server';
import { deleteUserWord, updateUserWordMastery, addUserWordCardPoints, setUserWordCardName, updateUserWordContent } from '@/lib/d1';

// DELETE: Remove word from collection
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await deleteUserWord(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting word:', error);
        return NextResponse.json(
            { error: 'Failed to delete word', success: false },
            { status: 500 }
        );
    }
}

// PATCH: Update mastery, card points, or content
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { mastery_level, card_points, card_name, english, japanese } = body;

        if (mastery_level !== undefined) {
            await updateUserWordMastery(id, mastery_level);
        }

        if (card_points !== undefined && card_points > 0) {
            await addUserWordCardPoints(id, card_points);
        }

        if (card_name !== undefined) {
            await setUserWordCardName(id, card_name);
        }

        if (english !== undefined || japanese !== undefined) {
            await updateUserWordContent(id, { english, japanese });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating word:', error);
        return NextResponse.json(
            { error: 'Failed to update word', success: false },
            { status: 500 }
        );
    }
}
