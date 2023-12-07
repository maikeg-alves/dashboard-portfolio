import { Table } from './styles';

type Props = {
  children: React.ReactNode;
  projects?: boolean;
  techs?: boolean;
};

const TableItems: React.FC<Props> = ({ children, techs, projects }) => {
  return (
    <Table>
      <tbody>
        <tr className="sub-menu">
          <td>ID</td>
          <td>NAME</td>
          <td>CREATE</td>
          {projects && <td>PROJECTS</td>}
          {techs && <td>TECHS</td>}
          <td>EDIT</td>
          <td>DELETE</td>
        </tr>
        {children}
      </tbody>
    </Table>
  );
};

export default TableItems;
