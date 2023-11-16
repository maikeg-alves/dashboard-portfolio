/* export interface IGithub {
  id: number;
  name: string;
  full_name: string;
  private: false;
  updated_at: string;
  description: string;
  language: string;
} */

export interface IGithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  created_at: string;
  pushed_at: string;
  language: string | null;
}
export interface IGithubRepos {
  id: number;
  name: string;
  language: string | null;
}
