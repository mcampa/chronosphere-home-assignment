import { Octokit } from "@octokit/core";
import { Endpoints } from "@octokit/types";

const octokit = new Octokit({
  auth: `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`,
});

export type RepoCommit = {
  sha: string;
  authorName?: string;
  authorEmail?: string;
  date?: string;
  message: string;
  url: string;
};

export async function getRepoCommits(
  owner: string,
  repo: string,
  page: number
): Promise<RepoCommit[]> {
  const { data } = await octokit.request("GET /repos/{owner}/{repo}/commits", {
    owner,
    repo,
    page,
  });

  return data.map((c) => ({
    sha: c.sha,
    authorName: (c.commit.author || {}).name,
    authorEmail: (c.commit.author || {}).email,
    date: (c.commit.author || {}).date,
    message: c.commit.message,
    url: c.html_url,
  }));
}
