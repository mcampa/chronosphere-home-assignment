import React, { useCallback, useEffect, useRef } from "react";
import useGithub from "../../hooks/useGithub";
import { useParams } from "react-router-dom";

type UserRepoParams = {
  user: string;
  repo: string;
};

export default function UserRepo() {
  const { user = "", repo = "" } = useParams<UserRepoParams>();
  const [commits, loadMore, loading] = useGithub(user, repo);
  const loader = useRef(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting) {
        console.log("loadMore();");
        loadMore();
      }
    },
    [commits]
  );

  useEffect(() => {
    const option = {
      // root: null,
      // rootMargin: "20px",
      // threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) {
      console.log(".");
      observer.observe(loader.current);
    }

    return () => observer && observer.disconnect();
  }, [loader.current]);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Commits</h1>
      <div>
        {commits.map((commit, index) => (
          <pre key={index}>{JSON.stringify(commit, null, 2)}</pre>
        ))}
      </div>
      {loading ? "Loading..." : null}
      <button onClick={loadMore}>Load more</button>
      <div ref={loader} />
    </div>
  );
}
