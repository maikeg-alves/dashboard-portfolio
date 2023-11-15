import { IGithub, IProject } from '@interfaces';
import { baseUrl } from '../baseurl';
import { checkIfUserIsLoggedIn } from '@utils';

export async function getData() {
  try {
    const [data1, data2, datagit] = await Promise.all([
      fetch(`${baseUrl}api/projects`),
      fetch(`${baseUrl}api/technologys`),
      fetch('https://api.github.com/users/maikeg-alves/repos', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${process.env.GITHUB_TOKEN}`,
        },
      }),
    ]);

    const dateProjects = await data1.json();
    const technologys = await data2.json();
    const github = await datagit.json();

    const projects: IProject[] = dateProjects.map((project: IProject) => {
      const validated = github.find(
        (github: IGithub) => github.name === project.github,
      );
      const { description, language, created_at } = validated;
      return {
        ...project,
        description,
        language,
        created_at,
      };
    });

    const admin = await checkIfUserIsLoggedIn();

    return {
      projects,
      technologys,
      github,
      values: false,
      admin: admin,
    };
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return {
      projects: [],
      technologys: [],
      github: [],
      values: false,
      admin: false,
    };
  }
}
