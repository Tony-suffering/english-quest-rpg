
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import FormData from 'form-data'
import fetch from 'node-fetch'
import { Blob } from 'buffer'

// Load environment variables
dotenv.config({ path: '.env.local' })

const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN
const PORTFOLIO_DATA_PATH = path.join(process.cwd(), 'src/data/portfolio-real.ts')
const PUBLIC_DIR = path.join(process.cwd(), 'public')

async function uploadToCloudflare(filePath: string): Promise<string | null> {
    if (!fs.existsSync(filePath)) {
        console.error(`❌ File not found: ${filePath}`)
        return null
    }

    try {
        const fileContent = fs.readFileSync(filePath)
        const formData = new FormData()
        formData.append('file', fileContent, path.basename(filePath))

        console.log(`Uploading ${path.basename(filePath)}...`)

        const response = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/images/v1`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
                },
                body: formData,
            }
        )

        const result = await response.json()

        if (result.success) {
            // Prefer the "public" variant if available, or the first variant
            const variants = result.result.variants as string[]
            const publicVariant = variants.find(v => v.endsWith('public')) || variants[0]
            console.log(`✅ Uploaded: ${publicVariant}`)
            return publicVariant
        } else {
            console.error(`❌ Upload failed:`, result.errors)
            return null
        }
    } catch (error) {
        console.error(`❌ Exception during upload:`, error)
        return null
    }
}

async function migratePortfolio() {
    console.log("🚀 Starting Portfolio Migration to Cloudflare Images...")

    if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN) {
        console.error("❌ Missing Cloudflare credentials in .env.local")
        process.exit(1)
    }

    // Read the portfolio data file
    let fileContent = fs.readFileSync(PORTFOLIO_DATA_PATH, 'utf-8')

    // Regex to find image_url: "/images/portfolio/..."
    // We capture the full line or just the url part.
    // Handles quoted or unquoted keys: "image_url": "..." or image_url: "..."
    const regex = /["']?image_url["']?:\s*["'](\/images\/portfolio\/[^"']+)["']/g

    let match
    const replacements: { original: string, newUrl: string }[] = []

    // Map to store uploaded images to avoid re-uploading the same image multiple times
    const uploadedImages = new Map<string, string>()

    while ((match = regex.exec(fileContent)) !== null) {
        const originalUrl = match[1]
        const localPath = path.join(PUBLIC_DIR, originalUrl)

        if (uploadedImages.has(originalUrl)) {
            replacements.push({
                original: originalUrl,
                newUrl: uploadedImages.get(originalUrl)!
            })
            continue
        }

        const newUrl = await uploadToCloudflare(localPath)

        if (newUrl) {
            uploadedImages.set(originalUrl, newUrl)
            replacements.push({
                original: originalUrl,
                newUrl: newUrl
            })
        }
    }

    // Apply replacements
    let newFileContent = fileContent
    for (const { original, newUrl } of replacements) {
        // Use a global replace to handle multiple occurrences of the same image
        newFileContent = newFileContent.split(`"${original}"`).join(`"${newUrl}"`)
    }

    if (fileContent !== newFileContent) {
        fs.writeFileSync(PORTFOLIO_DATA_PATH, newFileContent)
        console.log(`\n✨ Successfully updated portfolio-real.ts with ${replacements.length} Cloudflare URLs!`)
    } else {
        console.log(`\nℹ️ No changes made (maybe all images failed or were already migrated).`)
    }
}

migratePortfolio()
