import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

export default function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [repo, setRepo] = useState("");

  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value);
  };

  const handleRepoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepo(event?.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/${user}/${repo}`);
  };

  return (
    <main className={styles.root}>
      <h1>GitHub Commit Explorer</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          aria-label="GitHub account"
          autoComplete="off"
          name="user"
          onChange={handleUserChange}
          placeholder="GitHub account"
          type="text"
          value={user}
        />
        <input
          aria-label="Repository"
          autoComplete="off"
          name="repo"
          onChange={handleRepoChange}
          placeholder="Repository"
          type="text"
          value={repo}
        />
        <button disabled={!user || !repo} type="submit">
          Go
        </button>
      </form>
    </main>
  );
}
