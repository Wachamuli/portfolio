import type { GitHubStats } from "./types";

declare namespace App {
  interface SessionData {
    githubStats: GitHubStats;
  }
}
