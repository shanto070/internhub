
"use client";

import { useState } from "react";
import {
  getUsers,
  loginAdmin,
  registerUser,
  type User,
} from "@/lib/fastapi";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [token, setToken] = useState("");

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Admin Login
  async function handleAdminLogin(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const accessToken = await loginAdmin(
        adminEmail,
        adminPassword
      );

      setToken(accessToken);

      const userList = await getUsers(accessToken);
      setUsers(userList);

      setMessage("Admin login successful!");
      setAdminPassword("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Login failed."
      );

      setToken("");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }

  // Create New User
  async function handleCreateUser(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const newUser = await registerUser({
        name,
        email,
        age: Number(age),
        password,
      });

      // Update user list if admin is logged in
      if (token) {
        setUsers((previousUsers) => [
          ...previousUsers,
          newUser,
        ]);
      }

      // Clear registration form
      setName("");
      setEmail("");
      setAge("");
      setPassword("");

      setMessage("User created successfully!");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Page Header */}
      <header className="topbar">
        <div>
          <p className="breadcrumb">
            Workspace / User Management
          </p>
          <h1>User Management</h1>
        </div>
      </header>

      {/* Admin Login Section */}
      <section className="user-management-card">
        <h2>Admin Login</h2>
        <p>Login with your admin account to view all users.</p>

        <form
          onSubmit={handleAdminLogin}
          className="user-management-form"
        >
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              placeholder="Admin email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) =>
                setAdminPassword(e.target.value)
              }
              placeholder="Admin password"
              required
            />
          </div>

          <button
            type="submit"
            className="user-submit-button"
            disabled={loading}
          >
            {loading ? "Please wait..." : "Login as Admin"}
          </button>
        </form>
      </section>

      {/* Create User Section */}
      <section className="user-management-card">
        <h2>Create New User</h2>
        <p>Enter user information to register a new account.</p>

        <form
          onSubmit={handleCreateUser}
          className="user-management-form"
        >
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              minLength={2}
              maxLength={100}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min={1}
              max={120}
              placeholder="Enter age"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              maxLength={128}
              placeholder="Minimum 8 characters"
              required
            />
          </div>

          <button
            type="submit"
            className="user-submit-button"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create User"}
          </button>
        </form>
      </section>

      {/* Success and Error Messages */}
      {message && (
        <p className="user-success">{message}</p>
      )}

      {error && (
        <p className="auth-error">{error}</p>
      )}

      {/* Users List Section */}
      <section className="user-management-card">
        <h2>Users List</h2>
        <p>Total users loaded: {users.length}</p>

        {!token && (
          <p>Login as admin to view the user list.</p>
        )}

        {token && users.length === 0 && (
          <p>No users found.</p>
        )}

        {users.length > 0 && (
          <div className="user-table-wrapper">
            <table className="user-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>{user.role}</td>

                    <td
                      className={
                        user.is_active
                          ? "user-status-active"
                          : "user-status-inactive"
                      }
                    >
                      {user.is_active ? "Active" : "Inactive"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
