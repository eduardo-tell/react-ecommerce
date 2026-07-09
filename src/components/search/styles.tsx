import styled from 'styled-components';

export const ButtonCount = styled.button`

`;

export const MainSearch = styled.div`
    position: relative;

    .search__panel {
        right: 0;
        top: 0;
        position: absolute;
        display: flex;
        align-items: center;
        width: 14rem;

        @media (max-width: 640px) {
            position: fixed;
            inset: 0 0 auto 0;
            width: 100%;
            padding: 0.75rem;
            background: white;
            z-index: 50;
        }
    }

    .search__results {
        position: absolute;
        top: calc(100% + 0.25rem);
        left: 0;
        width: 100%;
        max-height: 20rem;
        overflow-y: auto;
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 0.5rem;
        box-shadow: 0 10px 20px rgb(0 0 0 / 0.1);
        z-index: 60;

        li {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem;
            cursor: pointer;

            &.active,
            &:hover {
                background: #f1f5f9;
            }
        }
    }
}`
