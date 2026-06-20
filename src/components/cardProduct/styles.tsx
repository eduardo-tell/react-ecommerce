import styled from 'styled-components'

export const ButtonFavorite = styled.button`
    z-index: 10;
`;

export const ButtonCart = styled.button`
    z-index: 10;
    opacity: 0;
    transform: translateX(160px);
    transition: all 0.2s ease-in-out;

    &.active {
        background-color: white;
        transform: translateX(0);
        opacity: 1;
    }
    
    &.card-product-inside {
        aspect-ratio: 2/1;
        height: 131px;
    }
`;

export const ContentBody = styled.div`
    aspect-ratio: 1/1;
    position: relative;
    overflow: hidden;

    &:hover > .card-product__actions button {
        opacity: 1;
        transform: translateX(0);
    }
`
export const CardProductImage = styled.div`
    picture {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        position: absolute;

        background: #e2e8f0;
        display: flex;
        align-content: center;
        justify-content: center;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
`

export const CardProductContent = styled.div`
    height: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    position: absolute;
    bottom: 0;
`
