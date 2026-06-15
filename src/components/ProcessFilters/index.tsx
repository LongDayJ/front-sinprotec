"use client";

import { type Process } from "@/components/ProcessDashboard/mock";
import { ControlsCard } from "@/components/ProcessDashboard/styled";
import { AddButton } from "./styled";
import {
    ClearButton,
    FilterActiveBadge,
    FilterChevron,
    FilterChip,
    FilterColumn,
    FilterColumnLabel,
    FilterPanel,
    FilterPanelInner,
    FilterColumnsRow,
    FilterToggleBtn,
    ChipsWrap,
    ChipDot,
    ChipCheck,
    SearchAndFilterRow,
    SearchInput,
    SearchWrapper,
    RightControls,
} from "@/components/ProjectCards/styled";

/* ─── Ícones ────────────────────────────────────────────── */

function IconSearch() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    );
}

function IconFilter() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" />
        </svg>
    );
}

function IconChevron() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
        </svg>
    );
}

/* ─── Opções dos chips ──────────────────────────────────── */

export const STATUS_OPTIONS: { value: Process['status']; label: string; color: string }[] = [
    { value: 'Finalizado',              label: 'Finalizado',              color: '#34a853' },
    { value: 'Sobrestado',              label: 'Sobrestado',              color: '#f57c00' },
    { value: 'Aguardando área técnica', label: 'Aguardando área técnica', color: '#1a73e8' },
    { value: 'Área técnica retornou',   label: 'Área técnica retornou',   color: '#9c27b0' },
];

export const TIPO_OPTIONS: { value: Process['tipo']; label: string; color: string }[] = [
    { value: 'novo',        label: 'Novo',        color: '#34a853' },
    { value: 'atualizacao', label: 'Atualização', color: '#1a73e8' },
];

/* ─── Props ─────────────────────────────────────────────── */

interface ProcessFiltersProps {
    searchNup: string;
    onSearchNupChange: (v: string) => void;
    searchAssunto: string;
    onSearchAssuntoChange: (v: string) => void;
    searchObs: string;
    onSearchObsChange: (v: string) => void;
    selectedStatuses: Process['status'][];
    onToggleStatus: (s: Process['status']) => void;
    selectedTipos: Process['tipo'][];
    onToggleTipo: (t: Process['tipo']) => void;
    filtersOpen: boolean;
    onToggleFilters: () => void;
    hasActiveFilters: boolean;
    activeFilterCount: number;
    onClearFilters: () => void;
    onAdd: () => void;
}

/* ─── Componente ────────────────────────────────────────── */

export default function ProcessFilters({
    searchNup, onSearchNupChange,
    searchAssunto, onSearchAssuntoChange,
    searchObs, onSearchObsChange,
    selectedStatuses, onToggleStatus,
    selectedTipos, onToggleTipo,
    filtersOpen, onToggleFilters,
    hasActiveFilters, activeFilterCount, onClearFilters, onAdd,
}: ProcessFiltersProps) {
    return (
        <>
            <ControlsCard $filtersOpen={filtersOpen}>
                <RightControls>
                    <SearchAndFilterRow>
                        <SearchWrapper>
                            <IconSearch />
                            <SearchInput
                                placeholder="NUP... (apenas números)"
                                value={searchNup}
                                onChange={(e) => onSearchNupChange(e.target.value)}
                            />
                        </SearchWrapper>
                        <SearchWrapper>
                            <IconSearch />
                            <SearchInput
                                placeholder="Assunto..."
                                value={searchAssunto}
                                onChange={(e) => onSearchAssuntoChange(e.target.value)}
                            />
                        </SearchWrapper>
                        <SearchWrapper>
                            <IconSearch />
                            <SearchInput
                                placeholder="Observações..."
                                value={searchObs}
                                onChange={(e) => onSearchObsChange(e.target.value)}
                            />
                        </SearchWrapper>

                        <FilterToggleBtn
                            $open={filtersOpen}
                            $hasFilters={hasActiveFilters}
                            onClick={onToggleFilters}
                        >
                            <IconFilter />
                            Filtros
                            {activeFilterCount > 0 && (
                                <FilterActiveBadge>{activeFilterCount}</FilterActiveBadge>
                            )}
                            <FilterChevron $open={filtersOpen}>
                                <IconChevron />
                            </FilterChevron>
                        </FilterToggleBtn>

                        {hasActiveFilters && (
                            <ClearButton onClick={onClearFilters}>Limpar</ClearButton>
                        )}

                        <AddButton onClick={onAdd}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            Adicionar PCDT
                        </AddButton>
                    </SearchAndFilterRow>
                </RightControls>
            </ControlsCard>

            <FilterPanel $open={filtersOpen}>
                <FilterPanelInner>
                    <FilterColumnsRow>
                        <FilterColumn>
                            <FilterColumnLabel>Status</FilterColumnLabel>
                            <ChipsWrap>
                                {STATUS_OPTIONS.map((opt) => {
                                    const active = selectedStatuses.includes(opt.value);
                                    return (
                                        <FilterChip
                                            key={opt.value}
                                            $active={active}
                                            $color={opt.color}
                                            onClick={() => onToggleStatus(opt.value)}
                                        >
                                            <ChipDot $color={opt.color} />
                                            {opt.label}
                                            {active && <ChipCheck $active $color={opt.color}>✓</ChipCheck>}
                                        </FilterChip>
                                    );
                                })}
                            </ChipsWrap>
                        </FilterColumn>

                        <FilterColumn>
                            <FilterColumnLabel>Tipo</FilterColumnLabel>
                            <ChipsWrap>
                                {TIPO_OPTIONS.map((opt) => {
                                    const active = selectedTipos.includes(opt.value);
                                    return (
                                        <FilterChip
                                            key={opt.value}
                                            $active={active}
                                            $color={opt.color}
                                            onClick={() => onToggleTipo(opt.value)}
                                        >
                                            <ChipCheck $active={active} $color={opt.color} />
                                            {opt.label}
                                        </FilterChip>
                                    );
                                })}
                            </ChipsWrap>
                        </FilterColumn>
                    </FilterColumnsRow>
                </FilterPanelInner>
            </FilterPanel>
        </>
    );
}
