import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'src/posts');

export interface PostData {
    slug: string;
    title: string;
    date: string;
    image?: string;
    description?: string;
    contentHtml: string;
    contentMarkdown?: string; // For ReactMarkdown
    businessTags?: string[];
    techTags?: string[];
    featured?: boolean;
    youtube?: string;
    video?: string;
    cloudflareVideo?: string;
}

export function getSortedPostsData() {
    // Create directory if it doesn't exist
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.filter(fileName => fileName.endsWith('.md')).map((fileName) => {
        // Remove ".md" from file name to get id
        const slug = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Combine the data with the id
        return {
            slug,
            category: matterResult.data.category as string | undefined,
            ...(matterResult.data as { date: string; title: string, image?: string, description?: string }),
        };
    });

    // Filter out private categories (lab, draft, etc.)
    const publicPosts = allPostsData.filter(post => {
        const privateCategories = ['lab', 'draft', 'private'];
        return !post.category || !privateCategories.includes(post.category);
    });

    // Sort posts by date, but pin the "Eternal" post to the top
    return publicPosts.sort((a, b) => {
        const ETERNAL_ID = '2025-12-08-20251208101132';

        if (a.slug === ETERNAL_ID) return -1;
        if (b.slug === ETERNAL_ID) return 1;

        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getAllPostSlugs() {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.filter(fileName => fileName.endsWith('.md')).map((fileName) => {
        return {
            params: {
                slug: fileName.replace(/\.md$/, ''),
            },
        };
    });
}

export async function getPostData(slug: string) {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string (Optional if using ReactMarkdown)
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        slug,
        contentHtml,
        contentMarkdown: matterResult.content,
        ...(matterResult.data as {
            date: string;
            title: string;
            image?: string;
            description?: string;
            businessTags?: string[];
            techTags?: string[];
            featured?: boolean;
            youtube?: string;
            video?: string;
            cloudflareVideo?: string;
        }),
    };
}
