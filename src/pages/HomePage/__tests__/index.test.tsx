import React from "react";
import HomePage from "..";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryHistory } from "history";
import { renderPageWithRouter } from "../../../test-utils";

describe("HomePage", () => {
  function setup(): MemoryHistory {
    return renderPageWithRouter(<HomePage />, {
      path: "/",
      initialEntries: ["/"],
    }).history;
  }

  test("renders homepage", () => {
    setup();
    const title = screen.getByText(/GitHub Commit Explorer/);
    expect(title).toBeInTheDocument();
  });

  test("submit button is disabled", () => {
    setup();
    const button = screen.getByRole("button", { name: "Go" });
    expect(button).toBeDisabled();
  });

  test("navigates to commit feed page", async () => {
    const history = setup();
    expect.assertions(2);
    await userEvent.type(screen.getByLabelText("GitHub account"), "foo");
    await userEvent.type(screen.getByLabelText("Repository"), "bar");
    const button = screen.getByRole("button", { name: "Go" });
    expect(button).not.toBeDisabled();
    await userEvent.click(button);
    expect(history.location.pathname).toBe("/foo/bar");
  });
});
