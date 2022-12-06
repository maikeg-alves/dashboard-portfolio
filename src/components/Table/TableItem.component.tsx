import { GrEdit } from 'react-icons/gr';
import { BsTrash } from 'react-icons/bs';
import { formatDate } from '../../scripts';
import { ITechnologys } from '../../interfaces';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Text } from './styles';

type Props = {
  id: number;
  name: string;
  created_at: string;
  technologys: ITechnologys[];
  idproject: number;
  handleDeleteProject: (id: number) => void;
  handleEditProject: (id: number) => void;
};

const TableItems: React.FC<Props> = ({
  id,
  name,
  created_at,
  technologys,
  idproject,
  handleDeleteProject,
  handleEditProject,
}) => {
  return (
    <tr>
      <td> {id || 0}</td>
      <td>{name || 'Name project'}</td>
      <td>{formatDate(created_at) || 'Date Project'}</td>
      <td>
        <OverlayTrigger
          placement={'bottom'}
          overlay={
            <Tooltip id={`tooltip-bottom`}>
              <Text>
                {technologys &&
                  technologys.map((technologo, index) => (
                    <div key={index}>
                      <p> {technologo.name}</p>
                    </div>
                  ))}
              </Text>
            </Tooltip>
          }
        >
          <button>Tecnologys</button>
        </OverlayTrigger>
      </td>
      <td> {idproject || 'ID Project'}</td>
      <td>
        <button onClick={() => handleEditProject(idproject)}>
          <GrEdit className="icon-edit " />
        </button>
      </td>
      <td>
        <button onClick={() => handleDeleteProject(idproject)}>
          <BsTrash className="icon-delete" />
        </button>
      </td>
    </tr>
  );
};

export default TableItems;
