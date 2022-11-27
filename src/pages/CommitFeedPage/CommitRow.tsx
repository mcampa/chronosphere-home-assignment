import React from "react";
import { RepoCommit } from "../../api/github";
import styles from "./CommitRow.module.css";

type Props = {
  commit: RepoCommit;
};
export default function CommitRow({ commit }: Props) {
  const formattedDate = React.useMemo(() => {
    if (!commit.date) {
      return "N/A";
    }

    const date = new Date(commit.date);
    return (
      <>
        <div>{date.toDateString()}</div>
        <div>at {date.toLocaleTimeString()}</div>
      </>
    );
  }, [commit.date]);

  return (
    <li className={styles.root} data-testid={commit.sha}>
      <div>
        {commit.authorAvatar && (
          <img
            className={styles.avatar}
            src={commit.authorAvatar}
            alt="avatar"
          />
        )}
      </div>
      <div className={styles.messageColumn}>
        <div>{commit.authorName}</div>
        <a
          className={styles.commitMessage}
          href={commit.url}
          referrerPolicy="no-referrer"
          target="_blank"
        >
          {commit.message}
        </a>
      </div>
      <div className={styles.dateColumn}>{formattedDate}</div>
    </li>
  );
}
