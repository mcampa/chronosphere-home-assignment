import { useCallback, useEffect, useState } from "react";
import { getRepoCommits, RepoCommit } from "../api/github";
import { useParams } from "react-router-dom";

const FIRST_PAGE = 1;

type UserRepoParams = {
  user: string;
  repo: string;
};

export default function useGithub(): [RepoCommit[], () => void, boolean] {
  const { user, repo } = useParams<UserRepoParams>();
  const [page, setPage] = useState<number>(FIRST_PAGE);
  const [commits, setCommits] = useState<RepoCommit[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadCommits();
  }, [page]);

  const loadCommits = async () => {
    if (user && repo) {
      try {
        setLoading(true);
        const newCommits = await getRepoCommits(user, repo, page);
        setCommits((commits) => [...commits, ...newCommits]);
      } finally {
        setLoading(false);
      }
    }
  };

  const loadMore = () => {
    setPage((page) => page + 1);
  };

  return [commits, loadMore, loading];
}
