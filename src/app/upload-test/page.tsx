'use client'

import ImageUpload from '@/components/cms/ImageUpload'
import { useState } from 'react'

export default function UploadTestPage() {
    const [uploadedUrl, setUploadedUrl] = useState<string>('')

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Cloudflare Image Upload Test</h1>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <ImageUpload
                    onUploadComplete={(url) => setUploadedUrl(url)}
                    currentImage={uploadedUrl}
                    onRemove={() => setUploadedUrl('')}
                />
            </div>

            {uploadedUrl && (
                <div className="mt-8 p-4 bg-green-50 rounded border border-green-200">
                    <p className="font-bold text-green-800 mb-2">Upload Successful!</p>
                    <p className="text-sm text-gray-600 break-all">{uploadedUrl}</p>
                    <div className="mt-4">
                        <p className="text-sm font-bold mb-2">Preview:</p>
                        <img src={uploadedUrl} alt="Uploaded" className="max-w-full h-auto rounded shadow" />
                    </div>
                </div>
            )}
        </div>
    )
}
