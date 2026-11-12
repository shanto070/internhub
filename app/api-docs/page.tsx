
"use client";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "InternHub API",
    version: "1.0.0",
    description: "API documentation for InternHub Learning Management System",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local Development Server",
    },
  ],
  tags: [
    { name: "Health", description: "Backend health check" },
    { name: "Authentication", description: "User authentication APIs" },
    { name: "Courses", description: "Course management APIs" },
    { name: "Projects", description: "Project management APIs" },
    { name: "Dashboard", description: "Dashboard statistics APIs" },
  ],
  paths: {
    "/api/health": {
      get: {
        tags: ["Health"],
        summary: "Check backend and database connection",
        responses: {
          "200": {
            description: "Backend and database connected",
          },
          "500": {
            description: "Database connection failed",
          },
        },
      },
    },
    "/api/auth/register": {
      post: {
        tags: ["Authentication"],
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                  name: { type: "string", example: "Shanto" },
                  email: { type: "string", example: "user@example.com" },
                  password: { type: "string", example: "Password123" },
                },
              },
            },
          },
        },
        responses: {
          "201": { description: "Registration successful" },
          "400": { description: "Invalid input or email already exists" },
        },
      },
    },
    "/api/auth/login": {
      post: {
        tags: ["Authentication"],
        summary: "Login user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", example: "user@example.com" },
                  password: { type: "string", example: "Password123" },
                },
              },
            },
          },
        },
        responses: {
          "200": { description: "Login successful" },
          "401": { description: "Invalid credentials" },
        },
      },
    },
    "/api/auth/logout": {
      post: {
        tags: ["Authentication"],
        summary: "Logout current user",
        responses: {
          "200": { description: "Logout successful" },
        },
      },
    },
    "/api/auth/me": {
      get: {
        tags: ["Authentication"],
        summary: "Get current authenticated user",
        responses: {
          "200": { description: "Authenticated user details" },
          "401": { description: "Not authenticated" },
        },
      },
    },
    "/api/courses": {
      get: {
        tags: ["Courses"],
        summary: "Get all courses",
        responses: {
          "200": { description: "List of courses" },
          "500": { description: "Failed to fetch courses" },
        },
      },
    },
    "/api/projects": {
      get: {
        tags: ["Projects"],
        summary: "Get all projects",
        responses: {
          "200": { description: "List of projects" },
          "500": { description: "Failed to fetch projects" },
        },
      },
    },
    "/api/dashboard": {
      get: {
        tags: ["Dashboard"],
        summary: "Get dashboard statistics",
        responses: {
          "200": { description: "Dashboard statistics" },
          "500": { description: "Failed to load statistics" },
        },
      },
    },
  },
};

export default function ApiDocsPage() {
  return (
    <div className="swagger-page">
      <SwaggerUI spec={swaggerDocument} />
    </div>
  );
}
