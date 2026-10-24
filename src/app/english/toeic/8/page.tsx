'use client';

import ToeicBooklet from '@/components/toeic/ToeicBooklet';
import TOEIC_TEST_08 from '@/data/english/toeic-test-08';
import TOEIC_GLOSS_08 from '@/data/english/toeic-gloss-08';
import TOEIC_BRIDGE_08 from '@/data/english/toeic-bridge-08';

export default function ToeicTest08Page() {
    return <ToeicBooklet test={TOEIC_TEST_08} glossary={TOEIC_GLOSS_08} bridge={TOEIC_BRIDGE_08} />;
}
