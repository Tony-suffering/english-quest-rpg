import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Helper to get the path to the data file
const getDataFilePath = () => {
    return path.join(process.cwd(), 'src', 'data', 'wisdom.json');
};

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { content, date, source } = body;

        // Validation
        if (!content || !date) {
            return NextResponse.json(
                { error: 'Content and date are required' },
                { status: 400 }
            );
        }

        const filePath = getDataFilePath();

        // Read existing data
        let currentData: any[] = [];
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            currentData = JSON.parse(fileContent);
        }

        // Check if an entry for this date already exists
        const existingIndex = currentData.findIndex((item: any) => item.date === date);

        const newEntry = {
            id: existingIndex !== -1 ? currentData[existingIndex].id : Date.now(), // Preserve ID or create new numeric ID
            content,
            source: source || 'Unknown',
            date
        };

        if (existingIndex !== -1) {
            // Update existing
            currentData[existingIndex] = newEntry;
        } else {
            // Append new
            currentData.push(newEntry);
        }

        // Write back to file
        fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2), 'utf-8');

        return NextResponse.json({ success: true, message: 'Wisdom updated successfully', data: newEntry });
    } catch {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
