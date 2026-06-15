import styled from "styled-components";

export const PageWrapper = styled.div`
    width: 100%;
    min-height: 100%;
    background: #f5f6fa;
    padding: 2rem 2.5rem;

    & > * + * {
        margin-top: 1.25rem;
    }

    @media (max-width: 768px) {
        padding: 1.25rem 1rem;
    }
`;

export const SummaryRow = styled.div<{ $collapsed?: boolean }>`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    max-height: ${({ $collapsed }) => ($collapsed ? '0' : '200px')};
    opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
    overflow: hidden;
    margin-bottom: ${({ $collapsed }) => ($collapsed ? '-1.25rem' : '0')};
    transition: ${({ $collapsed }) =>
        $collapsed
            ? 'max-height 0.35s ease, opacity 0.25s ease, margin-bottom 0.35s ease'
            : 'max-height 0.15s ease, opacity 0.1s ease, margin-bottom 0.15s ease'};

    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
        max-height: ${({ $collapsed }) => ($collapsed ? '0' : '400px')};
    }
`;

export const MiniSummaryBar = styled.div<{ $visible: boolean }>`
    position: fixed;
    top: var(--topbar-height, 56px);
    left: 0;
    right: 0;
    z-index: 35;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 2.5rem;
    background: #fff;
    border-bottom: 1px solid #e8ecf0;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    opacity: ${({ $visible }) => ($visible ? 1 : 0)};
    pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
    transition: opacity 0.15s ease;

    @media (max-width: 768px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 0.5rem 1rem;
        gap: 0.4rem;
    }
`;

export const MiniChip = styled.div<{ $color: string }>`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    flex: 1;
    min-width: 0;
    border-left: 3px solid ${({ $color }) => $color};
    padding: 0.25rem 0.5rem;
    background: ${({ $color }) => $color}12;
    // border-radius: 0 4px 4px 0;
`;

export const MiniCount = styled.span<{ $color: string }>`
    font-size: 1.05rem;
    font-weight: 700;
    color: ${({ $color }) => $color};
    line-height: 1;
    flex-shrink: 0;
`;

const miniLabelBase = `
    font-size: 0.6rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #94a3b8;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const MiniLabelFull = styled.span`
    ${miniLabelBase}
`;

export const MiniLabelShort = styled.span`
    display: none;
`;

export const ControlsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: sticky;
    top: calc(var(--topbar-height, 56px) + var(--controls-offset, 0px));
    z-index: 40;
    transition: top 0.15s ease;
`;

export const MiniAddButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.45rem 0.75rem;
    border-radius: 6px;
    border: 1.5px solid #1a73e8;
    background: transparent;
    color: #1a73e8;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    cursor: pointer;
    font-family: inherit;
    flex: 1;
    justify-content: center;
    white-space: nowrap;
    transition: background 0.15s, color 0.15s;

    svg { width: 11px; height: 11px; flex-shrink: 0; }

    &:hover { background: #1a73e8; color: #fff; }

    @media (max-width: 768px) {
        padding: 0.45rem 0.5rem;
    }
`;

export const AddCard = styled.button`
    background: #fff;
    border: 2px dashed #cbd5e1;
    border-radius: 6px;
    padding: 1rem 1.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06);
    flex: 1;
    min-width: 0;
    cursor: pointer;
    color: #94a3b8;
    font-family: inherit;
    transition: border-color 0.15s, color 0.15s, background 0.15s;

    svg {
        width: 28px;
        height: 28px;
    }

    span {
        font-size: 0.72rem;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
    }

    &:hover {
        border-color: #1a73e8;
        color: #1a73e8;
        background: #f0f4ff;
    }
`;

export const ControlsCard = styled.div<{ $filtersOpen: boolean }>`
    background: #fff;
    border: 1px solid #dde3ec;
    border-radius: 10px 10px 0 0;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;
