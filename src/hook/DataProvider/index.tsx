import React from 'react';
import { IGithubRepos, IProject, ITech } from '@interfaces';
import { baseUrl } from '@constant';
import { Provaider } from '@interfaces';
import { GetCookie } from '@utils';

interface DataContextProps {
  dados: Provaider;
  atualizarDados: () => void;
  carregarDadosIniciais: () => void;
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

      if (GetCookie('accesstoken')) {
        setDados({
          ...dadosAtualizados,
          admin: true,
          values: true,
        });
      }

      setDados({ ...dadosAtualizados, values: true });
    } catch (error) {
      console.error('Erro ao carregar dados atualizados:', error);
    }
  };

  const carregarDadosIniciais = async () => {
    try {
      const dadosIniciais = await getData();

      if (dadosIniciais.admin && GetCookie('accesstoken')) {
        setDados({
          ...dadosIniciais,
          admin: true,
          values: true,
        });
      }

      setDados(dadosIniciais);

      setDados({ ...dadosIniciais, values: true });
    } catch (error) {
      console.error('Erro ao carregar dados iniciais:', error);
    }
  };

  return (
    <DataContext.Provider
      value={{ dados, atualizarDados, carregarDadosIniciais }}
    >
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

    let isAdmin = false;

    if (GetCookie('accesstoken')) {
      isAdmin = true;
    }

    return {
      projects,
      techs,
      github,
      values: false,
      admin: isAdmin,
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
