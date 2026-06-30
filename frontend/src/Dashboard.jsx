import { useLocation, useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "guest@example.com";

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <span className="login-logo">VIEWBOX</span>
        <button className="dashboard__signout" onClick={() => navigate("/")}>
          Sign out
        </button>
      </header>
      <main className="dashboard__main">
        <h1>Welcome back</h1>
        <p>You're signed in as {email}.</p>
        <p className="dashboard__hint">
          This is a placeholder dashboard — wire up real content here.
        </p>
      </main>
    </div>
  );
}
