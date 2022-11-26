import React from "react";
import { useLocation, useParams } from "react-router-dom";

type CommitFeedPageParams = {
  user: string;
  repo: string;
  branch?: string;
};

export default function useInputParams() {
  const { user = "", repo = "" } = useParams<CommitFeedPageParams>();
  const { search } = useLocation();

  return React.useMemo(() => {
    const queryParams = new URLSearchParams(search);
    const branch = queryParams.get("branch") || undefined;
    return {
      user,
      repo,
      branch,
    };
  }, [search, user, repo]);
}
