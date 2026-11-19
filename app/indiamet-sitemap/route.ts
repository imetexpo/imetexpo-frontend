import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'indiamet-sitemap.xml');
    if (fs.existsSync(filePath)) {
      const xml = fs.readFileSync(filePath, 'utf-8');
      return new NextResponse(xml, {
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
      });
    }
  } catch (error) {
    console.error('Error serving indiamet-sitemap:', error);
  }

  return new NextResponse('Sitemap not found', { status: 404 });
}
