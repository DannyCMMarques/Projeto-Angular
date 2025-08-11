import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { SessaoIniciadaResponseDTO } from 'src/app/interfaces/interfaceSessao';
import { AssociadoServiceService } from 'src/app/services/associado/associado-service.service';
import { SessoesService } from 'src/app/services/sessoes/sessoes.service';
import { VotacaoService } from 'src/app/services/votacao/votacao.service';
import { VotoRequestDTO } from '../../interfaces/interfaceVotacao';

@UntilDestroy()
@Component({
  selector: 'app-votacao-container',
  templateUrl: './votacao-container.component.html',
  styleUrls: ['./votacao-container.component.css'],
})
export class VotacaoContainerComponent implements OnInit {
  public sessaoEncontradaPorId!: SessaoIniciadaResponseDTO;
  public isLoading: boolean = false;
  public isOpenModal: boolean = false;
  public idUsuario: number | null = this.handleGetIdUsuario();
  public idSessao!: number;
  public mostrarCadastro: boolean = false;
  public horarioEncerramento = this.sessaoEncontradaPorId.horarioFim;
  constructor(
    private sessaoService: SessoesService,
    private votacaoService: VotacaoService,
    private associadoService: AssociadoServiceService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idSessao = params['id'];
      if (this.idSessao) {
        this.buscarSessaoPorId(Number(this.idSessao));
      } else {
        this.errorMessage('ID da sessão não encontrado');
        this.router.navigate(['/sessoes']);
      }
    });
  }



  handleAssociadoForm(form: any) {


    const dadosAssociado = form.formulario || form;

    this.buscarAssociadoPorCpf(dadosAssociado.cpf);
    if (this.mostrarCadastro) {
      this.associadoService
        .cadastrarAssociado(dadosAssociado)
        .pipe(
          untilDestroyed(this),
          finalize(() => (this.isLoading = false))
        )
        .subscribe({
          next: (response) => {
            this.idUsuario = response.id;
            this.handleSetIdUsuario(this.idUsuario);
            this.successMessage('Associado cadastrado com sucesso');
            this.isOpenModal = false;
            this.buscarSessaoPorId(this.idSessao);
          },
          error: (error) => {            this.errorMessage(
              error?.error?.message || 'Erro ao cadastrar associado:'
            );
          },
        });
    }
  }

  buscarAssociadoPorCpf(cpf: string) {
    this.associadoService
      .buscarAssociado({
        page: 1,
        size: 10,
        sortBy: 'nome',
        direction: 'desc',
        cpf: cpf,
      })
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (response) => {
          if (response.content.length > 0) {
            this.idUsuario = response.content[0].id;
            this.handleSetIdUsuario(this.idUsuario);
            this.successMessage('Bem vindo de volta :)');
            this.buscarSessaoPorId(this.idSessao);
          } else {
            this.mostrarCadastro = true;
            this.isOpenModal = true;
          }
        },
      });
  }
  handleSetIdUsuario(id: number) {
    localStorage.setItem('idUsuario', id.toString());
  }
  handleGetIdUsuario() {
    const idUsuario = localStorage.getItem('idUsuario');
    return idUsuario ? Number(idUsuario) : null;
  }

  handleVotar(voto: string) {

    if (this.idUsuario === null) {
      this.isOpenModal = true;
    } else {
      this.votar(voto);
    }
  }

  votar(voto: string) {
    const votoRequest: VotoRequestDTO = {
      voto: voto === 'SIM' ? true : false,
      associado: this.idUsuario!,
    };
    this.votacaoService
      .votar(this.idSessao, votoRequest)
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: () => {
          this.successMessage('Voto realizado com sucesso');
          this.isOpenModal = false;
          this.buscarSessaoPorId(this.idSessao);
        },
        error: (error) => {
          this.errorMessage(error?.error?.message || 'Erro ao votar.');
        },
      });
  }

  public successMessage(msg: string): void {
    this.toastr.success(msg);
  }

  public errorMessage(msg: string): void {
    this.toastr.error(msg);
  }

  buscarSessaoPorId(id: number): void {
    this.isLoading = true;
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
}
