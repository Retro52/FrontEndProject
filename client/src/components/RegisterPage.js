import React from "react";
import { Link } from "react-router-dom";
import "../css/login.css";

export default function LoginPage() {
    return (
        <div className="loging_page">
            <form action="login.php" method="post" class="container">
                <h1>Register</h1>

                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <input type="password" placeholder="Submit Password" required />

                <input type="submit" value="Register" />

                <p>or register with:</p>
                <div class="social-login">
                    <a href="google">GitHub</a>
                    <a href="gihub">Google</a>
                </div>
                <Link to="/login">
                    <p>Already have an account?</p>
                </Link>
            </form>
        </div>
    );
}
