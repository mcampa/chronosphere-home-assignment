import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

export default function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [repo, setRepo] = useState("");

  const handleUserChange = (event: any) => {
    setUser(event.target.value);
  };

  const handleRepoChange = (event: any) => {
    setRepo(event?.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    navigate(`/${user}/${repo}`);
  };

  return (
    <main className={styles.root}>
      <h1>GitHub Commit Explorer</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="user"
          onChange={handleUserChange}
          placeholder="GitHub account"
          value={user}
        />
        <input
          type="text"
          name="repo"
          onChange={handleRepoChange}
          placeholder="Repository"
          value={repo}
        />
        <button disabled={!user || !repo} type="submit">
          Go
        </button>
      </form>
    </main>
  );
}
