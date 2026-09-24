import "./AdminDashboard.css";

const stats = [
  {
    label: "Total Places",
    value: "248",
    change: "+12",
  },
  {
    label: "Resorts",
    value: "86",
    change: "+8",
  },
  {
    label: "Food Spots",
    value: "134",
    change: "+16",
  },
  {
    label: "Registered Users",
    value: "4,892",
    change: "+124",
  },
];

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      {/* PAGE INTRO */}

      <div className="admin-page-intro">
        <div>
          <h2>Good evening, Admin</h2>
          <p>
            Manage your Tripwala content and platform activity.
          </p>
        </div>

        <button className="admin-primary-btn">
          + Add New
        </button>
      </div>

      {/* STATS */}

      <div className="admin-stat-grid">
        {stats.map((stat) => (
          <div className="admin-stat-card" key={stat.label}>
            <span>{stat.label}</span>

            <div className="admin-stat-bottom">
              <strong>{stat.value}</strong>

              <small>{stat.change}</small>
            </div>
          </div>
        ))}
      </div>

      {/* CONTENT */}

      <div className="admin-dashboard-grid">
        <section className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <h3>Recent Places</h3>
              <p>Recently added destinations</p>
            </div>

            <button>View all</button>
          </div>

          <div className="admin-empty">
            <div className="admin-empty-icon">+</div>

            <strong>No recent places</strong>

            <span>
              Newly added places will appear here.
            </span>
          </div>
        </section>

        <section className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <h3>Quick Actions</h3>
              <p>Frequently used operations</p>
            </div>
          </div>

          <div className="admin-quick-actions">
            <button>+ Add Place</button>
            <button>+ Add Resort</button>
            <button>+ Add Food Spot</button>
            <button>+ Add Taxi</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;