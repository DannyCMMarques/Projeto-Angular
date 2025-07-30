export const TAMANHO_CLASSE_MODAL = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl'
} as const;

export type TamanhoModal = keyof typeof TAMANHO_CLASSE_MODAL; 
