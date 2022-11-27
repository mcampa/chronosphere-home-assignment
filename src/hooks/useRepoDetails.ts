import { useCallback, useEffect, useState } from "react";
import {
  getRepository,
  getRepoBranches,
  Repository,
  RepoBranch,
} from "../api/github";

export type UseRepoDetails = {
  repository?: Repository;
  branches?: RepoBranch[];
  loadingDetails: boolean;
};

export function useRepoDetails(user: string, repo: string): UseRepoDetails {
  const [repository, setRepository] = useState<Repository>();
  const [branches, setBranches] = useState<RepoBranch[]>();
  const [loadingDetails, setLoadingDetails] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    !loadingDetails && setLoadingDetails(true);
    try {
      const [repository, branches] = await Promise.all([
        getRepository(user, repo),
        getRepoBranches(user, repo),
      ]);
      setRepository(repository);
      setBranches(branches);
    } finally {
      setLoadingDetails(false);
    }
  }, [loadingDetails, repo, user]);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { repository, branches, loadingDetails };
}
