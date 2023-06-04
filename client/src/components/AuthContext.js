import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for user in localStorage when the component initializes
    console.log("Checking for cached data:");
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      console.log("Chached user found");
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (response.status === 200) {
      const user = await response.json();
      setUser(user);

      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      const error = await response.text();
      throw new Error(error);
    }
  };

  const logout = () => {
    setUser(null);

    // Remove user from localStorage
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
