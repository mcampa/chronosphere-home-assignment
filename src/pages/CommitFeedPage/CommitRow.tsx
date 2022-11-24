import React from "react";
import { RepoCommit } from "../../api/github";
import "./CommitRow.css";

type Props = {
  commit: RepoCommit;
};
export default function CommitRow({ commit }: Props) {
  const formattedDate = React.useMemo(() => {
    if (!commit.date) {
      return "N/A";
    }

    const date = new Date(commit.date);
    return `${date.toDateString()} at ${date.toLocaleTimeString()}`;
  }, [commit.date]);

  return (
    <a
      className="root"
      href={commit.url}
      referrerPolicy="no-referrer"
      target="_blank"
    >
      <div className="authorColumn">
        {commit.authorAvatar && <img src={commit.authorAvatar} alt="avatar" />}
        <div>{commit.authorName}</div>
      </div>
      <div className="messageColumn">
        <a href={commit.url} referrerPolicy="no-referrer" target="_blank">
          {commit.message}
        </a>
      </div>
      <div className="dateColumn">{formattedDate}</div>
    </a>
  );
}
