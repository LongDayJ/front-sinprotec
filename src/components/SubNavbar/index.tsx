"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { NavTab, SubNavbarContainer, SubNavbarWrapper, TabBadge, TabLabel } from "./styled";

export default function SubNavbar() {
    const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(0);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            setVisible(currentY <= 0);
            lastScrollY.current = currentY;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <SubNavbarWrapper $visible={visible}>
            <SubNavbarContainer>
                <NavTab
                    $active={pathname === "/protocolos"}
                    onClick={() => router.push("/protocolos")}
                >
                    <TabLabel>PCDTs</TabLabel>
                    <TabBadge>72</TabBadge>
                </NavTab>

                <NavTab $active={false} disabled>
                    <TabLabel>Incorporações</TabLabel>
                    <TabBadge $muted>em breve</TabBadge>
                </NavTab>
            </SubNavbarContainer>
        </SubNavbarWrapper>
    );
}
