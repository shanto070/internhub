
import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Demo Courses
  const courses = [
    {
      title: "Full Stack Web Development",
      category: "Web Development",
      description:
        "Learn frontend and backend development using modern technologies.",
    },
    {
      title: "Python Programming",
      category: "Programming",
      description:
        "Learn Python fundamentals, problem solving and practical coding.",
    },
    {
      title: "Database Management",
      category: "Database",
      description:
        "Understand SQL, PostgreSQL and database management concepts.",
    },
    {
      title: "UI/UX Design Fundamentals",
      category: "Design",
      description:
        "Learn user interface design and user experience principles.",
    },
  ];

  for (const course of courses) {
    const existing = await prisma.course.findFirst({
      where: { title: course.title },
    });

    if (!existing) {
      await prisma.course.create({ data: course });
      console.log(`Added course: ${course.title}`);
    } else {
      console.log(`Course already exists: ${course.title}`);
    }
  }

  // Demo Projects
  const projects = [
    {
      title: "InternHub Dashboard",
      description:
        "A learning management dashboard built with Next.js.",
      technology: "Next.js, TypeScript, CSS",
      status: "IN_PROGRESS" as const,
    },
    {
      title: "Flight Booking System",
      description:
        "A full-stack application for managing flight bookings.",
      technology: "NestJS, PostgreSQL, Next.js",
      status: "COMPLETED" as const,
    },
    {
      title: "Smart Task Manager",
      description:
        "An application to organize and track daily tasks.",
      technology: "React, Node.js",
      status: "IN_PROGRESS" as const,
    },
    {
      title: "Retail Management System",
      description:
        "A system for managing products and customer orders.",
      technology: "PHP, MySQL",
      status: "COMPLETED" as const,
    },
  ];

  for (const project of projects) {
    const existing = await prisma.project.findFirst({
      where: { title: project.title },
    });

    if (!existing) {
      await prisma.project.create({
        data: project,
      });

      console.log(`Added project: ${project.title}`);
    } else {
      console.log(`Project already exists: ${project.title}`);
    }
  }

  console.log("All demo data processed successfully!");
}

main()
  .catch((error) => {
    console.error("Seed error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
