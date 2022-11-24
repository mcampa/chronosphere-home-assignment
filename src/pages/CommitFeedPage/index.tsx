import React from "react";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import useRepoDetails from "../../hooks/useRepoDetails";
import useRepoCommits from "../../hooks/useRepoCommits";
import CommitRow from "./CommitRow";
import { useParams } from "react-router-dom";

type CommitFeedPageParams = {
  user: string;
  repo: string;
};

export default function CommitFeedPage() {
  const { user = "", repo = "" } = useParams<CommitFeedPageParams>();
  const { repoDetails } = useRepoDetails(user, repo);
  const { repoCommits, loadMoreCommits, loadingCommits } = useRepoCommits(
    user,
    repo
  );
  const loaderRef = useIntersectionObserver(loadMoreCommits, [repoCommits]);

  return (
    <div className="">
      <h1>Commit Feed</h1>
      <h2>
        Showing results for: {user}/{repo}
      </h2>
      {repoDetails ? <p>{repoDetails.description}</p> : "Loading..."}
      <div>
        {repoCommits.map((commit) => (
          <CommitRow commit={commit} key={commit.sha} />
        ))}
      </div>
      <div ref={loaderRef}>{loadingCommits ? "Loading..." : null}</div>
    </div>
  );
}
