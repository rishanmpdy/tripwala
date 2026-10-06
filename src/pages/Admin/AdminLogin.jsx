import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { isDemoAuth, sendPasswordReset } from "../../auth/authApi";
import "./Admin.css";

const AdminLogin = () => {
  const { session, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (session) return <Navigate to="/admin" replace />;

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(""); setMessage(""); setLoading(true);
    try {
      await login(email.trim(), password);
      navigate(location.state?.from || "/admin", { replace: true });
    } catch (loginError) { setError(loginError.message); } finally { setLoading(false); }
  };

  const handleReset = async () => {
    setError(""); setMessage("");
    if (!email.trim()) { setError("Enter your email address first, then choose password reset."); return; }
    try { await sendPasswordReset(email.trim()); setMessage("A password-reset link has been sent to your email."); }
    catch (resetError) { setError(resetError.message); }
  };

  return <main className="admin-auth-page"><section className="admin-auth-card">
    <Link className="admin-brand" to="/">traveltri <span>Admin</span></Link>
    <h1>Admin sign in</h1><p>{isDemoAuth ? "This is a local demo login. It will be replaced by your Python backend later." : "Use the administrator email and password configured in Firebase Authentication."}</p>
    {isDemoAuth && (
      <div className="admin-demo-roles">
        <span className="demo-roles-title">Choose role to test login:</span>
        <div className="demo-roles-buttons">
          <button
            type="button"
            className="btn-role-quick superadmin"
            onClick={() => {
              setEmail("superadmin@tripwala.demo");
              setPassword("TripWala@123");
            }}
          >
            ★ Superadmin
          </button>
          <button
            type="button"
            className="btn-role-quick admin"
            onClick={() => {
              setEmail("admin@tripwala.com");
              setPassword("TripWala@123");
            }}
          >
            🛡️ Admin
          </button>
          <button
            type="button"
            className="btn-role-quick user"
            onClick={() => {
              setEmail("user@tripwala.com");
              setPassword("TripWala@123");
            }}
          >
            👤 User / Staff
          </button>
        </div>
      </div>
    )}
    <form onSubmit={handleLogin}>
      <label>Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="e.g. superadmin@tripwala.demo" autoComplete="email" required /></label>
      <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required /></label>
      {error && <p className="admin-message error" role="alert">{error}</p>}
      {message && <p className="admin-message success">{message}</p>}
      <button className="admin-primary" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</button>
    </form>
    {!isDemoAuth && <button className="admin-text-button" type="button" onClick={handleReset}>Forgot password? Send reset email</button>}
    <Link className="admin-back-link" to="/">← Back to TripWala</Link>
  </section></main>;
};

export default AdminLogin;
