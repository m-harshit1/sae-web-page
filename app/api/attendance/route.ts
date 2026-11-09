import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const attendance = await prisma.attendanceRecord.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(attendance);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch attendance' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { name, hours, role } = await req.json();
    const record = await prisma.attendanceRecord.create({
      data: {
        name,
        hours: parseFloat(hours),
        role,
        status: "Present"
      }
    });
    return NextResponse.json(record);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create attendance record' }, { status: 500 });
  }
}
