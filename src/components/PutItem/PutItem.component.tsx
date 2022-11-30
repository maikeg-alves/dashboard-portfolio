import { IProject } from '@interfaces';

const PutItem: React.FC<IProject[]> = (props) => {
  const { name } = props[0];

  return (
    <>
      <p>editando projeto: {name}</p>
    </>
  );
};

export { PutItem };
