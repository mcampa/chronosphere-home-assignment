import React from "react";
import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import * as fixtures from "../../../fixtures";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import CommitFeedPage from "..";
import * as hooks from "../../../hooks";

jest.mock("../../../hooks", () => ({
  ...jest.requireActual("../../../hooks"),
  useInputParams: jest.fn(),
  useRepoDetails: jest.fn(),
  useRepoCommits: jest.fn(),
}));

describe("CommitFeedPage", () => {
  function setup() {
    const path = "/foo/bar";
    render(
      <RouterProvider
        router={createMemoryRouter([{ path, element: <CommitFeedPage /> }], {
          initialEntries: [path],
        })}
      />
    );
  }

  beforeEach(() => {
    jest.spyOn(hooks, "useInputParams").mockReturnValue({
      user: "foo",
      repo: "bar",
      branch: undefined,
    });
    jest.spyOn(hooks, "useRepoDetails").mockReturnValue({
      repository: fixtures.repository,
      branches: fixtures.branches,
      loadingDetails: false,
    });
    jest.spyOn(hooks, "useRepoCommits").mockReturnValue({
      repoCommits: fixtures.repoCommits,
      loadMoreCommits: jest.fn(),
      loadingCommits: false,
    });
    setup();
  });

  test("renders header", async () => {
    expect(screen.getByText("Commit Feed")).toBeInTheDocument();
    expect(await screen.findByText(/Showing results for/)).toBeInTheDocument();
  });

  test.each(fixtures.repoCommits)("renders commit row", async (commit) => {
    const commitRow = screen.getByTestId(commit.sha);
    expect(commitRow).toBeInTheDocument();
    expect(within(commitRow).getByText(commit.message)).toBeInTheDocument();
    expect(within(commitRow).getByText(commit.authorName)).toBeInTheDocument();
  });
});
