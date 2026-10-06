import styled from "styled-components";

/** Card da vitrine — animações de hover isoladas aqui */
export const Card = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  aspect-ratio: 1 / 1.2;
  overflow: hidden;

  &:hover .action-favorite {
    transform: translateX(0);
    transition-delay: 0ms;
  }

  &:hover .action-cart {
    transform: translateX(0);
    transition-delay: 120ms;
  }
`;

export const Media = styled.div`
  position: relative;
  aspect-ratio: 1 / 1;
  border-radius: 0.5rem;
  overflow: hidden;
  background: #e2e8f0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const BuyNow = styled.button`
  position: absolute;
  left: 0.75rem;
  right: 0.75rem;
  bottom: -5rem;
  padding: 0.5rem;
  border-radius: 0.375rem;
  background: #a3f7bf;
  color: #000;
  transition: bottom 0.2s ease, background 0.2s ease, color 0.2s ease;

  ${Card}:hover & {
    bottom: 0.75rem;
  }

  &:hover {
    background: #29a29d;
    color: #fff;
  }
`;

export const Actions = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 2;
`;

export const ActionButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.5rem;
  border-radius: 0.375rem;
  background: #fff;
  transform: translateX(160px);
  transition: transform 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1023px) {
    transform: translateX(0);
  }

  &.is-active {
    transform: translateX(0);
  }

  &:focus-visible {
    outline: 3px solid #2563eb;
    outline-offset: 2px;
  }
`;
