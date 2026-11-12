
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("q")?.trim() || "";

    const [courses, projects] = await Promise.all([
      prisma.course.findMany({
        where: query
          ? {
              OR: [
                {
                  title: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
                {
                  category: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
                {
                  description: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : undefined,
        select: {
          id: true,
          title: true,
          category: true,
          description: true,
        },
      }),

      prisma.project.findMany({
        where: query
          ? {
              OR: [
                {
                  title: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
                {
                  description: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
                {
                  technology: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : undefined,
        select: {
          id: true,
          title: true,
          description: true,
          technology: true,
        },
      }),
    ]);

    const items = [
      ...courses.map((course) => ({
        id: course.id,
        title: course.title,
        type: "Course",
        description: course.description || course.category,
      })),

      ...projects.map((project) => ({
        id: project.id,
        title: project.title,
        type: "Project",
        description: project.description,
      })),
    ];

    return NextResponse.json({
      success: true,
      total: items.length,
      items,
    });
  } catch (error) {
    console.error("Search API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Search failed",
      },
      { status: 500 }
    );
  }
}
