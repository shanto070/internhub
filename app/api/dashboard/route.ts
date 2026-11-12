
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      totalCourses,
      activeProjects,
      completedProjects,
      totalEnrollments,
    ] = await Promise.all([
      prisma.course.count(),

      prisma.project.count({
        where: {
          status: "IN_PROGRESS",
        },
      }),

      prisma.project.count({
        where: {
          status: "COMPLETED",
        },
      }),

      prisma.enrollment.count(),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalCourses,
        activeProjects,
        completedProjects,
        totalEnrollments,
      },
    });
  } catch (error) {
    console.error("Dashboard API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load dashboard statistics",
      },
      { status: 500 }
    );
  }
}
