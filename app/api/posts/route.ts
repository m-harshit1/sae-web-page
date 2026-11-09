import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const dbPath = path.join(process.cwd(), 'data', 'posts.json');

// Read posts helper
function readPosts() {
  try {
    if (!fs.existsSync(dbPath)) {
      return [];
    }
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading posts database:', error);
    return [];
  }
}

// Write posts helper
function writePosts(posts: any[]) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(posts, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing posts database:', error);
  }
}

export async function GET() {
  const posts = readPosts();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const posts = readPosts();

    // Validate session server-side for publishing
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Authentication required. Please sign in.' }, { status: 401 });
    }

    const formattedDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const newPost = {
      id: posts.length > 0 ? Math.max(...posts.map((p: any) => p.id)) + 1 : 1,
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      category: body.category || 'Announcements',
      author: body.author || (session.user?.name) || 'SAEBAJA Member',
      date: formattedDate,
      lastUpdated: formattedDate,
      readTime: body.readTime || '3 min read'
    };

    posts.unshift(newPost); // Add to beginning
    writePosts(posts);

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error handling posts POST:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
