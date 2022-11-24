import { useCallback, useEffect, useState } from "react";
import { getRepoCommits, RepoCommit } from "../api/github";

const FIRST_PAGE = 1;

export default function useGithub(
  user: string,
  repo: string
): [RepoCommit[], () => void, boolean] {
  const [page, setPage] = useState<number>(FIRST_PAGE);
  const [commits, setCommits] = useState<RepoCommit[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadCommits();
  }, [page]);

  const loadCommits = async () => {
    try {
      setLoading(true);
      const newCommits = await getRepoCommits(user, repo, page);
      setCommits((commits) => [...commits, ...newCommits]);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    setPage((page) => page + 1);
  };

  return [commits, loadMore, loading];
}
