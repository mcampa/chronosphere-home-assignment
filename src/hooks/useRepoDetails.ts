import { useEffect, useState } from "react";
import { getRepoDetails, RepoDetails } from "../api/github";

export default function useRepoDetails(
  user: string,
  repo: string
): { repoDetails?: RepoDetails; loadingDetails: boolean } {
  const [repoDetails, setRepoDetails] = useState<RepoDetails>();
  const [loadingDetails, setLoadingDetails] = useState<boolean>(true);

  useEffect(() => {
    !loadingDetails && setLoadingDetails(true);
    getRepoDetails(user, repo)
      .then((details: RepoDetails) => setRepoDetails(details))
      .finally(() => setLoadingDetails(false));
  }, []);

  return { repoDetails, loadingDetails };
}
