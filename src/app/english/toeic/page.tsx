'use client';

import ToeicBooklet from '@/components/toeic/ToeicBooklet';
import TOEIC_TEST_01 from '@/data/english/toeic-test-01';
import TOEIC_GLOSS_01 from '@/data/english/toeic-gloss-01';

export default function ToeicTest01Page() {
    return <ToeicBooklet test={TOEIC_TEST_01} glossary={TOEIC_GLOSS_01} />;
}
