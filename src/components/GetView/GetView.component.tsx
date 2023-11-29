import * as React from 'react';
import { Provaider } from '@interfaces';

import { Container } from './styles';

import { Table, TableItems } from '@components';
import { sortByCreatedAt } from '@utils';

interface PropsGetView extends Provaider {
  mode: 'tech' | 'project';
  SetUpdate: (id: number) => void;
  SetDelete: (id: number) => void;
}

const GetView: React.FC<PropsGetView> = (props) => {
  let projects;

  let techs;

  if (props.mode === 'tech') {
    techs = props.techs.sort(sortByCreatedAt);
  } else if (props.projects) {
    projects = props.projects.sort(sortByCreatedAt);
  }

  return (
    <Container xs={12}>
      <Table techs={!techs} projects={!projects}>
        {techs &&
          techs.map((techs) => (
            <>
              <TableItems
                {...techs}
                handleDeleteProject={(id) => props.SetDelete(id)}
                handleEditProject={(id) => props.SetUpdate(id)}
              />
            </>
          ))}
        {projects &&
          projects.map((projects) => (
            <>
              <TableItems
                {...projects}
                handleDeleteProject={(id) => props.SetDelete(id)}
                handleEditProject={(id) => props.SetUpdate(id)}
              />
            </>
          ))}
      </Table>
    </Container>
  );
};

export default GetView;
