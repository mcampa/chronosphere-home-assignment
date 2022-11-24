import { useCallback, useEffect, useState } from "react";
import { getRepoCommits, RepoCommit } from "../api/github";

const FIRST_PAGE = 1;

export default function useRepoCommits(
  user: string,
  repo: string
): {
  repoCommits: RepoCommit[];
  loadMoreCommits: () => void;
  loadingCommits: boolean;
} {
  const [page, setPage] = useState<number>(FIRST_PAGE);
  const [repoCommits, setCommits] = useState<RepoCommit[]>([]);
  const [loadingCommits, setLoadingCommits] = useState<boolean>(true);

  useEffect(() => {
    loadCommits();
  }, [page]);

  const loadCommits = async () => {
    try {
      !loadingCommits && setLoadingCommits(true);
      const newCommits = await getRepoCommits(user, repo, page);
      setCommits((repoCommits) => [...repoCommits, ...newCommits]);
    } finally {
      setLoadingCommits(false);
    }
  };

  const loadMoreCommits = () => {
    setPage((page) => page + 1);
  };

  return {
    repoCommits,
    loadMoreCommits,
    loadingCommits,
  };
}
