import { Col } from 'react-bootstrap';
import styled from 'styled-components';

export const PanelMenu = styled(Col)<{ reduced: boolean }>`
  display: block;
  visibility: visible;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};

  height: 100%;
  border-radius: 15px;
  padding: 1rem;
  transition: width 0.3s ease;
`;

export const MenuContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .reduceMenu {
    width: 100%;
    background-color: #494a4e57;
    border-radius: 15px;
    padding: 5px;

    cursor: pointer;

    button {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
      height: 40px;
      border: none;
      background-color: transparent;
      svg {
        font-size: 25pt;
      }
    }

    &:hover {
      background-color: #494a4ea1;
    }
  }
`;

export const MenuMobile = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  .mobile {
    position: fixed;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
`;
