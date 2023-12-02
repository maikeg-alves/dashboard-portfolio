import React from 'react';
import { IGithubRepos, IProject, ITech } from '@interfaces';
import { baseUrl } from '@constant';
import { Provaider } from '@interfaces';

interface DataContextProps {
  dados: Provaider;
  atualizarDados: () => void;
}

export const DataContext = React.createContext<DataContextProps | undefined>(
  undefined,
);

interface DataProviderProps {
  children: React.ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [dados, setDados] = React.useState<Provaider>({
    projects: [],
    techs: [],
    github: [],
    values: false,
    admin: false,
  });

  const atualizarDados = async () => {
    try {
      const dadosAtualizados = await getData();
      setDados(dadosAtualizados);
    } catch (error) {
      console.error('Erro ao carregar dados atualizados:', error);
    }
  };

  React.useEffect(() => {
    const carregarDadosIniciais = async () => {
      try {
        const dadosIniciais = await getData();
        setDados(dadosIniciais);
      } catch (error) {
        console.error('Erro ao carregar dados iniciais:', error);
      }
    };

    carregarDadosIniciais();
  }, []);

  return (
    <DataContext.Provider value={{ dados, atualizarDados }}>
      {children}
    </DataContext.Provider>
  );
};

export async function getData() {
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
      techs: [],
      github: [],
      values: false,
      admin: false,
    };
  }
}
