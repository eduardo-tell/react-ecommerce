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

        img.hover-active {
            display: block;
        }

        img.default {
            display: none;    
        }

        &:hover {
            img.remove-hover {
                display: block !important;
            }

            img.default {
                display: none !important;    
            }

            img.hover-active {
                display: none !important;  
            }
        }
    }
`;

export const ContentBody = styled.div`
    aspect-ratio: 1/1.3;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: start;

    &:hover > .card-product__actions button {
        transform: translateX(0);

        &:hover {
            img.hover-active {
                display: block;
            }

            img.default {
                display: none;    
            }
        }
    }
    
    &.card-product-inside {
        aspect-ratio: 2/1;
        height: 131px;
        flex-direction: row;

        .card-product__value {
            width: calc(100% - 36px);
        }

        .card-product__image {
            width: 131px;
        }

        .card-product__content {
            padding: 0 0 0 8px;
            width: calc(100% - 131px);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            text-align: start;

            button {
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
`
export const CardProductImage = styled.div`
    display: block;
    overflow: hidden;
    position: relative;
    aspect-ratio: 1 / 1;

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
            object-fit: cover;
        }
    }
`

export const CardProductContent = styled.div`
    width: 100%;
    padding: 8px;
`
