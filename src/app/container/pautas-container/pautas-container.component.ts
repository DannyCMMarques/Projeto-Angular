import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { PautaResponseDTO } from 'src/app/interfaces/interfacePauta';
import { ModalContainerInterface } from 'src/app/interfaces/modalContainerInterface';
import { PautasService } from 'src/app/services/pautas.service';

@Component({
  selector: 'app-pautas-container',
  templateUrl: './pautas-container.component.html',
  styleUrls: ['./pautas-container.component.css'],
})
export class PautasContainerComponent {
  public pagina: number = 1;
  public totalPaginas: number = 0;
  public totalElementos: number = 0;
  public tamanhoPagina: number = 10;
  public pautas: PautaResponseDTO[] = [];
  public pautaEncontradaPorId: PautaResponseDTO | null = null;
  public isLoading: boolean = false;
  private currentUrl: string = '';

  modal: ModalContainerInterface | null = null;

abrirFormulario(id?: number) {
  this.modal = { tipo: 'formulario', id: id ?? undefined };
}

abrirResultado(id: number) {
  this.modal = { tipo: 'resultado', id };
}

fecharModal() {
  this.modal = null;
}

// onSucessoFormulario() {
//   this.exibirPautas(this.pagina);
// }
  constructor(
    private pautasService: PautasService,
    private toastr: ToastrService,
    public route: ActivatedRoute,
    private router: Router
  ) {
    this.currentUrl = this.router.url;

    if (this.currentUrl.startsWith('/pautas')) {
      this.exibirPautas();
    }



  }

  public successMessage(msg: string): void {
    this.toastr.success(msg);
  }
  public errorMessage(msg: string): void {
    this.toastr.error(msg);
  }
  private exibirPautas(): void {
    this.isLoading = true;
    this.pautasService
      .buscarPautas({
        pagina: this.pagina,
        tamanhoPagina: this.tamanhoPagina,
      })
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response) => {
          this.pautas = response.content;
          this.totalElementos = response.totalElements;
          this.totalPaginas = response.totalPages;
        },
        error: (error) => {
          this.errorMessage(error?.error?.message || 'Erro ao buscar pautas:');
        },
      });
  }


  public deletarPauta(id: number): void {
    this.isLoading = true;
    this.pautasService
      .excluirPauta(id)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          this.successMessage('Pauta excluída com sucesso!');
          this.exibirPautas();
        },
        error: (error) => {
          this.errorMessage(error?.error?.message || 'Erro ao excluir pauta:');
        },
      });
  }

  buscarPautaPorId(id: number): void {
    this.isLoading = true;
    this.pautasService
      .buscarPautaPorId(id)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response) => {
          this.pautaEncontradaPorId = response;
          this.successMessage('Pauta encontrada com sucesso!');
        },
        error: (error) => {
          this.errorMessage(error?.error?.message || 'Erro ao buscar pauta por ID:');
        },
      });
  }
}
