import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate  } from "react-router-dom";
import "../css/login.css";

export default function LoginPage() {
    const navigate = useNavigate ();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, seterrorMessage] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleRegistration = async (e) => {
        e.preventDefault();

        // Perform validation checks here
        if (!email || !password || !confirmPassword) {
            alert("Please fill in all the fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // Send registration data to the server
        const registrationData = { email, password };

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registrationData),
            });

            if (response.ok) {
                alert("Registration successfull");
                navigate("/login"); // Redirect to the login page
            } else {
                alert("Registration failed");
            }
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    return (
        <div className="loging_page">
            <form onSubmit={handleRegistration} className="container">
                <h1>Register</h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                />

                <input type="submit" value="Register" />

                <p>or register with:</p>
                <div className="social-login">
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
