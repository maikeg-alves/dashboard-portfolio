import { ITech, Provaider } from '@interfaces';
import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import { Form } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import { ContainerMui } from './style';

interface StepTwoProps extends Provaider {
  update?: boolean;
}

export const StepTwo: React.FC<StepTwoProps> = ({
  projects,
  techs,
  update,
}) => {
  const { register, formState, setValue, getValues, watch } = useFormContext();
  const { errors } = formState;

  const defaultImageUrl = 'https://i.imgur.com/XhUIa5q.png';
  const imageUrl =
    update && projects[0]?.thumbnail_url
      ? projects[0].thumbnail_url
      : defaultImageUrl;

  if (Object.keys(errors).length > 0) {
    if (!getValues().image_url) {
      setValue('image_url', imageUrl ? imageUrl : defaultImageUrl);
    }

    if (getValues().technologies == undefined && update) {
      const techsFromProjects = projects[0]?.techs || [];
      const techIds = techsFromProjects.map((tech) => tech.id);
      setValue('technologies', techIds);
    }
  }

  function selectedTechs(techs: ITech[]) {
    setValue(
      'technologies',
      techs.map((tech) => tech.id),
    );
  }

  console.log(watch(), getValues().technologies, projects); // {image_url: 'url_img'} undefined
  return (
    <>
      <Form.Group>
        <Form.Label>Image url</Form.Label>
        <Form.Control
          type="text"
          placeholder={imageUrl}
          {...register('image_url', {
            required: 'register',
          })}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Technologies</Form.Label>
        <ContainerMui>
          <Autocomplete
            multiple
            id="tags-standard"
            options={techs}
            getOptionLabel={(option) => option?.name}
            onChange={(_, value) => selectedTechs(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                placeholder="Select the technologies applied "
              />
            )}
          />
        </ContainerMui>
      </Form.Group>
    </>
  );
};
