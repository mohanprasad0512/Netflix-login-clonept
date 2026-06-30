import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

const API_URL = "http://localhost:4000/api/login";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    const errors = {};
    if (!email.trim()) errors.email = "Enter an email address.";
    if (!password.trim()) errors.password = "Enter a password.";
    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      const res = await axios.post(API_URL, { email, password });
      if (res.data?.success) {
        navigate("/dashboard", { state: { email } });
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      setServerError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-screen">
      <div className="login-screen__overlay" />

      <header className="login-header">
        <span className="login-logo">VIEWBOX</span>
      </header>

      <main className="login-main">
        <form className="login-card" onSubmit={handleSubmit} noValidate>
          <h1 className="login-card__title">Sign In</h1>

          {serverError && (
            <div className="login-alert" role="alert">
              {serverError}
            </div>
          )}

          <div className="field">
            <input
              id="email"
              type="text"
              autoComplete="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={fieldErrors.email ? "field__input has-error" : "field__input"}
            />
            <label htmlFor="email" className="field__label">
              Email or phone number
            </label>
            {fieldErrors.email && (
              <p className="field__error">{fieldErrors.email}</p>
            )}
          </div>

          <div className="field">
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={fieldErrors.password ? "field__input has-error" : "field__input"}
            />
            <label htmlFor="password" className="field__label">
              Password
            </label>
            {fieldErrors.password && (
              <p className="field__error">{fieldErrors.password}</p>
            )}
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Signing In…" : "Sign In"}
          </button>

          <div className="login-helpers">
            <label className="remember-me">
              <input type="checkbox" defaultChecked />
              Remember me
            </label>
            <a href="#" className="login-help-link">
              Need help?
            </a>
          </div>

          <p className="login-signup">
            New to Viewbox?{" "}
            <a href="#" className="login-signup-link">
              Sign up now.
            </a>
          </p>

          <p className="login-fineprint">
            This page uses test credentials for demo purposes. Try{" "}
            <code>demo@example.com</code> / <code>password123</code>.
          </p>
        </form>
      </main>
    </div>
  );
}
