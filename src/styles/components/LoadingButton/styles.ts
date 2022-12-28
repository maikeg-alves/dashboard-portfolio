import styled from 'styled-components';

export const Container = styled.div`
  .load-row {
    text-align: center;
    margin: 5px 0;

    span {
      display: inline-block;
      width: 10px;
      height: 10px;
      background: #01c88c;
      border-radius: 50px;
      animation: up-down6 0.5s ease-in infinite alternate;
    }

    span:nth-child(2) {
      background: #01c88cc4;
      animation-delay: 0.16s;
    }

    span:nth-child(3) {
      background: #01c88c91;
      animation-delay: 0.32s;
    }

    span:nth-child(4) {
      background: #01c88c56;
      animation-delay: 0.48s;
    }

    @keyframes up-down6 {
      0% {
        transform: translateY(-10px);
      }

      100% {
        transform: translateY(10px);
      }
    }
  }

  &:disabled {
    color: white;
    background-color: ${(props) => props.theme.colors.textSecondary};
  }
`;
