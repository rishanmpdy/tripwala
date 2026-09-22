import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import taxis from "../../data/taxis";
import places from "../../data/places";
import resorts from "../../data/resorts";
import "./Admin.css";

const AdminDashboard = () => {
  const { session, logout } = useAuth();
  return <main className="admin-dashboard"><header className="admin-topbar"><Link className="admin-brand" to="/">traveltri <span>Admin</span></Link><div><span>{session.email}</span><button onClick={logout}>Sign out</button></div></header>
    <section className="admin-intro"><p>Operations centre</p><h1>Manage TripWala content</h1><span>Signed in as {session.email}</span></section>
    <section className="admin-stats">
      <article><strong>{places.length}</strong><span>Destinations</span></article><article><strong>{resorts.length}</strong><span>Stays & resorts</span></article><article><strong>{taxis.length}</strong><span>Taxi listings</span></article>
    </section>
    <section className="admin-actions"><h2>Management shortcuts</h2><div>
      <Link to="/">View public site <span>→</span></Link><Link to="/taxi">Review taxi listings <span>→</span></Link><Link to="/food">Review food spots <span>→</span></Link>
    </div><p>Connect these views to your API/database next to add, edit, publish, and remove live content.</p></section>
  </main>;
};
export default AdminDashboard;
