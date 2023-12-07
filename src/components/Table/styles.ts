import styled from 'styled-components';
import { Table as BTTable } from 'react-bootstrap';

export const Table = styled(BTTable)`
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
    background-color: ${(props) => props.theme.table.background};
    color: ${(props) => props.theme.table.text};

    td {
      text-align: center;
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
  }

  .sub-menu {
    color: #6f6f6f;
  }

  th {
    display: none;
  }

  td {
    font-weight: normal;
  }

  th,
  td {
    text-align: center;
  }

  @media screen and (max-width: 426px) {
    td,
    button {
      font-size: 12px !important;
    }
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
