import React from 'react';
import { Form } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import { Provaider } from '@interfaces';

interface StepOneProps extends Provaider {
  update?: boolean;
}

export const StepOne: React.FC<StepOneProps> = ({ techs, update }) => {
  const { register, formState, setValue, getValues } = useFormContext();
  const { errors } = formState;

  if (Object.keys(errors).length > 0 && update) {
    if (!getValues().name) {
      setValue('projectName', techs[0].name);
    }
    if (!getValues().icon) {
      setValue('githubRepository', techs[0].icon);
    }

    if (!getValues().description) {
      setValue('githubRepository', techs[0].description);
    }
  }

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Technology Name </Form.Label>
        <Form.Control
          type="text"
          placeholder={`${(update && techs[0].name) || 'Nome da tecnologia'} `}
          {...register('name', {
            required: true,
            pattern: /^[a-zA-Z]/,
          })}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Url icon</Form.Label>
        <Form.Control
          type="text"
          placeholder={`${
            (update && techs[0].icon) || 'Url da imegen da tech'
          }`}
          {...register('icon', {
            required: true,
            pattern: /^[a-zA-Z]/,
          })}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Descriotion</Form.Label>
        <Form.Control
          as="textarea"
          placeholder={`${
            (update && techs[0].description) || 'Descrição da tech'
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
