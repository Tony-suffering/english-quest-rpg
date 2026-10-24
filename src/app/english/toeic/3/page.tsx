'use client';

import ToeicBooklet from '@/components/toeic/ToeicBooklet';
import TOEIC_TEST_03 from '@/data/english/toeic-test-03';
import TOEIC_GLOSS_03 from '@/data/english/toeic-gloss-03';

export default function ToeicTest03Page() {
    return <ToeicBooklet test={TOEIC_TEST_03} glossary={TOEIC_GLOSS_03} />;
}
