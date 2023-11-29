import styled from 'styled-components';

export const ContainerMui = styled.div`
  .MuiAutocomplete-root {
    margin: 10px 0;
    padding: 0 10px;
    border-radius: 15px;
    background-color: white;
    .MuiInputBase-root,
    .MuiInput-root {
      padding: 0 !important;
      button {
        display: none;
      }
      input {
        border: none;
        border-bottom: none;
        margin: 0;
      }
    }
  }
`;
