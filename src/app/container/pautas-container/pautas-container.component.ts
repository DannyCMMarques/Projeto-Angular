import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { PautaResponseDTO } from 'src/app/interfaces/interfacePauta';
import { SessaoIniciadaResponseDTO } from 'src/app/interfaces/interfaceSessao';
import { PautasService } from 'src/app/services/pautas/pautas.service';

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
  public pauta?: PautaResponseDTO|PointerEvent;
  public sessaoDaPauta: SessaoIniciadaResponseDTO | null = null;
  public sortBy: string = 'id';
  public sortDirection: 'asc' | 'desc' = 'desc';


  constructor(
    private pautasService: PautasService,
    private toastr: ToastrService,
    public route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.exibirPautas();
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
        page: this.pagina,
        size: this.tamanhoPagina,
        sortBy: this.sortBy,
        direction: this.sortDirection
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

  abrirFormularioPauta(pauta?: PautaResponseDTO|PointerEvent): void {
    this.showModalFormulario = !this.showModalFormulario;
    if (this.isPautaValid(pauta)) {
      this.pauta = pauta;
    } else {
      this.pauta = undefined;
    }
  }

  abrirDadosPauta(id: any): void {
    if (id) {
      this.buscarPautaPorId(id);
      if (this.pautaEncontradaPorId) {
        this.showModalDados = true;
      }
    } else {
      this.showModalDados = false;
    }
  }
  submitPauta(form: any) {
    this.isLoading = true;

    const submitRequest$ = this.getSubmitRequest(form);

    submitRequest$.pipe(
      untilDestroyed(this),
      finalize(() => (this.isLoading = false))
    ).subscribe({
      next: () => {
        this.successMessage(form.id ? 'Pauta editada com sucesso!' : 'Pauta cadastrada com sucesso!');
        this.exibirPautas();
        this.showModalFormulario = false;
      },
      error: (error) => {
        this.errorMessage(error?.error?.message || 'Erro ao processar pauta:');
      },
    });
  }

  private getSubmitRequest(form: any) {
    if (form.id) {
      return this.editarPauta$(form.id, form.formulario);
    } else {
      return this.cadastrarPauta$(form.formulario);
    }
  }

  private cadastrarPauta$(formulario: any) {
    return this.pautasService.cadastrarPauta(formulario);
  }

  private editarPauta$(id: number, formulario: any) {
    return this.pautasService.atualizarPauta(id, formulario);
  }

  onMudancaPagina(novaPagina: number): void {
    this.pagina = novaPagina;
    this.exibirPautas();
  }

  navegarParaSessao(id: number): void {
    this.router.navigate(['/sessao', id]);
  }

  isPautaValid(pauta: any): pauta is PautaResponseDTO {
    return pauta && 'id' in pauta && typeof pauta.id === 'number';
  }
}
