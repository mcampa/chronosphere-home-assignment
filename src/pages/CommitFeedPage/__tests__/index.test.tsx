import React from "react";
import CommitFeedPage from "..";
import * as fixtures from "../../../test-utils/fixtures";
import * as githubApi from "../../../api/github";
import { act } from "react-dom/test-utils";
import { screen, within } from "@testing-library/react";
import { renderPageWithRouter } from "../../../test-utils";
import { RepoBranch, Repository, RepoCommit } from "../../../api/github";

describe("CommitFeedPage", () => {
  let repositoryPromise: Promise<Repository>;
  let branchesPromise: Promise<RepoBranch[]>;
  let commitsPromise: Promise<RepoCommit[]>;

  beforeEach(() => {
    branchesPromise = Promise.resolve(fixtures.branches);
    repositoryPromise = Promise.resolve(fixtures.repository);
    commitsPromise = Promise.resolve(fixtures.repoCommits);

    jest.spyOn(githubApi, "getRepoBranches").mockReturnValue(branchesPromise);
    jest.spyOn(githubApi, "getRepository").mockReturnValue(repositoryPromise);
    jest.spyOn(githubApi, "getRepoCommits").mockReturnValue(commitsPromise);
  });

  test("renders header", async () => {
    renderPageWithRouter(<CommitFeedPage />, {
      path: "/:user/:repo",
      initialEntries: ["/foo/bar"],
    });

    await act(async () => {
      await Promise.all([branchesPromise, repositoryPromise, commitsPromise]);
    });

    expect(screen.getByText("Commit Feed")).toBeInTheDocument();
    expect(await screen.findByText(/Showing results for/)).toBeInTheDocument();
  });

  test.each(fixtures.repoCommits)("renders commit row %#", async (commit) => {
    renderPageWithRouter(<CommitFeedPage />, {
      path: "/:user/:repo",
      initialEntries: ["/foo/bar"],
    });

    await act(async () => {
      await Promise.all([branchesPromise, repositoryPromise, commitsPromise]);
    });

    const commitRow = screen.getByTestId(commit.sha);
    expect(commitRow).toBeInTheDocument();
    expect(within(commitRow).getByText(commit.message)).toBeInTheDocument();
    expect(
      within(commitRow).getByText(commit.authorName as string)
    ).toBeInTheDocument();
  });
});
