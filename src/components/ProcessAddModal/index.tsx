"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { type Process } from "@/components/ProcessDashboard/mock";
import {
    FormField,
    FormInput,
    FormLabel,
    FormSelect,
    FormTextarea,
    ModalBody,
    ModalBox,
    ModalCloseBtn,
    ModalDivider,
    ModalFooter,
    ModalGrid,
    ModalHeader,
    ModalOverlay,
    ModalTitle,
    CancelBtn,
    SaveBtn,
} from "@/components/ProcessRow/styled";

function IconX() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}

const EMPTY: Omit<Process, 'id'> = {
    status: 'Aguardando área técnica',
    tipo: 'novo',
    nup: '',
    relatorio: '',
    assunto: '',
    observacoes: null,
};

interface ProcessAddModalProps {
    onClose: () => void;
    onSave: (process: Process) => void;
}

export default function ProcessAddModal({ onClose, onSave }: ProcessAddModalProps) {
    const [form, setForm] = useState<Omit<Process, 'id'>>({ ...EMPTY });

    function set<K extends keyof Omit<Process, 'id'>>(key: K, value: Omit<Process, 'id'>[K]) {
        setForm((prev) => ({ ...prev, [key]: value }));
    }

    function handleSave() {
        if (!form.nup.trim() || !form.assunto.trim() || !form.relatorio.trim()) return;
        onSave({
            ...form,
            id: crypto.randomUUID(),
            observacoes: form.observacoes?.trim() || null,
        });
        onClose();
    }

    const isValid = form.nup.trim() && form.assunto.trim() && form.relatorio.trim();

    return createPortal(
        <ModalOverlay onClick={onClose}>
            <ModalBox onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <ModalTitle>Adicionar PCDT</ModalTitle>
                    <ModalCloseBtn onClick={onClose} title="Fechar">
                        <IconX />
                    </ModalCloseBtn>
                </ModalHeader>

                <ModalBody>
                    <ModalGrid>
                        <FormField>
                            <FormLabel htmlFor="add-status">Status</FormLabel>
                            <FormSelect
                                id="add-status"
                                value={form.status}
                                onChange={(e) => set('status', e.target.value as Process['status'])}
                            >
                                <option value="Aguardando área técnica">Aguardando área técnica</option>
                                <option value="Área técnica retornou">Área técnica retornou</option>
                                <option value="Sobrestado">Sobrestado</option>
                                <option value="Finalizado">Finalizado</option>
                            </FormSelect>
                        </FormField>

                        <FormField>
                            <FormLabel htmlFor="add-tipo">Tipo</FormLabel>
                            <FormSelect
                                id="add-tipo"
                                value={form.tipo}
                                onChange={(e) => set('tipo', e.target.value as Process['tipo'])}
                            >
                                <option value="novo">Novo</option>
                                <option value="atualizacao">Atualização</option>
                            </FormSelect>
                        </FormField>
                    </ModalGrid>

                    <ModalDivider />

                    <ModalGrid>
                        <FormField $span>
                            <FormLabel htmlFor="add-nup">NUP *</FormLabel>
                            <FormInput
                                id="add-nup"
                                value={form.nup}
                                onChange={(e) => set('nup', e.target.value)}
                                placeholder="25000.000000/0000-00"
                                style={{ fontFamily: 'monospace' }}
                            />
                        </FormField>

                        <FormField $span>
                            <FormLabel htmlFor="add-relatorio">Relatório *</FormLabel>
                            <FormInput
                                id="add-relatorio"
                                value={form.relatorio}
                                onChange={(e) => set('relatorio', e.target.value)}
                                placeholder="Relatório nº 000, mmm/aaaa"
                            />
                        </FormField>
                    </ModalGrid>

                    <ModalDivider />

                    <FormField $span>
                        <FormLabel htmlFor="add-assunto">Assunto / Demanda *</FormLabel>
                        <FormTextarea
                            id="add-assunto"
                            value={form.assunto}
                            onChange={(e) => set('assunto', e.target.value)}
                            rows={3}
                            placeholder="Descreva o assunto do protocolo..."
                        />
                    </FormField>

                    <FormField $span>
                        <FormLabel htmlFor="add-obs">Observações</FormLabel>
                        <FormTextarea
                            id="add-obs"
                            value={form.observacoes ?? ''}
                            onChange={(e) => set('observacoes', e.target.value)}
                            rows={3}
                            placeholder="Nenhuma observação..."
                        />
                    </FormField>
                </ModalBody>

                <ModalFooter>
                    <CancelBtn type="button" onClick={onClose}>Cancelar</CancelBtn>
                    <SaveBtn
                        type="button"
                        onClick={handleSave}
                        disabled={!isValid}
                        style={{ opacity: isValid ? 1 : 0.5 }}
                    >
                        Adicionar
                    </SaveBtn>
                </ModalFooter>
            </ModalBox>
        </ModalOverlay>,
        document.body
    );
}
