import * as React from 'react';
import { Provaider } from '@interfaces';

import { Container } from './styles';

import { Table, TableItems } from '@components';
import { sortByCreatedAt } from '@utils';

interface PropsGetView extends Provaider {
  mode: 'techs' | 'projects';
  SetUpdate: (id: number) => void;
  SetDelete: (id: number) => void;
}

const GetView: React.FC<PropsGetView> = (props) => {
  let projects;

  let techs;

  if (props.mode === 'techs') {
    techs = props.techs.sort(sortByCreatedAt);
  } else if (props.projects) {
    projects = props.projects.sort(sortByCreatedAt);
  }

  return (
    <Container xs={12}>
      <Table techs={!techs} projects={!projects}>
        {techs &&
          techs.map((tech) => (
            <React.Fragment key={tech.id}>
              <TableItems
                {...tech}
                handleDeleteProject={(id) => props.SetDelete(id)}
                handleEditProject={(id) => props.SetUpdate(id)}
              />
            </React.Fragment>
          ))}
        {projects &&
          projects.map((project) => (
            <React.Fragment key={project.id}>
              <TableItems
                {...project}
                handleDeleteProject={(id) => props.SetDelete(id)}
                handleEditProject={(id) => props.SetUpdate(id)}
              />
            </React.Fragment>
          ))}
      </Table>
    </Container>
  );
};

export default GetView;
