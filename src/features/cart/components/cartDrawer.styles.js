import styled from "styled-components";

/** Overlay + painel lateral do carrinho */
export const DrawerRoot = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
  pointer-events: none;
  visibility: hidden;

  &.is-open {
    pointer-events: auto;
    visibility: visible;
  }
`;

export const Overlay = styled.button`
  position: absolute;
  inset: 0;
  border: 0;
  background: rgb(0 0 0 / 0.5);
  cursor: pointer;
`;

export const Panel = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  width: min(340px, 100%);
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform 0.35s cubic-bezier(0.19, 1, 0.22, 1);

  ${DrawerRoot}.is-open & {
    transform: translateX(0);
  }
`;
