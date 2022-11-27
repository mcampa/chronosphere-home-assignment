import { useCallback, useEffect, useState } from "react";
import { getRepoCommits, RepoCommit } from "../api/github";

const FIRST_PAGE = 1;

export type UseRepoCommits = {
  repoCommits: RepoCommit[];
  loadMoreCommits: () => void;
  loadingCommits: boolean;
};

export function useRepoCommits(
  user: string,
  repo: string,
  branch: string | undefined
): UseRepoCommits {
  const [page, setPage] = useState<number>(FIRST_PAGE);
  const [repoCommits, setCommits] = useState<RepoCommit[]>([]);
  const [loadingCommits, setLoadingCommits] = useState<boolean>(true);

  useEffect(() => {
    setCommits([]);
    setPage(FIRST_PAGE);
  }, [user, repo, branch]);

  const loadCommits = useCallback(
    async (page) => {
      try {
        !loadingCommits && setLoadingCommits(true);
        const newCommits = await getRepoCommits(user, repo, branch, page);
        setCommits((commits) => [...commits, ...newCommits]);
      } finally {
        setLoadingCommits(false);
      }
    },
    [branch, loadingCommits, repo, user]
  );

  useEffect(() => {
    loadCommits(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadMoreCommits = useCallback(() => {
    setPage((page) => page + 1);
  }, []);

  return {
    repoCommits,
    loadMoreCommits,
    loadingCommits,
  };
}
