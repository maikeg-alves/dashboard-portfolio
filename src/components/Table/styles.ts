import styled from 'styled-components';
import { Table as BTTable } from 'react-bootstrap';

export const Tr = styled.tr`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: nowrap;
  flex-direction: row;
  background-color: ${(props) => props.theme.table.background};
  color: ${(props) => props.theme.table.text};

  td {
    padding: 5px 10px;

    button {
      border: none;
      color: ${(props) => props.theme.table.text};
      background: transparent;

      .icon-edit {
        filter: invert();
      }

      .icon-delete {
        color: ${(props) => props.theme.table.danger};
      }
    }
  }
`;

export const Table = styled(BTTable)`
  width: 100%;
  overflow: hidden;
  border-radius: 13px;

  tbody,
  tr,
  td {
    border: none !important;
  }

  tr {
    margin: 10px 0;
    height: 37px;
    border-radius: 13px;
  }
`;

export const Text = styled.div`
  padding: 10px;
  p {
    font-size: 14px;
    color: white;
  }
  p:last-child {
    margin-bottom: 0;
  }
`;
