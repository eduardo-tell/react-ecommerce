import styled from 'styled-components'

export const ButtonFavorite = styled.button`
    z-index: 10;
    transform: translateX(160px);

    &.active {
        background-color: white;
        transform: translateX(0);
        opacity: 1;
    }
`;

export const ButtonCart = styled.button`
    z-index: 10;
    transform: translateX(160px);

    &.active {
        background-color: white;
        transform: translateX(0);
    }
`;

export const ContentBody = styled.div`
    aspect-ratio: 1/1;
    position: relative;
    overflow: hidden;

    &:hover > .card-product__actions button {
        transform: translateX(0);
    }
    
    &.card-product-inside {
        aspect-ratio: 2/1;
        height: 131px;

        .CardProductStyle__image {
            width: 131px;
        }

        .CardProductStyle__content {
            width: calc(100% - 131px);
        }
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
