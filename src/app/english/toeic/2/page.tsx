'use client';

import ToeicBooklet from '@/components/toeic/ToeicBooklet';
import TOEIC_TEST_02 from '@/data/english/toeic-test-02';
import TOEIC_GLOSS_02 from '@/data/english/toeic-gloss-02';

export default function ToeicTest02Page() {
    return <ToeicBooklet test={TOEIC_TEST_02} glossary={TOEIC_GLOSS_02} />;
}
