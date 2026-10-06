import React, { useState, useEffect } from "react";
import { userStore } from "../../../data/stores";
import { useAuth } from "../../../auth/AuthContext";
import "./Users.css";

const ROLE_PERMISSIONS_TEXT = {
  superadmin: "Full Master Access: Can manage team users, delete records, configure contact routing, and oversee all properties & settings.",
  admin: "Operational Admin: Can manage resorts, homestays, food spots, customer reviews, and enquiry desk routing.",
  user: "Staff / Team Member: Can view properties, monitor customer reviews, and assist with bookings & guest enquiries."
};

// Stored data mixes "Active" and "active" — compare case-insensitively.
const isActive = (user) => String(user?.status || "").toLowerCase() === "active";

export default function Users() {
  const { session } = useAuth();
  const [users, setUsers] = useState(() => userStore.getAll());
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modal State
  const [modalMode, setModalMode] = useState(null); // 'add' | 'edit' | null
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "admin",
    password: "",
    status: "active"
  });
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const handleUpdate = () => {
      setUsers(userStore.getAll());
    };
    window.addEventListener("tripwala-admin-users-updated", handleUpdate);
    return () => window.removeEventListener("tripwala-admin-users-updated", handleUpdate);
  }, []);

  const openAddModal = () => {
    setModalMode("add");
    setEditingId(null);
    setFormData({
      name: "",
      email: "",
      role: "admin",
      password: "TripWala@123",
      status: "active"
    });
    setFormError("");
  };

  const openEditModal = (user) => {
    setModalMode("edit");
    setEditingId(user.id);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "user",
      password: "",
      status: isActive(user) ? "active" : "inactive"
    });
    setFormError("");
  };

  const closeModal = () => {
    setModalMode(null);
    setEditingId(null);
    setFormError("");
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    setFormError("");

    if (!formData.name.trim()) {
      setFormError("Full name is required.");
      return;
    }
    if (!formData.email.trim()) {
      setFormError("Email address is required.");
      return;
    }

    if (modalMode === "add") {
      if (!formData.password.trim()) {
        setFormError("Password is required for new user account.");
        return;
      }
      // Check email uniqueness
      const exists = users.some(u => u.email?.toLowerCase() === formData.email.toLowerCase().trim());
      if (exists) {
        setFormError("A user with this email address already exists.");
        return;
      }

      userStore.create({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        role: formData.role,
        password: formData.password,
        status: formData.status
      });
      closeModal();
    } else if (modalMode === "edit") {
      // Check email uniqueness among others
      const exists = users.some(u => u.id !== editingId && u.email?.toLowerCase() === formData.email.toLowerCase().trim());
      if (exists) {
        setFormError("Another user with this email address already exists.");
        return;
      }

      const updates = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        role: formData.role,
        status: formData.status
      };
      if (formData.password.trim()) {
        updates.password = formData.password.trim();
      }

      userStore.update(editingId, updates);
      closeModal();
    }
  };

  const handleDelete = (user) => {
    if (user.email === session?.email) {
      alert("You cannot delete your own currently logged-in account!");
      return;
    }
    if (user.email === "superadmin@tripwala.demo") {
      alert("The primary Superadmin system account cannot be deleted.");
      return;
    }

    if (window.confirm(`Are you sure you want to remove user "${user.name}" (${user.email})?`)) {
      userStore.remove(user.id);
    }
  };

  const handleToggleStatus = (user) => {
    if (user.email === session?.email) {
      alert("You cannot deactivate your own currently logged-in account!");
      return;
    }
    const newStatus = isActive(user) ? "inactive" : "active";
    userStore.update(user.id, { status: newStatus });
  };

  // Filtered users
  const filteredUsers = users.filter((u) => {
    // Role Tab Filter
    if (activeTab !== "all" && u.role !== activeTab) {
      return false;
    }
    // Status Filter
    if (statusFilter !== "all" && (isActive(u) ? "active" : "inactive") !== statusFilter) {
      return false;
    }
    // Search Filter
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = u.name?.toLowerCase().includes(q);
      const matchEmail = u.email?.toLowerCase().includes(q);
      const matchRole = u.role?.toLowerCase().includes(q);
      return matchName || matchEmail || matchRole;
    }
    return true;
  });

  const countTotal = users.length;
  const countSuperadmin = users.filter(u => u.role === "superadmin").length;
  const countAdmin = users.filter(u => u.role === "admin").length;
  const countUser = users.filter(u => u.role === "user").length;
  const countActive = users.filter(isActive).length;

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
  };

  return (
    <div className="users-container">
      {/* Header */}
      <div className="users-header">
        <div className="users-header-info">
          <h1>
            <span>Users & Access Control</span>
          </h1>
          <p>
            Manage team accounts, assign user roles (Superadmin, Admin, User), and control admin portal permissions.
          </p>
        </div>
        <button className="admin-action-btn primary" onClick={openAddModal}>
          + Add New User
        </button>
      </div>

      {/* Stats Counter Cards */}
      <div className="users-stats">
        <div className="user-stat-card">
          <div>
            <div className="stat-label">Total Users</div>
            <div className="stat-val">{countTotal}</div>
          </div>
          <div className="user-stat-icon total">👥</div>
        </div>
        <div className="user-stat-card">
          <div>
            <div className="stat-label">Superadmins</div>
            <div className="stat-val">{countSuperadmin}</div>
          </div>
          <div className="user-stat-icon superadmin">⚡</div>
        </div>
        <div className="user-stat-card">
          <div>
            <div className="stat-label">Admins</div>
            <div className="stat-val">{countAdmin}</div>
          </div>
          <div className="user-stat-icon admin">🛡️</div>
        </div>
        <div className="user-stat-card">
          <div>
            <div className="stat-label">Staff / Users</div>
            <div className="stat-val">{countUser}</div>
          </div>
          <div className="user-stat-icon user">👤</div>
        </div>
      </div>

      {/* Control Bar: Tabs & Search */}
      <div className="users-controls">
        <div className="users-tabs">
          <button
            className={`users-tab ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All Accounts <span className="tab-badge">{countTotal}</span>
          </button>
          <button
            className={`users-tab ${activeTab === "superadmin" ? "active" : ""}`}
            onClick={() => setActiveTab("superadmin")}
          >
            Superadmin <span className="tab-badge">{countSuperadmin}</span>
          </button>
          <button
            className={`users-tab ${activeTab === "admin" ? "active" : ""}`}
            onClick={() => setActiveTab("admin")}
          >
            Admin <span className="tab-badge">{countAdmin}</span>
          </button>
          <button
            className={`users-tab ${activeTab === "user" ? "active" : ""}`}
            onClick={() => setActiveTab("user")}
          >
            User / Staff <span className="tab-badge">{countUser}</span>
          </button>
        </div>

        <div className="users-filter-inputs">
          <input
            type="text"
            className="users-search-input"
            placeholder="Search name, email, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="users-select-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active ({countActive})</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: "260px" }}>User</th>
              <th>Email</th>
              <th style={{ width: "140px" }}>Role</th>
              <th style={{ width: "120px" }}>Status</th>
              <th>Created / Last Active</th>
              <th style={{ width: "160px", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "36px", color: "#64748b" }}>
                  No users match the selected criteria.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => {
                const isCurrent = user.email === session?.email;
                return (
                  <tr key={user.id}>
                    <td>
                      <div className="user-cell">
                        <div className={`user-avatar ${user.role}`}>
                          {getInitials(user.name)}
                        </div>
                        <div className="user-details">
                          <div className="user-name-row">
                            <span className="user-fullname">{user.name}</span>
                            {isCurrent && <span className="you-pill">You</span>}
                          </div>
                          <span className="user-login-time">
                            {user.lastLogin ? `Active: ${user.lastLogin}` : "Never logged in"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <code style={{ fontSize: "13px", color: "#334155", background: "#f1f5f9", padding: "2px 6px", borderRadius: "4px" }}>
                        {user.email}
                      </code>
                    </td>
                    <td>
                      <span className={`role-badge ${user.role}`}>
                        {user.role === "superadmin" && "⚡ Superadmin"}
                        {user.role === "admin" && "🛡️ Admin"}
                        {user.role === "user" && "👤 User"}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(user)}
                        title="Click to toggle status"
                        style={{ border: "none", background: "transparent", cursor: "pointer", padding: 0 }}
                      >
                        <span className={`status-pill ${isActive(user) ? "active" : "inactive"}`}>
                          <span className="status-dot"></span>
                          {isActive(user) ? "Active" : "Inactive"}
                        </span>
                      </button>
                    </td>
                    <td style={{ color: "#64748b", fontSize: "12.5px" }}>
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                    </td>
                    <td>
                      <div className="admin-actions-cell" style={{ justifyContent: "flex-end", gap: "6px" }}>
                        <button
                          className="admin-action-btn edit"
                          onClick={() => openEditModal(user)}
                          title="Edit User"
                        >
                          Edit
                        </button>
                        <button
                          className="admin-action-btn delete"
                          onClick={() => handleDelete(user)}
                          title="Delete User"
                          disabled={isCurrent || user.email === "superadmin@tripwala.demo"}
                          style={{
                            opacity: (isCurrent || user.email === "superadmin@tripwala.demo") ? 0.4 : 1,
                            cursor: (isCurrent || user.email === "superadmin@tripwala.demo") ? "not-allowed" : "pointer"
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      {modalMode && (
        <div className="user-modal-overlay" onClick={closeModal}>
          <div className="user-modal" onClick={(e) => e.stopPropagation()}>
            <div className="user-modal-header">
              <h3>{modalMode === "add" ? "Create New User Account" : `Edit User: ${formData.name}`}</h3>
              <button className="user-modal-close" onClick={closeModal}>✕</button>
            </div>

            <form onSubmit={handleSaveUser}>
              <div className="user-modal-body">
                {formError && (
                  <div className="admin-message error" style={{ margin: 0 }}>
                    {formError}
                  </div>
                )}

                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Email Address (Login Username) *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. rahul@tripwala.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Role Privilege *</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  >
                    <option value="superadmin">Superadmin (Master Access)</option>
                    <option value="admin">Admin (Operational Management)</option>
                    <option value="user">User / Staff (View & Enquiries)</option>
                  </select>
                  <div className="role-permission-hint">
                    <strong>Privilege: </strong>
                    {ROLE_PERMISSIONS_TEXT[formData.role]}
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    {modalMode === "add" ? "Password *" : "Reset Password (leave blank to keep current)"}
                  </label>
                  <input
                    type="text"
                    placeholder={modalMode === "add" ? "Enter temporary or initial password" : "New password..."}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <span className="hint">Default initial password suggestion: <code>TripWala@123</code></span>
                </div>

                <div className="form-group">
                  <label>Account Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="active">Active (Can log in)</option>
                    <option value="inactive">Inactive / Suspended (Login disabled)</option>
                  </select>
                </div>
              </div>

              <div className="user-modal-footer">
                <button type="button" className="admin-action-btn" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="admin-action-btn primary">
                  {modalMode === "add" ? "Create User" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
