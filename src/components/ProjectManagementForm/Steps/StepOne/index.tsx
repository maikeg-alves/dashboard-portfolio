import React from 'react';
import { Form } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import { Provaider } from '@interfaces';

interface StepOneProps extends Provaider {
  update?: boolean;
}

export const StepOne: React.FC<StepOneProps> = ({
  projects,
  github,
  update,
}) => {
  const { register, formState, setValue, getValues } = useFormContext();
  const { errors } = formState;

  if (Object.keys(errors).length > 0 && update) {
    if (!getValues().projectName) {
      setValue('projectName', projects[0].name);
    }
    if (!getValues().githubRepository) {
      setValue('githubRepository', projects[0].githubRepoId);
    }
  }

  return (
    <>
      <Form.Group>
        <Form.Label>Project Name</Form.Label>
        <Form.Control
          type="text"
          placeholder={`${(update && projects[0].name) || 'Nome do Projeto'}`}
          {...register('projectName', {
            required: true,
            pattern: /^[a-zA-Z]/,
          })}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Github repo</Form.Label>
        <Form.Select
          aria-label="Floating label select example"
          {...register('githubRepository', {
            required: true,
          })}
          defaultValue={update ? projects[0].githubRepoId : ''}
        >
          {github &&
            github
              .filter((repo) =>
                !update
                  ? !projects.some((proj) => proj.githubRepoId === repo.name)
                  : repo,
              )
              .map((repo) => (
                <option
                  key={repo.id}
                  value={repo.name}
                  selected={update && repo.name === projects[0].githubRepoId}
                >
                  {update && repo.name === projects[0].githubRepoId
                    ? projects[0].githubRepoId
                    : repo.name}
                </option>
              ))}
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>Descriotion</Form.Label>
        <Form.Control
          as="textarea"
          placeholder={`${
            (update && projects[0].description) || 'Descrição do projeto'
          }`}
          style={{ height: '100px' }}
          {...register('description', {
            required: false,
            maxLength: 250,
          })}
        />
      </Form.Group>
    </>
  );
};
