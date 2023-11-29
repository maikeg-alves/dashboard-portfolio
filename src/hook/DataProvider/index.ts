import { IGithubRepos, IProject, ITech } from '@interfaces';
import { baseUrl } from '@constant';

export async function DataProvider() {
  try {
    const [projectsRes, techsRes, githubRes] = await Promise.all([
      fetch(`${baseUrl}projects?viewTechs=true`),
      fetch(`${baseUrl}techs?viewProjects=true`),
      fetch(`${baseUrl}github/repos`),
    ]);

    if (!projectsRes.ok || !techsRes.ok || !githubRes.ok) {
      throw new Error('Erro na requisição');
    }

    const projects = (await projectsRes.json()) as IProject[];
    const techs = (await techsRes.json()) as ITech[];
    const github = (await githubRes.json()) as IGithubRepos[];

    return {
      projects,
      techs,
      github,
      values: true,
      admin: true,
    };
  } catch (error) {
    console.error('Erro na requisição:', error);
    return {
      projects: [],
      technologys: [],
      github: [],
      values: false,
      admin: false,
    };
  }
}
