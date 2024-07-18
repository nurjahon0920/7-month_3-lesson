import styled from "styled-components";

const StyledButton = styled.button`
  button {
    color: #fff;
    transition: all 0.5s;
    position: relative;
    text-align: center;
    width: 90px;
    height: 35px;
    span {
      z-index: 1000;
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      font-size: 16px;
      top: 1px;
      left: 0;
    }
  }
  button::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    transition: all 0.5s;
    border: 1px solid rgba(205, 0, 0, 0.1);
    background-color: rgba(205, 0, 0, 0.1);
  }
  button::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    transition: all 0.5s;
    border: 1px solid rgba(205, 0, 0, 0.1);
    background-color: rgba(205, 0, 0, 0.1);
  }
  button:hover::before {
    transform: rotate(-45deg);
    background-color: rgba(205, 0, 0, 0.1);
  }
  button:hover::after {
    transform: rotate(45deg);
    background-color: rgba(205, 0, 0, 0.1);
  }
`;

export default StyledButton;
