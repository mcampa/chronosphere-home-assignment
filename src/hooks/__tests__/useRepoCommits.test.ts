import { useRepoCommits } from "../useRepoCommits";
import { RepoCommit } from "../../api/github";
import { act } from "react-dom/test-utils";
import { renderHook } from "@testing-library/react-hooks";
import * as fixtures from "../../test-utils/fixtures";
import * as githubApi from "../../api/github";

describe("useRepoCommits", () => {
  let commitsPromise: Promise<RepoCommit[]>;
  const user = "foo";
  const repo = "bar";
  const branch = "branch1";

  beforeEach(() => {
    commitsPromise = Promise.resolve(fixtures.repoCommits);
    jest.spyOn(githubApi, "getRepoCommits").mockReturnValue(commitsPromise);
  });

  test("fetches commits", async () => {
    const { result } = renderHook(() => useRepoCommits(user, repo, branch));

    expect(result.current.repoCommits).toEqual([]);
    expect(result.current.loadingCommits).toEqual(true);

    await act(async () => {
      await commitsPromise;
    });

    expect(githubApi.getRepoCommits).toHaveBeenCalledWith(
      user,
      repo,
      branch,
      1
    );

    expect(result.current.repoCommits).toEqual(fixtures.repoCommits);
    expect(result.current.loadingCommits).toEqual(false);
  });

  test("fetches more commits", async () => {
    const { result } = renderHook(() => useRepoCommits(user, repo, branch));

    await act(async () => {
      await commitsPromise;
    });

    expect(result.current.repoCommits).toHaveLength(3);

    await act(async () => {
      result.current.loadMoreCommits();
    });

    expect(result.current.repoCommits).toHaveLength(6);
  });
});
