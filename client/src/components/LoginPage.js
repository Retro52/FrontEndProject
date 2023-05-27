import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../css/login.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(email, password);
      setError("");
      navigate("/");
    } catch (error) {
      setError(error.toString());
    }
  };

  return (
    <div className="loging_page">
      <form onSubmit={handleSubmit} class="container">
        <h1>Login: {password}</h1>
        {error && <p className="error-message">{error}</p>}

        <input
          type="text"
          placeholder="Login"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <input type="submit" value="Login" />
      </form>
      <div class="register-link">
        <Link to="/register">
          <p>Dont have an account? Regiter</p>
        </Link>
      </div>
    </div>
  );
}
