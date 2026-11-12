
"use client";

import { useEffect, useState } from "react";

type SearchItem = {
  id: string;
  title: string;
  type: "Course" | "Project";
  description: string;
};

export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchItems() {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams();

        if (search.trim()) {
          params.set("q", search.trim());
        }

        const response = await fetch(
          `/api/search?${params.toString()}`,
          {
            signal: controller.signal,
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Search failed");
        }

        setItems(data.items);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong"
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchItems();

    return () => {
      controller.abort();
    };
  }, [search]);

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
          {loading ? "Searching..." : `${items.length} result(s) found`}
        </p>

        <div className="search-results">
          {error && (
            <p className="no-results">{error}</p>
          )}

          {!loading && !error && items.length > 0 && (
            items.map((item) => (
              <div className="search-item" key={item.id}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <span className="search-type">
                  {item.type}
                </span>
              </div>
            ))
          )}

          {!loading && !error && items.length === 0 && (
            <p className="no-results">
              No results found. Try another keyword.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
