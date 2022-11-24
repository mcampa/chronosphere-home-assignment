import React from "react";
import useGithub from "../../hooks/useGithub";

export default function UserRepo() {
  const [commits, loadMore, loading] = useGithub();

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Commits</h1>
      {commits.map((commit) => (
        <pre key={commit.sha}>{JSON.stringify(commit, null, 2)}</pre>
      ))}
      {loading ? "Loading..." : null}
      <button onClick={loadMore}>Load more</button>
    </div>
  );
}
