'use client';

import PhrasesPage from './TrainingClient';
import TrainingTutorial from './TrainingTutorial';

// Public RPG (3004): No D1 database — TrainingClient handles localStorage via IS_PUBLIC flag
export default function TrainingPage() {
    return (
        <>
            <PhrasesPage initialData={undefined} />
            <TrainingTutorial />
        </>
    );
}
