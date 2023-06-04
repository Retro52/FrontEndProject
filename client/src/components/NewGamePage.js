import React, { useState, useContext, useEffect } from "react";
import { useNavigate  } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function NewGame() {
    const { user } = useContext(AuthContext);

    const navigate = useNavigate ();

    console.log(user);
    useEffect(() => {
        if (!user) {
            navigate("/login"); // Redirect to the login page
        }
      }, [user, navigate]);
    

    const [title, setTitle] = useState("");
    const [posterLink, setPosterLink] = useState("");
    const [developers, setDevelopers] = useState([user?.email]);
    const [releaseYear, setReleaseYear] = useState(new Date().getFullYear());
  
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDeveloperChange = (e, index) => {
        const updatedDevelopers = [...developers];
        updatedDevelopers[index] = e.target.value;
        setDevelopers(updatedDevelopers);
    };

    const handleAddDeveloper = () => {
        setDevelopers([...developers, ""]);
    };

    const handleReleaseYearChange = (e) => {
        setReleaseYear(e.target.value);
    };

    const handlePosterLinkChange = (e) => {
        setPosterLink(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form data
        if (title.trim() === "") {
            alert("Please enter a title.");
            return;
        }

        // Perform further validation or API request here

        // Redirect to success page
        window.location.href = "/success";
    };

    return (
        <div>
            <h2>Upload New Game</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={handleTitleChange} required />
                </div>
                <div>
                    <label>Developers:</label>
                    {developers.map((developer, index) => (
                        <input
                            key={index}
                            type="text"
                            value={developer}
                            onChange={(e) => handleDeveloperChange(e, index)}
                            required
                        />
                    ))}
                    <button type="button" onClick={handleAddDeveloper}>
                        Add Developer
                    </button>
                </div>
                <div>
                    <label>Release Year:</label>
                    <input
                        type="number"
                        value={releaseYear}
                        onChange={handleReleaseYearChange}
                        min="1900"
                        max={new Date().getFullYear()}
                    />
                </div>
                <div>
                    <label>Poster Link:</label>
                    <input type="text" value={posterLink} onChange={handlePosterLinkChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
