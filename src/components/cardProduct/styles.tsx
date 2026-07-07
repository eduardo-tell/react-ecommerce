import styled from 'styled-components'

export const ButtonFavorite = styled.button`
    z-index: 10;
    width: 2.5rem;
    height: 2.5rem;

    img {
        width: calc(inherit - 0.8rem);
    }

    @media (min-width: 1024px) {
        transform: translateX(160px);
        margin: 0 auto;
    }

    &.active {
        background-color: white;
        transform: translateX(0);
        opacity: 1;
    }
`;

export const ButtonCart = styled.button`
    z-index: 10;
    width: 2.5rem;
    height: 2.5rem;

    img {
        width: calc(inherit - 0.8rem);
        margin: 0 auto;
    }
    
    @media (min-width: 1024px) {
        transform: translateX(160px);    
    }

    &:hover {
        > img.add-hover {
            display: block !important;  
        }
        
        > img.add,
        > img.active-hover {
            display: none !important;  
        }
    }

    &.active {
        background-color: white;
        transform: translateX(0);

        &:hover {
            img.add,
            img.active,
            img.add-hover {
                display: none !important;  
            }
            
            img.active-hover {
                display: block !important;  
            }
        }
    }
`;

export const ContentBody = styled.div`
    aspect-ratio: 1/1.2;
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
                width: 2.5rem;
                height: 2.5rem;

                > img {
                    height: 1.5rem;
                    margin: 0 auto;
                }

                display: flex;
                align-items: center;
                justify-content: center;

                &:hover {
                    img {
                        display: none;
                    }

                    img.trash-hover {
                        display: block;
                    }
                }
            }
        }
    }
`
export const CardProductImage = styled.div`
    display: block;
    overflow: hidden;
    position: relative;
    aspect-ratio: 1 / 1;
    border-radius: 0.5rem;
    overflow: hidden;

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
