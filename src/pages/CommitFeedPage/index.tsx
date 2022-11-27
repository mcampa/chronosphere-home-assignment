import React from "react";
import {
  useInputParams,
  useIntersectionObserver,
  useRepoCommits,
  useRepoDetails,
} from "../../hooks";
import CommitRow from "./CommitRow";
import BranchesDropdown from "./BranchesDropdown";
import ScrollBackToTop from "./ScrollBackToTop";
import { HiArrowCircleLeft } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
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

  const renderHeader = () => (
    <div className={styles.header}>
      <Link className={styles.headerBack} to="/">
        <HiArrowCircleLeft />
      </Link>
      <h1 className={styles.headerTitle}>Commit Feed</h1>
      <div className={styles.headerRepo}>
        Showing results for: <span>{user}</span> / <span>{repo}</span>
      </div>
      {branches && (
        <div className={styles.headerBranches}>
          <BranchesDropdown
            branches={branches}
            current={branch || repository?.default_branch}
            onClick={handleChangeBranch}
          />
        </div>
      )}
      <div className={styles.headerDescription}>
        {repository && <p>{repository.description}</p>}
      </div>
    </div>
  );

  const renderSpinner = () => (
    <div className={styles.commitLoaderSpinner}>
      <Spin />
    </div>
  );

  const renderNotFound = () => (
    <div className={styles.notFound}>
      <h2>Uh-oh!</h2>
      <div>Seems like this repository does not exist.</div>
      <Link to="/">Go back home</Link>
    </div>
  );

  return (
    <main className={styles.root}>
      {renderHeader()}
      {loadingDetails && renderSpinner()}
      {!loadingDetails && !repository && renderNotFound()}
      <ul className={styles.commitList}>
        {repoCommits.map((commit) => (
          <CommitRow commit={commit} key={commit.sha} />
        ))}
      </ul>
      <div className={styles.loader} ref={loaderRef}>
        {loadingCommits && renderSpinner()}
      </div>
      <ScrollBackToTop />
    </main>
  );
}
