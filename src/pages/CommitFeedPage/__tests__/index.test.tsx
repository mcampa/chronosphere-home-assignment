import React from "react";
import CommitFeedPage from "..";
import * as fixtures from "../../../test-utils/fixtures";
import * as githubApi from "../../../api/github";
import { act } from "react-dom/test-utils";
import { screen, within } from "@testing-library/react";
import { renderPageWithRouter } from "../../../test-utils";

jest.mock("../../../api/github", () => ({
  getRepoCommits: jest.fn(),
  getRepository: jest.fn(),
  getRepoBranches: jest.fn(),
}));

describe("CommitFeedPage", () => {
  beforeEach(async () => {
    const branchesPromise = Promise.resolve(fixtures.branches);
    const repositoryPromise = Promise.resolve(fixtures.repository);
    const commitsPromise = Promise.resolve(fixtures.repoCommits);

    jest.spyOn(githubApi, "getRepoBranches").mockReturnValue(branchesPromise);
    jest.spyOn(githubApi, "getRepository").mockReturnValue(repositoryPromise);
    jest.spyOn(githubApi, "getRepoCommits").mockReturnValue(commitsPromise);

    renderPageWithRouter(<CommitFeedPage />, {
      path: "/:user/:repo",
      initialEntries: ["/foo/bar"],
    });

    await act(async () => {
      await Promise.all([branchesPromise, repositoryPromise, commitsPromise]);
    });
  });

  test("renders header", async () => {
    expect(screen.getByText("Commit Feed")).toBeInTheDocument();
    expect(await screen.findByText(/Showing results for/)).toBeInTheDocument();
  });

  test.each(fixtures.repoCommits)("renders commit row", async (commit) => {
    const commitRow = screen.getByTestId(commit.sha);
    expect(commitRow).toBeInTheDocument();
    expect(within(commitRow).getByText(commit.message)).toBeInTheDocument();
    expect(
      within(commitRow).getByText(commit.authorName as string)
    ).toBeInTheDocument();
  });
});
