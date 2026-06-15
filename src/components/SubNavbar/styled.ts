import styled from "styled-components";

export const SubNavbarWrapper = styled.div<{ $visible: boolean }>`
    position: sticky;
    top: var(--topbar-height, 9vh);
    z-index: 40;
    overflow: hidden;
    max-height: ${({ $visible }) => ($visible ? "60px" : "0px")};
    transition: max-height 0.15s ease;
`;

export const SubNavbarContainer = styled.nav`
    background: ${({ theme }) => theme.colors.greenBackground};
    border-bottom: 1px solid ${({ theme }) => theme.colors.greenTransparent};
    display: flex;
    align-items: center;
    padding: 0 20px;
    gap: 4px;
`;

export const NavTab = styled.button<{ $active: boolean }>`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    background: none;
    border: none;
    border-bottom: 2px solid ${({ $active, theme }) =>
        $active ? theme.colors.yellowVibrant : "transparent"};
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
    color: ${({ $active, disabled, theme }) =>
        disabled
            ? theme.colors.text.half
            : $active
            ? theme.colors.text.strong
            : theme.colors.text.normal};
    transition: color 0.15s, border-color 0.15s;
    margin-bottom: -1px;

    &:not(:disabled):hover {
        color: ${({ theme }) => theme.colors.text.strong};
        border-bottom-color: ${({ $active, theme }) =>
            $active ? theme.colors.yellowVibrant : theme.colors.greenTransparent};
    }
`;

export const TabLabel = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const TabBadge = styled.span<{ $muted?: boolean }>`
    font-size: ${({ theme }) => theme.fontSizes.xxxs};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    padding: 2px 6px;
    border-radius: 999px;
    background: ${({ $muted, theme }) =>
        $muted ? "transparent" : theme.colors.yellowVibrantMoreOpaque};
    color: ${({ $muted, theme }) =>
        $muted ? theme.colors.text.half : theme.colors.yellowVibrant};
    border: 1px solid ${({ $muted, theme }) =>
        $muted ? theme.colors.text.half + "44" : "transparent"};
`;
