import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .visible {
    display: block;
  }
  .hidden {
    display: none;
  }
  .css-18lrjg1-MuiCircularProgress-root {
    color: ${(props) => props.theme.colors.primary}!important;
  }
  .css-1rn30mb-MuiCircularProgress-root {
    color: ${(props) => props.theme.colors.primary}!important;
  }
`;

const checkIcon = keyframes`
  0% {
    height: 0;
    width: 0;
    opacity: 1;
  }
  20% {
    height: 0;
    width: 11px;
    opacity: 1;
  }
  40% {
    height: 22px;
    width: 11px;
    opacity: 1;
  }
  100% {
    height: 22px;
    width: 11px;
    opacity: 1;
    transform: scaleX(-1) rotate(135deg);
  }
`;

export const CheckIcon = styled.div<{ completed: boolean }>`
  display: ${({ completed }) => (completed ? 'block' : 'none')};
  position: absolute;
  content: '';
  top: 50%;
  left: 26%;
  transform: scaleX(-1) rotate(135deg);
  height: 22px;
  width: 11px;
  border-top: 3px solid #01c88c;
  border-right: 3px solid #01c88c;
  transform-origin: left top;
  animation: ${({ completed }) => (completed ? checkIcon : 'none')} 0.8s ease;
`;

export const Label = styled.label`
  position: relative;
  padding: 3px;
  display: inline-block;
`;
