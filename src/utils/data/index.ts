import { IGithub, IProject } from '@interfaces';
import { baseUrl } from '../baseurl';
import { checkIfUserIsLoggedIn } from '@utils';

export async function getData() {
  try {
    const [projectsRes, techsRes, githubRes] = await Promise.all([
      fetch(`${baseUrl}projects`),
      fetch(`${baseUrl}techs`),
      fetch(`${baseUrl}github/repos`),
    ]);

    const projects = await projectsRes.json();
    const technologys = await techsRes.json();
    const github = await githubRes.json();

    return {
      projects,
      technologys,
      github,
      values: false,
      admin: true,
    };
  } catch (error) {
    return {
      projects: [],
      technologys: [],
      github: [],
      values: false,
      admin: false,
    };
  }
}
