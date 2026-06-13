import { styled } from "styled-components";

export const Button = styled.button `
  position: relative;
`
export const Count = styled.span `
  top: -0.3rem;
  font-size: 0.8rem;
  position: absolute;
  background-color: red;
  padding: 0;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  border-radius: 10rem;
  overflow: hidden;
  width: 1.3rem;
  height: 1.3rem;
  font-weight: bold;
`