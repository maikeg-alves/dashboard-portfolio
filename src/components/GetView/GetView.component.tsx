import { Col } from 'react-bootstrap';
import { TableItems } from '../../components';

const GetView = () => {
  const handledeleteProjects = () => {
    console.log('delete');
  };
  const handleeditProjects = () => {
    console.log('edit');
  };

  return (
    <Col xs={12} md={12}>
      <TableItems
        handleDeleteProject={handledeleteProjects}
        handleEditProject={handleeditProjects}
      />
      <TableItems
        handleDeleteProject={handledeleteProjects}
        handleEditProject={handleeditProjects}
      />
      <TableItems
        handleDeleteProject={handledeleteProjects}
        handleEditProject={handleeditProjects}
      />
      <TableItems
        handleDeleteProject={handledeleteProjects}
        handleEditProject={handleeditProjects}
      />
    </Col>
  );
};

export default GetView;
