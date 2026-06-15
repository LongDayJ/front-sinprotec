import styled from "styled-components";

export const AddButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.35rem 0.85rem;
    border-radius: 6px;
    border: none;
    background: ${({ theme }) => theme.colors.greenBackground};
    color: #fff;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    transition: background 0.15s;
    font-family: inherit;

    svg { width: 13px; height: 13px; flex-shrink: 0; }

    &:hover { background: ${({ theme }) => theme.colors.greenLight}; }
`;
