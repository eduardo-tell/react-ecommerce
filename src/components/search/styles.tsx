import styled from 'styled-components';

export const ButtonCount = styled.button`

`;

export const MainSearch = styled.div`
    position: relative;

    &:has(input:focus) {
        border-color: #29A29D;
    }

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
            margin-bottom: 0.5rem;

            &::-webkit-scrollbar {
                width: 5px;
            }

            &::-webkit-scrollbar-track {
                background: #f1f1f1; /* Light gray background */
            }

            &::-webkit-scrollbar-thumb {
                background: #29a29d; /* Dark gray */
                border-radius: 5px; /* Rounded corners */
            }
        }

        li:last-child {
            border-bottom: none;
        }
    }
}`
