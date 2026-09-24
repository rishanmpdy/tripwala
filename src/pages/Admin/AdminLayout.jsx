import { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import "./AdminLayout.css";




const icons = {
  dashboard: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  places: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  hidden: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="2.5" /></>,
  food: <><path d="M7 3v8M4 3v5a3 3 0 0 0 6 0V3M7 11v10M16 3v18M16 3c3 2 3 7 0 9" /></>,
  resort: <><path d="M3 21h18M5 21V7h14v14M8 10h2M14 10h2M8 14h2M14 14h2M9 21v-3h6v3M8 7V4h8v3" /></>,
  home: <><path d="m3 10 9-7 9 7M5 9v11h14V9M9 20v-6h6v6" /></>,
  taxi: <><path d="M5 17h14l-1-7H6l-1 7ZM7 10l2-4h6l2 4" /><circle cx="8" cy="17" r="1.5" /><circle cx="16" cy="17" r="1.5" /></>,
  video: <><rect x="3" y="5" width="14" height="14" rx="2" /><path d="m17 10 4-2v8l-4-2" /></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
  trip: <><path d="M3 6h18v14H3zM7 6V4h10v2M3 11h18M10 11v2h4v-2" /></>,
  review: <><path d="M20 15a3 3 0 0 1-3 3H9l-5 3v-3a3 3 0 0 1-2-3V7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8Z" /><path d="M8 9h8M8 13h5" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.7 1.7-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1 1.55V20h-2.4v-.21a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.88.34l-.06.06-1.7-1.7.06-.06A1.7 1.7 0 0 0 8.6 15a1.7 1.7 0 0 0-1.55-1H6.8v-2.4h.25a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.88L8.2 8.66l1.7-1.7.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1-1.55V5.6h2.4v.21a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.88-.34l.06-.06 1.7 1.7-.06.06a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 1.55 1h.21V14h-.21a1.7 1.7 0 0 0-1.55 1Z" /></>,
  logout: <><path d="M10 17l5-5-5-5" /><path d="M15 12H3" /><path d="M21 3v18" /></>,
  menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
  chevron: <><path d="m9 18 6-6-6-6" /></>,
};

const Icon = ({ name, size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name]}</svg>;

const navigation = [
  { title: "Overview", items: [{ label: "Dashboard", path: "/admin", icon: "dashboard", end: true }] },
  { title: "Content", items: [
    { label: "Places", path: "/admin/places", icon: "places" },
    { label: "Hidden Spots", path: "/admin/hidden-spots", icon: "hidden" },
    { label: "Food Spots", path: "/admin/food-spots", icon: "food" },
    { label: "Resorts", path: "/admin/resorts", icon: "resort" },
    { label: "Home Stays", path: "/admin/homestays", icon: "home" },
    { label: "Taxi", path: "/admin/taxi", icon: "taxi" },
    { label: "Must Watch", path: "/admin/must-watch", icon: "video" },
  ] },
  { title: "Management", items: [
    { label: "Users", path: "/admin/users", icon: "users" },
    { label: "Trip Plans", path: "/admin/trip-plans", icon: "trip" },
    { label: "Reviews", path: "/admin/reviews", icon: "review" },
  ] },
  { title: "Settings", items: [{ label: "General Settings", path: "/admin/settings", icon: "settings" }] },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { session, logout } = useAuth();
  const location = useLocation();
  const currentItem = navigation.flatMap((group) => group.items).find((item) => location.pathname === item.path || location.pathname.startsWith(`${item.path}/`));
  const pageTitle = currentItem?.label || "Dashboard";
  const displayName = session?.email?.split("@")[0] || "Admin";
  const initials = displayName.slice(0, 2).toUpperCase();

  return <div className={`admin-layout ${collapsed ? "sidebar-collapsed" : ""}`}>
    {sidebarOpen && <button className="admin-sidebar-overlay" type="button" aria-label="Close menu" onClick={() => setSidebarOpen(false)} />}
    <aside className={`admin-sidebar ${sidebarOpen ? "mobile-open" : ""}`}>
      <div className="admin-sidebar-top">
        <div className="admin-brand"><div className="admin-brand-mark">T</div>{!collapsed && <div className="admin-brand-text"><strong>tripwala</strong><span>ADMIN</span></div>}</div>
        <button className="sidebar-collapse-btn" type="button" onClick={() => setCollapsed((value) => !value)} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}><Icon name="chevron" size={16} /></button>
      </div>
      <div className="admin-sidebar-content">{navigation.map((group) => <div className="admin-nav-group" key={group.title}>{!collapsed && <div className="admin-nav-title">{group.title}</div>}<nav aria-label={group.title}>{group.items.map((item) => <NavLink key={item.path} to={item.path} end={item.end} className={({ isActive }) => `admin-nav-item ${isActive ? "active" : ""}`} onClick={() => setSidebarOpen(false)}><span className="admin-nav-icon"><Icon name={item.icon} size={18} /></span>{!collapsed && <span className="admin-nav-label">{item.label}</span>}</NavLink>)}</nav></div>)}</div>
      <div className="admin-sidebar-footer"><button className="admin-logout" type="button" onClick={logout}><span className="admin-nav-icon"><Icon name="logout" size={18} /></span>{!collapsed && <span>Logout</span>}</button></div>
    </aside>
    <div className="admin-main"><header className="admin-header"><div className="admin-header-left"><button className="mobile-menu-btn" type="button" aria-label="Open menu" onClick={() => setSidebarOpen(true)}><Icon name="menu" size={21} /></button><div><div className="admin-breadcrumb">Admin <Icon name="chevron" size={12} /><span>{pageTitle}</span></div><h1>{pageTitle}</h1></div></div><div className="admin-header-right"><button className="admin-icon-btn" type="button" aria-label="Notifications"><Icon name="bell" size={19} /><span className="notification-dot" /></button><div className="admin-user"><div className="admin-user-avatar">{initials}</div><div className="admin-user-info"><strong>{displayName}</strong><span>Administrator</span></div></div></div></header><main className="admin-content"><Outlet /></main></div>
  </div>;
};

export default AdminLayout;
