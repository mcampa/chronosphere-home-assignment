import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import HomePage from "..";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("HomePage", () => {
  let user;
  function setup() {
    mockedUsedNavigate.mockReset();
    const path = "/";
    user = userEvent.setup();
    render(
      <React.StrictMode>
        <RouterProvider
          router={createMemoryRouter([{ path, element: <HomePage /> }], {
            initialEntries: [path],
          })}
        />
      </React.StrictMode>
    );
  }

  beforeEach(() => {
    setup();
  });

  test("renders homepage", () => {
    const title = screen.getByText(/GitHub Commit Explorer/);
    expect(title).toBeInTheDocument();
  });

  test("submit button is disabled", () => {
    const button = screen.getByRole("button", { name: "Go" });
    expect(button).toBeDisabled();
  });

  test("navigates to commit feed page", async () => {
    expect.assertions(2);
    await userEvent.type(screen.getByLabelText("GitHub account"), "foo");
    await userEvent.type(screen.getByLabelText("Repository"), "bar");
    const button = screen.getByRole("button", { name: "Go" });
    expect(button).not.toBeDisabled();
    await userEvent.click(button);
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/foo/bar");
  });
});
