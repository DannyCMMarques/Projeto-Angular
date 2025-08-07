import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { PautaResponseDTO } from 'src/app/interfaces/interfacePauta';
import { SessaoIniciadaResponseDTO } from 'src/app/interfaces/interfaceSessao';
import { PautasService } from 'src/app/services/pautas.service';

@UntilDestroy()
@Component({
  selector: 'app-pautas-container',
  templateUrl: './pautas-container.component.html',
  styleUrls: ['./pautas-container.component.css'],
})
export class PautasContainerComponent implements OnInit {
  public pagina: number = 1;
  public totalPaginas: number = 0;
  public totalElementos: number = 0;
  public tamanhoPagina: number = 10;
  public pautas: PautaResponseDTO[] = [];
  public pautaEncontradaPorId!: PautaResponseDTO;
  public isLoading: boolean = false;
  private currentUrl: string = '';
  public showModalFormulario: boolean = false;
  public showModalDados: boolean = false;
  public pautaId?:  PautaResponseDTO;
  public sessaoDaPauta: SessaoIniciadaResponseDTO | null = null;

  //embaixo

  // onSucessoFormulario() {
  //   this.exibirPautas(this.pagina);
  // }

  constructor(
    private pautasService: PautasService,
    private toastr: ToastrService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.exibirPautas();
  }
  // abrirFormulario(id?: number) {
  //   this.modal = { tipo: 'formulario', id: id ?? undefined };
  // }

  // abrirResultado(id: number) {
  //   this.modal = { tipo: 'resultado', id };
  // }

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
        page: this.pagina,
        size: this.tamanhoPagina,
      })
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.isLoading = false))
      )
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
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.isLoading = false))
      )
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
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (response) => {
          this.pautaEncontradaPorId = response;
          this.successMessage('Pauta encontrada com sucesso!');
        },
        error: (error) => {
          this.errorMessage(
            error?.error?.message || 'Erro ao buscar pauta por ID:'
          );
        },
      });
  }

  abrirFormularioPauta(pauta:any ): void {
    this.showModalFormulario = !this.showModalFormulario;
    if (pauta) {
      this.pautaId = pauta;
    }
  }

  abrirDadosPauta(id:any): void {
    if (id) {
      this.buscarPautaPorId(id);
      if (this.pautaEncontradaPorId) {
        this.showModalDados = true;
      }
    } else {
      this.showModalDados = false;
    }
  }
  submitPauta(form:any) {
    const submitRequest$ = form.id ? this.pautasService.atualizarPauta(form.id, form.formulario) :
      this.pautasService.cadastrarPauta(form.formulario);
      submitRequest$.pipe(
      untilDestroyed(this),
      finalize(() => (this.isLoading = false))
    )
    .subscribe({
      next: () => {

        this.successMessage(form.id ? 'Pauta editada com sucesso!' : 'Pauta cadastrada com sucesso!');
        this.exibirPautas();
        this.showModalFormulario = false;
      },
      error: (error) => {
        this.errorMessage(error?.error?.message || 'Erro ao cadastrar pauta:');
      },
    });
}
}
