import { ITechnologys } from './technologys';

export interface IProject {
  id: number;
  name: string;
  github: string;
  difficulty: number;
  img: string;
  gif: string;
  description: string;
  language: string;
  created_at: string;
  technologys: ITechnologys[];
}

export interface PUTProject {
  name: string;
  github: string;
  description: string;
  difficulty: number;
  img: string;
  gif: string;
  technologys_id: number[];
}
