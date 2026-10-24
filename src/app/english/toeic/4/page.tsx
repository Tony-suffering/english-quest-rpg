'use client';

import ToeicBooklet from '@/components/toeic/ToeicBooklet';
import TOEIC_TEST_04 from '@/data/english/toeic-test-04';
import TOEIC_EXPLAIN_04 from '@/data/english/toeic-explain-04';
import TOEIC_BRIDGE_04 from '@/data/english/toeic-bridge-04';

export default function ToeicTest04Page() {
    return <ToeicBooklet test={TOEIC_TEST_04} explain={TOEIC_EXPLAIN_04} bridge={TOEIC_BRIDGE_04} />;
}
