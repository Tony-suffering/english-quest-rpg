/**
 * Gemini 画像生成スクリプト
 * Usage: node scripts/generate-image.js "プロンプト" "出力ファイル名"
 */

const fs = require('fs');
const path = require('path');

const API_KEY = 'AIzaSyAb8Xv4iJ1bN5Eej0C-ye0eBjy4Dzd-rCg';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${API_KEY}`;

async function generateImage(prompt, outputName = 'generated') {
  console.log(`Generating image: "${prompt}"`);

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: `Generate an image: ${prompt}` }]
      }],
      generationConfig: {
        responseModalities: ['TEXT', 'IMAGE']
      }
    })
  });

  const data = await response.json();

  if (data.error) {
    console.error('API Error:', data.error.message);
    process.exit(1);
  }

  const parts = data.candidates?.[0]?.content?.parts || [];

  for (const part of parts) {
    if (part.inlineData?.mimeType?.startsWith('image/')) {
      const ext = part.inlineData.mimeType.split('/')[1];
      const outputPath = path.join(__dirname, '..', 'public', 'generated', `${outputName}.${ext}`);

      // Ensure directory exists
      const dir = path.dirname(outputPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Save image
      const buffer = Buffer.from(part.inlineData.data, 'base64');
      fs.writeFileSync(outputPath, buffer);
      console.log(`Image saved: ${outputPath}`);
      return outputPath;
    }
  }

  console.log('No image generated');
  return null;
}

// CLI execution
const prompt = process.argv[2] || 'A simple test image';
const outputName = process.argv[3] || 'test';

generateImage(prompt, outputName);
