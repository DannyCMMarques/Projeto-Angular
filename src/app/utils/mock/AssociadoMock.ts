import {
  AssociadoPage,
  AssociadoRequestDTO,
  AssociadoResponseDTO,
} from 'src/app/interfaces/interfaceAssociados';

export const mockAssociadoRequest: AssociadoRequestDTO = {
  nome: 'Fulano de Tal',
  cpf: '12345678901',
};

export const mockAssociados: AssociadoResponseDTO[] = [
  { id: 101, nome: 'João Silva' },
  { id: 102, nome: 'Maria Souza' },
  { id: 103, nome: 'Carlos Pereira' },
];

export const mockAssociadoPage: AssociadoPage = {
  content: mockAssociados,
  pageable: { pageNumber: 0, pageSize: 10 },
  totalElements: mockAssociados.length,
  totalPages: 1,
  last: true,
};
