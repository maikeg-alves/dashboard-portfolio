import { IGithubRepos } from '../github';
import { IProject } from '../projects';
import { ITech } from '../techs';

export interface Provaider {
  projects: IProject[];
  techs: ITech[];
  github: IGithubRepos[];
  values: boolean;
  admin: boolean;
}
