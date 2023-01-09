import { Theme } from '@interfaces';
import { Col } from 'react-bootstrap';
import styled from 'styled-components';

export const Container = styled(Col)<Theme>`
  display: none;
  visibility: hidden;
  .menumobile {
    .navigation {
      width: 360px;
      height: 68px;
      background: ${(props) => props.theme.mobilemenu.background};
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      padding: 0 20px;
      border: 1.2px solid ${(props) => props.theme.mobilemenu.background};
      .listWrap {
        list-style: none;
        display: flex;
        justify-content: space-between;
        width: 100%;
        li {
          width: 70px;
          height: 70px;
          position: relative;
          z-index: 1;

          a {
            text-decoration: none;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            text-align: center;
            font-weight: 500;
            width: 100%;
            &:hover {
              text-decoration: none;
            }
            .icon {
              position: relative;
              display: block;
              line-height: 75px;
              text-align: center;
              transition: 0.5s;
              color: ${(props) => props.theme.mobilemenu.textSecondary};
              ion-icon {
                font-size: 2.2rem;
              }
            }
            .text {
              position: absolute;
              color: ${(props) => props.theme.mobilemenu.text};
              font-weight: 400;
              letter-spacing: 0.05em;
              transition: 0.5s;
              transform: translateY(20px);
              opacity: 0;
              z-index: 1;
            }
          }
          &:active,
          &.active {
            a {
              .icon {
                color: ${(props) => props.theme.mobilemenu.text};
                transform: translateY(-32px);
              }
              .text {
                opacity: 1;
                transform: translateY(10px);
              }
            }
          }
          &.indicator {
            position: absolute;
            width: 70px;
            height: 70px;
            top: -50%;
            border-radius: 50%;
            /* border: 6px solid #222327; */
            background: ${(props) => props.theme.mobilemenu.background};
            transition: 0.3s;
            z-index: 0;
            &:before,
            &:after {
              content: '';
              position: absolute;
              top: 18%;
              width: 20px;
              height: 20px;
              background: blue;
              background: transparent;
            }
            &:after {
              right: -15px;
              rotate: -180deg;
              box-shadow: 0px -10px 0 0 ${(props) => props.theme.mobilemenu.background};
              border-top-right-radius: 26px;
            }
            &:before {
              left: -15px;
              rotate: -180deg;
              box-shadow: 0px -10px 0 0 ${(props) => props.theme.mobilemenu.background};
              border-top-left-radius: 26px;
            }
          }
          &:nth-child(1).active ~ .indicator {
            transform: translateX(calc(70px * 0));
          }
          &:nth-child(2).active ~ .indicator {
            transform: translateX(calc(70px * 1 + (6px * 2)));
          }
          &:nth-child(3).active ~ .indicator {
            transform: translateX(calc(70px * 2 + (6px * 4) + 1px));
          }
          &:nth-child(4).active ~ .indicator {
            transform: translateX(calc(70px * 3 + (6px * 6) + 2px));
          }
        }
      }
    }
  }

  ul {
    padding: 0 !important;
  }

  @media screen and (max-width: 995px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    height: 16%;
    visibility: visible;
  }

  @media screen and (max-width: 391px) {
    .navigation {
      width: 286px !important;

      .listWrap {
        li {
          &:nth-child(1).active ~ .indicator {
            transform: translateX(calc(70px * 0)) !important;
          }
          &:nth-child(2).active ~ .indicator {
            transform: translateX(calc(70px * 1 + (-6px * 2))) !important;
          }
          &:nth-child(3).active ~ .indicator {
            transform: translateX(calc(70px * 2 + (-6px * 4) + 1px)) !important;
          }
          &:nth-child(4).active ~ .indicator {
            transform: translateX(calc(70px * 3 + (-6px * 6) + 2px)) !important;
          }
        }
      }
    }
  }
`;
