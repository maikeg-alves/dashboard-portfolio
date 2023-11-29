import { GrEdit } from 'react-icons/gr';
import { BsTrash } from 'react-icons/bs';
import { formatDate } from '@utils';
import { IProject, ITech } from '../../interfaces';

type Props = {
  id: number;
  name: string;
  createdAt: string;

  techs?: ITech[] | null;
  projects?: IProject[] | null;

  handleDeleteProject: (id: number) => void;
  handleEditProject: (id: number) => void;
};

const TableItems: React.FC<Props> = ({
  id,
  name,
  createdAt,
  techs,
  projects,

  handleDeleteProject,
  handleEditProject,
}) => {
  return (
    <>
      <tr key={id}>
        <td> {id}</td>

        <td>{name || 'Name project'}</td>

        <td>{formatDate(createdAt) || 'Date Create'}</td>

        <td>{techs ? techs.length : projects?.length || 0}</td>

        <td>
          <button onClick={() => handleEditProject(id)}>
            <GrEdit className="icon-edit " />
          </button>
        </td>
        <td>
          <button onClick={() => handleDeleteProject(id)}>
            <BsTrash className="icon-delete" />
          </button>
        </td>
      </tr>
    </>
  );
};

export default TableItems;
