/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ITech, Provaider } from '@interfaces';
import styled from 'styled-components';

interface StepOneProps extends Provaider {
  update?: boolean;
}

const PreviewContainer = styled.div`
  padding: 16px;
  margin: 16px 0;
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  p {
    margin-bottom: 8px;
    color: #c4c4c4;
  }
  span {
    margin-bottom: 8px;
    p {
      color: #f5f5f5;
      overflow: hidden;
      max-height: 60px;
      word-wrap: break-word;
    }
  }

  .imagepreview {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;

    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 10px;
    }
  }
`;

export const StepTwo: React.FC<StepOneProps> = () => {
  const { getValues, setValue } = useFormContext();
  const { name, icon, description } = getValues() as ITech;

  setValue('checkPreview', true);

  return (
    <PreviewContainer>
      <p>Nome:</p>
      <h3>{name}</h3>
      <p>URL do Ícone:</p>
      {icon && (
        <div className="imagepreview">
          <img src={icon} alt="Ícone" />
        </div>
      )}
      <p>Descrição:</p>
      <span>
        <p> {description}</p>
      </span>
    </PreviewContainer>
  );
};
