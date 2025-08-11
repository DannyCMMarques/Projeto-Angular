import {  StatusPautaType } from "../utils/enums/StatusPauta";
import { StatusSessao } from "../utils/enums/StatusSessao";

export type Status = StatusSessao | StatusPautaType;

export interface StatusInfo {
  cor: string;
  texto: string;
  icone?:string;
  mostrarVerMais?: boolean;
  acao?: () => void;
}

export interface Handlers {
  onVerResultados?: (id: number) => void;
  onIniciarSessao?: (id: number) => void;
  onParticiparSessao?: (id: number) => void;
}
