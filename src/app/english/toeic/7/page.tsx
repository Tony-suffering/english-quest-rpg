'use client';

import ToeicBooklet from '@/components/toeic/ToeicBooklet';
import TOEIC_TEST_07 from '@/data/english/toeic-test-07';
import TOEIC_GLOSS_07 from '@/data/english/toeic-gloss-07';
import TOEIC_BRIDGE_07 from '@/data/english/toeic-bridge-07';

export default function ToeicTest07Page() {
    return <ToeicBooklet test={TOEIC_TEST_07} glossary={TOEIC_GLOSS_07} bridge={TOEIC_BRIDGE_07} />;
}
