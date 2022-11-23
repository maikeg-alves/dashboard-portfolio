import { Table } from './styles';

type Props = {
  children: React.ReactNode;
};

const TableItems: React.FC<Props> = ({ children }) => {
  return <Table>{children}</Table>;
};

export default TableItems;
