import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const members = await prisma.member.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { name, role, department, email, yearJoined, membershipId } = await req.json();
    const finalMembershipId = membershipId?.trim() 
      ? membershipId.trim().toUpperCase() 
      : `SAEBAJA-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

    const member = await prisma.member.create({
      data: {
        membershipId: finalMembershipId,
        name,
        role,
        department,
        email: email || `${name.toLowerCase().replace(/\s+/g, '.')}-${Date.now()}@iiitk.ac.in`,
        yearJoined: parseInt(yearJoined) || new Date().getFullYear()
      }
    });
    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create member' }, { status: 500 });
  }
}
