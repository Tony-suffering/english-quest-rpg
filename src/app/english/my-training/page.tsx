'use client';

import { useState } from 'react';
import PhrasesPage from '../training/TrainingClient';
import TrainingTutorial from '../training/TrainingTutorial';

// Production training: starts from zero, only user-registered phrases
export default function MyTrainingPage() {
    const [showHelp, setShowHelp] = useState(false);

    return (
        <>
            <PhrasesPage initialData={undefined} onHelpClick={() => setShowHelp(true)} skipDefaultData />
            <TrainingTutorial forceOpen={showHelp} key={showHelp ? 'open' : 'auto'} />
        </>
    );
}
