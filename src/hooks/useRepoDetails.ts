import { useEffect, useState } from "react";
import {
  getRepository,
  getRepoBranches,
  Repository,
  RepoBranches,
} from "../api/github";

export default function useRepoDetails(
  user: string,
  repo: string
): {
  repository?: Repository;
  branches?: RepoBranches;
  loadingDetails: boolean;
} {
  const [repository, setRepository] = useState<Repository>();
  const [branches, setBranches] = useState<RepoBranches>();
  const [loadingDetails, setLoadingDetails] = useState<boolean>(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
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
  }

  return { repository, branches, loadingDetails };
}
