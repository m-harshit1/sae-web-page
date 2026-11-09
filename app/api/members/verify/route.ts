import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const membershipId = body?.membershipId;

    if (!membershipId || typeof membershipId !== 'string') {
      return NextResponse.json(
        { verified: false, error: 'Membership ID is required.' },
        { status: 400 }
      );
    }

    const cleanId = membershipId.trim();

    // Check for single Admin ID
    if (cleanId.toUpperCase() === "SAEBAJA-ADMIN") {
      const adminMember = await prisma.member.findFirst({
        where: {
          OR: [
            { membershipId: "SAEBAJA-ADMIN" },
            { role: { contains: "President" } }
          ]
        }
      });

      return NextResponse.json({
        verified: true,
        member: {
          id: adminMember?.id || 'admin-root',
          membershipId: 'SAEBAJA-ADMIN',
          name: adminMember?.name || 'Harshit Kumar Mishra',
          role: 'Club President / Powertrain Lead',
          computedRole: 'Admin',
          department: 'Executive Board',
          email: adminMember?.email || 'harshit.mishra@iiitk.ac.in',
          yearJoined: 2023
        }
      });
    }

    // Query SQLite database for matching membership ID
    const member = await prisma.member.findFirst({
      where: {
        OR: [
          { membershipId: cleanId },
          { membershipId: cleanId.toUpperCase() },
          { id: cleanId }
        ]
      }
    });

    if (!member) {
      return NextResponse.json(
        { 
          verified: false, 
          error: `Membership ID "${cleanId}" not found in the SAEBAJA member registry. Access denied.` 
        },
        { status: 404 }
      );
    }

    // Role mapping
    let computedRole = "Member";
    const roleLower = member.role.toLowerCase();
    const deptLower = member.department.toLowerCase();
    if (roleLower.includes("president") || roleLower.includes("admin") || deptLower.includes("executive")) {
      computedRole = "Admin";
    } else if (roleLower.includes("lead") || roleLower.includes("head") || roleLower.includes("officer")) {
      computedRole = "Core Team";
    }

    return NextResponse.json({
      verified: true,
      member: {
        id: member.id,
        membershipId: member.membershipId,
        name: member.name,
        role: member.role,
        computedRole,
        department: member.department,
        email: member.email,
        yearJoined: member.yearJoined
      }
    });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { verified: false, error: 'Server error during database membership check.' },
      { status: 500 }
    );
  }
}
