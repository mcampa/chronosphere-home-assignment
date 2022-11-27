import React from "react";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router, Routes, Route } from "react-router-dom";
import { renderHook } from "@testing-library/react-hooks";

type Options = {
  path: string;
  initialEntries?: string[];
};
export function renderPageWithRouter(
  element: React.ReactElement,
  { path, initialEntries }: Options
) {
  const history = createMemoryHistory();
  if (initialEntries) {
    initialEntries.forEach((entry) => history.push(entry));
  }

  const renderResults = render(
    <Router location={history.location} navigator={history}>
      <Routes>
        <Route path={path} element={element} />
      </Routes>
    </Router>
  );

  return { ...renderResults, history };
}

export function renderHookWithRouter(
  hookCallback: () => void,
  { path, initialEntries }: Options
) {
  const history = createMemoryHistory();
  if (initialEntries) {
    initialEntries.forEach((entry) => history.push(entry));
  }

  const { result } = renderHook(hookCallback, {
    wrapper: ({ children }) => (
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path={path} element={children} />
        </Routes>
      </Router>
    ),
  });

  return { result, history };
}
