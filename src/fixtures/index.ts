export const repository = {
  default_branch: "main",
  description: "This is the repository description",
};

export const branches = [
  { sha: "1eb71f723d3e76beb5d7600284eaa69106831111", name: "main" },
  { sha: "1eb71f723d3e76beb5d7600284eaa69106832222", name: "feature1" },
  { sha: "1eb71f723d3e76beb5d7600284eaa69106833333", name: "feature2" },
];

export const repoCommits = [
  {
    sha: "1eb71f723d3e76beb5d7600284eaa69106831111",
    authorName: "John Doe",
    authorEmail: "john@example.com",
    date: "2017-05-30T03:25:15Z",
    authorAvatar: "https://avatars.githubusercontent.com/u/1934727?v=4",
    message: "message 3",
    url: "https://github.com/foo/foo/commit/1eb71f723d3e76beb5d7600284eaa69106831111",
  },
  {
    sha: "e1c708798eae5581fc41e97b3573ba9f30b57462",
    authorName: "John Doe",
    authorEmail: "john@example.com",
    date: "2017-05-30T03:18:17Z",
    authorAvatar: "https://avatars.githubusercontent.com/u/1934727?v=4",
    message: "message 2",
    url: "https://github.com/foo/foo/commit/e1c708798eae5581fc41e97b3573ba9f30b57462",
  },
  {
    sha: "72b20dcc5c997fd830c0f5ee607e5eeaf4d2684e",
    authorName: "John Doe",
    authorEmail: "john@example.com",
    date: "2017-05-30T03:09:43Z",
    authorAvatar: "https://avatars.githubusercontent.com/u/1934727?v=4",
    message: "message 1",
    url: "https://github.com/foo/foo/commit/72b20dcc5c997fd830c0f5ee607e5eeaf4d2684e",
  },
];
