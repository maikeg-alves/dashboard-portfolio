import styled from 'styled-components';

export const VerificationCodeInput = styled.div`
  display: flex;
`;

export const CodeDigitInput = styled.input<{ error?: boolean }>`
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 20px;
  margin-right: 10px;
  color: #01c88c !important;
  border: ${(props) => (props.error ? ' 2px solid red' : '1px solid #0a0a0a')};
  border-radius: 13px;
  background: #383838;

  &:focus-visible {
    border: 1px solid #545454 !important;
  }
`;
