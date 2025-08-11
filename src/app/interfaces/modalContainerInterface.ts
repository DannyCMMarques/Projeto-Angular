export type ModalType = 'formulario' | 'resultado';

export interface ModalContainerInterface {
  tipo: ModalType;
  id?: number;
}
