import styled from 'styled-components';

export const CartDrawer = styled.div`
    position: fixed;

    --color-background: white;

    inset: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0;
    border-radius: 0;

    right: -200vw;

    .cart-drawer {
        &__header,
        &__inner {
            max-width: 340px;
            width: 100%;
            
            left: auto;
            position: fixed;
            background: var(--color-background);
            
            right: -100vw;
        }

        &__header {
            height: 78px;
            padding: 0 1rem;
        }

        &__inner {
            height: calc(100% - 78px);
            top: 78px;
            padding: 1rem;
            overflow-y: auto;
        }

        &__footer {
            position: sticky;
            bottom: 0;
            background: var(--color-background);
        }
    }

    button[ref="closeButton"] .hdt-icon-close {
        stroke-width: 1.5px;
    }

    .CartDrawer__overlay {
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: rgb(var(--color-overlay, 0 0 0) / .5);
    }

    &.open {
        left: auto;
        right: 0;

        .cart-drawer__inner,
        .cart-drawer__header {
            left: auto;
            right: 0;
        }

        &::before {
            transition: opacity 0.45s cubic-bezier(0.19, 1, 0.22, 1);
            opacity: 1;
            display: block;
        }
    }
}`;