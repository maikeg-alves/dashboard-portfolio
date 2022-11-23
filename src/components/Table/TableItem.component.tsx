import { Tr } from './styles';
import { GrEdit } from 'react-icons/gr';
import { BsTrash } from 'react-icons/bs';

type Props = {
  id?: string;
  name?: string;
  date?: string;
  techs?: string;
  idproject?: string;
};

const TableItems: React.FC<Props> = ({ id, name, date, techs, idproject }) => {
  return (
    <>
      <Tr>
        <td> {id || 'id'}</td>
        <td>{name || 'Name project'}</td>
        <td>{date || 'Date Project'}</td>
        <td>{techs || 'Techs Project'}</td>
        <td> {idproject || 'ID Project'}</td>
        <td>
          <button>
            <GrEdit className="icon-edit " />
          </button>
        </td>
        <td>
          <button>
            <BsTrash className="icon-delete" />
          </button>
        </td>
      </Tr>
    </>
  );
};

export default TableItems;
