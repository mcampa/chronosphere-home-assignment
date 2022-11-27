import { useInputParams } from "../useInputParams";
import { renderHookWithRouter } from "../../test-utils";

describe("useInputParams", () => {
  test("returns parameters", async () => {
    const { result } = renderHookWithRouter(() => useInputParams(), {
      path: "/:user/:repo",
      initialEntries: ["/foo/bar"],
    });

    expect(result.current).toEqual({
      user: "foo",
      repo: "bar",
      branch: undefined,
    });
  });

  test("returns parameters with branch", async () => {
    const { result } = renderHookWithRouter(() => useInputParams(), {
      path: "/:user/:repo",
      initialEntries: ["/foo/bar?branch=featureX"],
    });

    expect(result.current).toEqual({
      user: "foo",
      repo: "bar",
      branch: "featureX",
    });
  });
});
