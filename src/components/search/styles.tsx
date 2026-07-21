import styled from 'styled-components';

export const ButtonCount = styled.button`

`;

export const MainSearch = styled.div`
    position: relative;

    .search__results {
        position: absolute;
        top: calc(100% + 0.25rem);
        left: 0;
        width: 100%;
        max-height: 20rem;
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 0.5rem;
        z-index: 60;

        > div:first-child {
            width: calc(100% - 1rem);
            max-height: 19rem; 
            margin-top: 0.5rem;
            margin-left: 0.5rem;
            margin-right: 0.5rem;
            overflow-y: auto;
            margin-bottom: 0.5rem;
        }

        li:last-child {
            border-bottom: none;
        }
    }
}`
