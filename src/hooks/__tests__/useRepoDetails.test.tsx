import { useRepoDetails } from "../useRepoDetails";
import { act } from "react-dom/test-utils";
import { renderHook } from "@testing-library/react-hooks";
import * as fixtures from "../../test-utils/fixtures";
import * as githubApi from "../../api/github";
import { RepoBranches, Repository } from "../../api/github";

describe("useRepoDetails", () => {
  let repositoryPromise: Promise<Repository>;
  let branchesPromise: Promise<RepoBranches>;
  const user = "foo";
  const repo = "bar";

  beforeEach(() => {
    repositoryPromise = Promise.resolve(fixtures.repository);
    branchesPromise = Promise.resolve(fixtures.branches);
    jest.spyOn(githubApi, "getRepository").mockReturnValue(repositoryPromise);
    jest.spyOn(githubApi, "getRepoBranches").mockReturnValue(branchesPromise);
  });

  test("fetches repo data and branches", async () => {
    const { result } = renderHook(() => useRepoDetails(user, repo));

    expect(result.current.repository).toEqual(undefined);
    expect(result.current.branches).toEqual(undefined);
    expect(result.current.loadingDetails).toEqual(true);

    await act(async () => {
      await branchesPromise;
      await repositoryPromise;
    });

    expect(githubApi.getRepository).toHaveBeenCalledWith(user, repo);
    expect(githubApi.getRepoBranches).toHaveBeenCalledWith(user, repo);

    expect(result.current.repository).toEqual(fixtures.repository);
    expect(result.current.branches).toEqual(fixtures.branches);
    expect(result.current.loadingDetails).toEqual(false);
  });
});
