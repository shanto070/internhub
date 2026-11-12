
"use client";

import { useState } from "react";

const items = [
  {
    title: "Next.js Fundamentals",
    type: "Course",
    description: "Learn Next.js App Router and React development.",
  },
  {
    title: "Python Programming",
    type: "Course",
    description: "Learn Python programming and backend development.",
  },
  {
    title: "Database Management",
    type: "Course",
    description: "Learn SQL and database management.",
  },
  {
    title: "Git & GitHub",
    type: "Course",
    description: "Learn version control and collaboration.",
  },
  {
    title: "InternHub Dashboard",
    type: "Project",
    description: "A learning management dashboard built with Next.js.",
  },
  {
    title: "Flight Booking System",
    type: "Project",
    description: "A full-stack flight booking application.",
  },
  {
    title: "Smart Task Manager",
    type: "Project",
    description: "An application to organize daily tasks.",
  },
  {
    title: "Retail Management System",
    type: "Project",
    description: "A product and customer order management system.",
  },
];

export default function SearchPage() {
  const [search, setSearch] = useState("");

  const filteredItems = items.filter((item) =>
    `${item.title} ${item.type} ${item.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      <header className="topbar">
        <div>
          <p className="breadcrumb">Workspace / Search</p>
          <h1>Search</h1>
        </div>
      </header>

      <section className="welcome">
        <p>FIND WHAT YOU NEED!</p>
        <h2>Explore InternHub 🔍</h2>
        <p>
          Search your courses and development projects easily.
        </p>
      </section>

      <section className="content-card">
        <h2>Search Everything</h2>
        <p>Enter a course or project name below.</p>

        <input
          type="text"
          className="search-input"
          placeholder="Search courses or projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <p className="search-count">
          {filteredItems.length} result(s) found
        </p>

        <div className="search-results">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div className="search-item" key={item.title}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <span className="search-type">
                  {item.type}
                </span>
              </div>
            ))
          ) : (
            <p className="no-results">
              No results found. Try another keyword.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
