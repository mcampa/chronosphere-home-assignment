import React from "react";
import { Layout } from "antd";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import useRepoDetails from "../../hooks/useRepoDetails";
import useRepoCommits from "../../hooks/useRepoCommits";
import useInputParams from "../../hooks/useInputParams";
import CommitRow from "./CommitRow";
import BranchesDropdown from "./BranchesDropdown";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import styles from "./index.module.css";

export default function CommitFeedPage() {
  const navigate = useNavigate();
  let { user, repo, branch } = useInputParams();
  const { repository, branches, loadingDetails } = useRepoDetails(user, repo);
  const { repoCommits, loadMoreCommits, loadingCommits } = useRepoCommits(
    user,
    repo,
    branch
  );
  const loaderRef = useIntersectionObserver(loadMoreCommits, [repoCommits]);

  const handleChangeBranch = (branch: string) => {
    const isDefaultBranch = repository?.default_branch === branch;
    const queryParams = isDefaultBranch
      ? ""
      : `?branch=${encodeURIComponent(branch)}`;
    navigate(`/${user}/${repo}${queryParams}`);
  };

  return (
    <Layout>
      <Layout.Content>
        <h1>Commit Feed</h1>
        <h2>
          Showing results for: {user}/{repo}
        </h2>
        <BranchesDropdown
          branches={branches}
          current={branch || repository?.default_branch}
          disabled={loadingDetails}
          onClick={handleChangeBranch}
        />
        {repository ? <p>{repository.description}</p> : <Spin />}
        <ul className={styles.commitList}>
          {repoCommits.map((commit) => (
            <CommitRow commit={commit} key={commit.sha} />
          ))}
        </ul>
        <div ref={loaderRef}>
          {loadingCommits ? (
            <div className={styles.commitLoaderSpinner}>
              <Spin />
            </div>
          ) : null}
        </div>
      </Layout.Content>
    </Layout>
  );
}
