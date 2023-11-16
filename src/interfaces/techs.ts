/* export interface ITechnologys {
  id: number;
  name: string;
  icon: string;
  ability: number;
}

export interface ITechnologysCRUD {
  name: string;
  icon: string;
  ability: number;
} */

import { IProject } from './projects';

export interface ITech {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  icon: string;
  description: string;
  projects?: IProject[];
}
