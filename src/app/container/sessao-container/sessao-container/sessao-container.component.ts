import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import {
  SessaoFormDTO,
  SessaoIniciadaResponseDTO,
  SessaoResponseDTO,
} from 'src/app/interfaces/interfaceSessao';
import { SessoesService } from 'src/app/services/sessoes/sessoes.service';

@UntilDestroy()
@Component({
  selector: 'app-sessao-container',
  templateUrl: './sessao-container.component.html',
  styleUrls: ['./sessao-container.component.css'],
})
export class SessaoContainerComponent {
  public pagina: number = 1;
  public totalPaginas: number = 0;
  public totalElementos: number = 0;
  public tamanhoPagina: number = 10;
  public sessoes: SessaoResponseDTO[] = [];
  public sessaoEncontradaPorId!: SessaoIniciadaResponseDTO;
  public isLoading: boolean = false;
  public sortBy: string = 'id';
  public sortDirection: 'asc' | 'desc' = 'desc';
  public showModalFormulario: boolean = false;
  public showModalDados: boolean = false;
  public sessao?: SessaoFormDTO;

  constructor(
    private sessaoService: SessoesService,
    private toastr: ToastrService,
    public route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.exibirSessoes();
  }

  public successMessage(msg: string): void {
    this.toastr.success(msg);
  }
  public errorMessage(msg: string): void {
    this.toastr.error(msg);
  }

  exibirSessoes(): void {
    this.isLoading = true;
    this.sessaoService
      .buscarSessoes({
        page: this.pagina,
        size: this.tamanhoPagina,
        sortBy: this.sortBy,
        direction: this.sortDirection,
      })
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (response) => {
          this.sessoes = response.content;
          this.totalPaginas = response.totalPages;
          this.totalElementos = response.totalElements;
        },
        error: (error) => {
          this.errorMessage(error?.error?.message || 'Erro ao buscar sessões:');
        },
      });
  }

  deletarSessao(id: number): void {
    this.isLoading = true;
    this.sessaoService
      .excluirSessao(id)
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: () => {
          this.successMessage('Sessão deletada com sucesso');
          this.exibirSessoes();
        },
        error: (error) => {
          this.errorMessage(error?.error?.message || 'Erro ao deletar sessão:');
        },
      });
  }

  abrirFormularioSessao(sessao?: SessaoResponseDTO | PointerEvent): void {
    this.showModalFormulario = !this.showModalFormulario;
    if (sessao && 'id' in sessao) {
      this.sessao = {
        id: sessao.id,
        idPauta: sessao.pauta.id || 0,
        duracao: sessao.duracao,
        unidade: 'MIN',
      };
    } else {
      this.sessao = undefined;
    }
  }
  private cadastrarSessao$(formulario: any) {
    return this.sessaoService.cadastrarSessao(formulario);
  }

  private editarSessao$(id: number, formulario: any) {
    return this.sessaoService.atualizarSessao(id, formulario);
  }
  private getSubmitRequest(form: any) {
    if (form.id) {
      return this.editarSessao$(form.id, form.formulario);
    } else {
      return this.cadastrarSessao$(form.formulario);
    }
  }

  submitSessao(form: any) {
    this.isLoading = true;

    const submitRequest$ = this.getSubmitRequest(form);

    submitRequest$
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: () => {
          this.successMessage(
            form.id
              ? 'Sessão editada com sucesso!'
              : 'Sessão cadastrada com sucesso!'
          );
          this.exibirSessoes();
          this.showModalFormulario = false;
        },
        error: (error) => {
          this.errorMessage(
            error?.error?.message || 'Erro ao processar sessão:'
          );
        },
      });
  }

  buscarSessaoPorId(id: number): void {
    this.sessaoService
      .buscarSessaoPorId(id)
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (response) => {
          this.sessaoEncontradaPorId = response as SessaoIniciadaResponseDTO;
        },
        error: (error) => {
          this.errorMessage(
            error?.error?.message || 'Erro ao buscar sessão por ID:'
          );
        },
      });
  }

  abrirDadosSessao(sessao?: SessaoResponseDTO | PointerEvent): void {
    if (sessao && 'id' in sessao) {
      this.buscarSessaoPorId(sessao.id);
      if (this.sessaoEncontradaPorId) {
        this.showModalDados = true;
      }
    } else {
      this.showModalDados = false;
    }
  }

  iniciarSessao(id: number): void {
    this.sessaoService
      .iniciarSessao(id)
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: () => {
          this.successMessage('Sessão iniciada com sucesso');
          this.exibirSessoes();
        },
        error: (error) => {
          this.errorMessage(error?.error?.message || 'Erro ao iniciar sessão:');
        },
      });
  }
  onMudancaPagina(novaPagina: number): void {
    this.pagina = novaPagina;
    this.exibirSessoes();
  }

  navegarParaSessao(id: number): void {
    this.router.navigate(['/sessao', id]);
  }
}
