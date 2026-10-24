'use client';

import ToeicBooklet from '@/components/toeic/ToeicBooklet';
import TOEIC_TEST_05 from '@/data/english/toeic-test-05';
import TOEIC_GLOSS_05 from '@/data/english/toeic-gloss-05';
import TOEIC_BRIDGE_05 from '@/data/english/toeic-bridge-05';

export default function ToeicTest05Page() {
    return <ToeicBooklet test={TOEIC_TEST_05} glossary={TOEIC_GLOSS_05} bridge={TOEIC_BRIDGE_05} />;
}
