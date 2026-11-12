
"use client";

import { useEffect, useState } from "react";

type Course = {
  id: string;
  title: string;
  category: string;
  description: string | null;
};

export default function LearningPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch("/api/courses");

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load courses");
        }

        setCourses(data.courses);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  return (
    <div>
      <header className="topbar">
        <div>
          <p className="breadcrumb">Workspace / Learning</p>
          <h1>My Learning</h1>
        </div>
      </header>

      <section className="welcome">
        <p>KEEP LEARNING!</p>
        <h2>Grow Your Skills 🚀</h2>
        <p>
          Explore your courses and track your learning progress.
        </p>
      </section>

      <section className="content-card">
        <h2>My Courses</h2>
        <p>Explore the courses available on InternHub.</p>

        {loading && <p>Loading courses...</p>}

        {error && (
          <p className="auth-error">{error}</p>
        )}

        {!loading && !error && courses.length === 0 && (
          <p>No courses available right now.</p>
        )}

        {!loading && !error && courses.length > 0 && (
          <div className="course-list">
            {courses.map((course) => (
              <div className="course-card" key={course.id}>
                <div className="course-header">
                  <div>
                    <h3>{course.title}</h3>
                    <p>{course.category}</p>
                  </div>

                  <span className="course-status">
                    Available
                  </span>
                </div>

                {course.description && (
                  <p>{course.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
