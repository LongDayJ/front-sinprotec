"use client";

import { useEffect, useState } from "react";
import { type Process } from "@/components/ProcessDashboard/mock";
import ProcessRow from "@/components/ProcessRow";
import {
    EmptyRow, PageBtn, PaginationControls, PaginationInfo, PaginationWrapper,
    Table, TableWrapper, Tbody, Th, ThInner, Thead, SortIcon,
} from "./styled";

const PAGE_SIZE = 20;

type SortKey = keyof Pick<Process, 'status' | 'nup' | 'tipo' | 'relatorio' | 'assunto'>;

interface ProcessTableProps {
    processes: Process[];
    onUpdate: (updated: Process) => void;
    onDelete: (id: string) => void;
}

const COLUMNS: { key: SortKey; label: string; sortable: boolean }[] = [
    { key: 'status',    label: 'Status',            sortable: true },
    { key: 'nup',       label: 'NUP',               sortable: true },
    { key: 'tipo',      label: 'Tipo',              sortable: true },
    { key: 'relatorio', label: 'Relatório',         sortable: true },
    { key: 'assunto',   label: 'Assunto / Demanda', sortable: true },
];

export default function ProcessTable({ processes, onUpdate, onDelete }: ProcessTableProps) {
    const [sortKey, setSortKey] = useState<SortKey>('status');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
    const [page, setPage]       = useState(1);

    useEffect(() => { setPage(1); }, [processes]);

    function handleSort(key: SortKey) {
        if (sortKey === key) {
            setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortKey(key);
            setSortDir('asc');
        }
        setPage(1);
    }

    const sorted = [...processes].sort((a, b) => {
        const av = a[sortKey] ?? '';
        const bv = b[sortKey] ?? '';
        return sortDir === 'asc'
            ? String(av).localeCompare(String(bv), 'pt-BR')
            : String(bv).localeCompare(String(av), 'pt-BR');
    });

    const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
    const paginated  = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    const from       = sorted.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
    const to         = Math.min(page * PAGE_SIZE, sorted.length);

    function getPageNumbers(): (number | '…')[] {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
        const pages: (number | '…')[] = [1];
        if (page > 3) pages.push('…');
        for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
        if (page < totalPages - 2) pages.push('…');
        pages.push(totalPages);
        return pages;
    }

    return (
        <TableWrapper>
            <Table>
                <Thead>
                    <tr>
                        {COLUMNS.map((col) => (
                            <Th
                                key={col.key}
                                $sortable={col.sortable}
                                onClick={() => col.sortable && handleSort(col.key)}
                            >
                                <ThInner>
                                    {col.label}
                                    {col.sortable && (
                                        <SortIcon $active={sortKey === col.key} $dir={sortDir} />
                                    )}
                                </ThInner>
                            </Th>
                        ))}
                        <Th>Observações</Th>
                        <Th />
                    </tr>
                </Thead>
                <Tbody>
                    {paginated.length === 0 ? (
                        <EmptyRow>
                            <td colSpan={7}>Nenhum processo encontrado</td>
                        </EmptyRow>
                    ) : (
                        paginated.map((p) => (
                            <ProcessRow key={p.id} process={p} onUpdate={onUpdate} onDelete={onDelete} />
                        ))
                    )}
                </Tbody>
            </Table>

            {sorted.length > 0 && (
                <PaginationWrapper>
                    <PaginationInfo>
                        Exibindo {from}–{to} de {sorted.length} protocolos
                    </PaginationInfo>

                    <PaginationControls>
                        <PageBtn
                            onClick={() => setPage((p) => p - 1)}
                            disabled={page === 1}
                            aria-label="Página anterior"
                        >
                            ‹
                        </PageBtn>

                        {getPageNumbers().map((p, i) =>
                            p === '…' ? (
                                <PageBtn key={`ellipsis-${i}`} disabled>…</PageBtn>
                            ) : (
                                <PageBtn
                                    key={p}
                                    $active={p === page}
                                    onClick={() => setPage(p as number)}
                                >
                                    {p}
                                </PageBtn>
                            )
                        )}

                        <PageBtn
                            onClick={() => setPage((p) => p + 1)}
                            disabled={page === totalPages}
                            aria-label="Próxima página"
                        >
                            ›
                        </PageBtn>
                    </PaginationControls>
                </PaginationWrapper>
            )}
        </TableWrapper>
    );
}
