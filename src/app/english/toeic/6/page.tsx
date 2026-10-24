'use client';

import ToeicBooklet from '@/components/toeic/ToeicBooklet';
import TOEIC_TEST_06 from '@/data/english/toeic-test-06';
import TOEIC_GLOSS_06 from '@/data/english/toeic-gloss-06';
import TOEIC_BRIDGE_06 from '@/data/english/toeic-bridge-06';

export default function ToeicTest06Page() {
    return <ToeicBooklet test={TOEIC_TEST_06} glossary={TOEIC_GLOSS_06} bridge={TOEIC_BRIDGE_06} />;
}
