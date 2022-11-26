import { Octokit } from "@octokit/core";

const octokit = new Octokit({
  auth: `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`,
});

export type RepoCommit = {
  sha: string;
  authorName?: string;
  authorEmail?: string;
  authorAvatar?: string;
  date?: string;
  message: string;
  url: string;
};

export async function getRepoCommits(
  owner: string,
  repo: string,
  sha: string | undefined,
  page: number
): Promise<RepoCommit[]> {
  const { data } = await octokit.request("GET /repos/{owner}/{repo}/commits", {
    owner,
    repo,
    sha,
    page,
  });

  return data.map(({ sha, author = {}, commit, html_url }) => {
    return {
      sha: sha,
      authorName: commit.author?.name,
      authorEmail: commit.author?.email,
      date: commit.author?.date,
      authorAvatar: author?.avatar_url,
      message: commit.message,
      url: html_url,
    };
  });
}

export type Repository = Awaited<ReturnType<typeof getRepository>>;

export async function getRepository(owner: string, repo: string) {
  const { data } = await octokit.request("GET /repos/{owner}/{repo}", {
    owner,
    repo,
  });

  return data;
}

export type RepoBranches = Awaited<ReturnType<typeof getRepoBranches>>;

export async function getRepoBranches(owner: string, repo: string) {
  const { data } = await octokit.request("GET /repos/{owner}/{repo}/branches", {
    owner,
    repo,
  });

  return data;
}
