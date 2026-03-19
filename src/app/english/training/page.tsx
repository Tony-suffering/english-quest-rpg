'use client';

import { useState } from 'react';
import PhrasesPage from './TrainingClient';
import TrainingTutorial from './TrainingTutorial';

// Public RPG (3004): No D1 database — TrainingClient handles localStorage via IS_PUBLIC flag
export default function TrainingPage() {
    const [showHelp, setShowHelp] = useState(false);

    return (
        <>
            <PhrasesPage initialData={undefined} onHelpClick={() => setShowHelp(true)} />
            <TrainingTutorial forceOpen={showHelp} key={showHelp ? 'open' : 'auto'} />
        </>
    );
}
