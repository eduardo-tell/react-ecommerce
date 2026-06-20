import styled from 'styled-components'

export const ContentBody = styled.div`
    aspect-ratio: 1/1;
    position: relative;

    &:hover {
        .CardProductStyle__actions {
            z-index: 10;
            opacity: 1;
        }
    }

    &.card-product-inside {
        aspect-ratio: 2/1;
        height: 131px;
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
    z-index: 0;
    bottom: 0;
`

export const CardProductActions = styled.div`
    opacity: 0;
`
