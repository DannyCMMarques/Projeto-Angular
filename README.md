# 🗳️ Front-end de Votação Cooperativa

Esta é a versão **front-end** responsiva, construída com **Angular** e **TypeScript**, de uma solução de votação para cooperativas. Este projeto foi desenvolvido com foco no **aprendizado e prática dos conceitos fundamentais do Angular**, consumindo a API desenvolvida em Java/Spring Boot:
https://github.com/DannyCMMarques/desafio-votacao-spring-java

---

## 🎯 Objetivo do Projeto

Este projeto foi criado com o propósito de **colocar em prática os principais conceitos e funcionalidades do Angular**, servindo como um laboratório de aprendizado para dominar o framework. Durante o desenvolvimento, foram explorados e implementados diversos tópicos essenciais do Angular.

---

## Tópicos de Angular Abordados

### 🔧 **Componentes e Decorators**

- **@Component**: Criação de componentes reutilizáveis
- **@Input()**: Comunicação de dados do componente pai para filho
- **@Output()**: Comunicação de eventos do componente filho para pai
- **@ViewChild()**: Acesso a elementos do template
- **@ContentChild()**: Acesso a conteúdo projetado
- **@Injectable()**: Criação de serviços injetáveis

### 🔄 **Lifecycle Hooks**

- **ngOnInit()**: Inicialização de componentes
- **ngOnChanges()**: Reação a mudanças em @Input()
- **ngOnDestroy()**: Limpeza de recursos (usando @ngneat/until-destroy)

### 📝 **Formulários Reativos**

- **ReactiveFormsModule**: Formulários baseados em observables
- **FormBuilder**: Construção de formulários complexos
- **FormGroup**: Agrupamento de controles
- **Validators**: Validação de campos
- **FormControl**: Controle individual de campos

### 🌐 **HTTP e Serviços**

- **HttpClient**: Comunicação com APIs REST
- **HttpParams**: Construção de query parameters
- **Observable**: Programação reativa
- **subscribe()**: Manipulação de respostas HTTP
- **pipe()**: Transformação de dados
- **finalize()**: Execução de código após conclusão

### 🧭 **Roteamento**

- **RouterModule**: Configuração de rotas
- **Router**: Navegação programática
- **ActivatedRoute**: Acesso a parâmetros de rota
- **router-outlet**: Renderização de componentes

### 🏗️ **Arquitetura e Padrões**

- **Container/Presentational Pattern**: Separação de responsabilidades
- **Dependency Injection**: Injeção de dependências
- **Service Layer Pattern**: Centralização de lógica de negócio
- **Module System**: Organização modular do código

### **Templates e Diretivas**

- **Structural Directives**: *ngIf, *ngFor, \*ngSwitch
- **Attribute Directives**: [ngClass], [ngStyle]
- **Event Binding**: (click), (submit)
- **Property Binding**: [property], [attr.attribute]
- **Two-way Binding**: [(ngModel)]

### **Change Detection**

- **OnPush Strategy**: Otimização de performance
- **Manual Change Detection**: DetectorRef

### 🧪 **Testes**

- **Jasmine**: Framework de testes
- **Karma**: Executor de testes
- **TestBed**: Configuração de ambiente de teste
- **ComponentFixture**: Manipulação de componentes em teste
- **HttpTestingController**: Mock de requisições HTTP

### 📦 **Módulos e Organização**

- **SharedComponentModule**: Componentes reutilizáveis
- **ServicesModule**: Agrupamento de serviços
- **Feature Modules**: Organização por funcionalidade
- **Lazy Loading**: Carregamento sob demanda

### 🔌 **Bibliotecas de Terceiros**

- **ngx-toastr**: Notificações toast
- **ngx-spinner**: Indicadores de loading
- **@ngneat/until-destroy**: Gerenciamento de subscriptions
- **Tailwind CSS**: Framework de estilização

---

## 📋 Descrição do Sistema

- Ao acessar o site, o usuário vê todas as pautas cadastradas em uma lista com paginação, incluindo título e descrição.
- É possível criar, editar e deletar pautas, além de visualizar detalhes e resultados de votações.
- No menu lateral, em **Sessões**, o usuário encontra todas as sessões registradas com seus status.
  - Criar nova sessão, informando o código da pauta e duração.
  - Iniciar, editar e excluir sessões.
  - Visualizar detalhes da pauta associada e status atual.
- Ao clicar em **Votar** em um card de pauta ou **Participar** no card de sessão, o usuário será redirecionado para uma página de votação:
  - Vê informações da pauta, tempo restante (contagem regressiva) e estatísticas de votação.
  - Confere lista de associados que já votaram.
  - Emite seu voto (`Sim`/`Não`). Se não estiver logado, o site solicita CPF, verifica cadastro, e caso não esteja cadastrado, realiza cadastro e simula login (mantém ID no `localStorage` até o usuário clicar em "Sair" e utiliza Angular Services) para evitar solicitar CPF a cada voto.

> ⚙️ Para facilitar o uso e testes, foi criado um **seed com pautas** e um **seed com 10 associados** prontos para votar:

```sql
INSERT INTO associados (nome, cpf) VALUES
('Ana Paula Ferreira',       '12345678901'),
('Bruno Martins da Silva',   '23456789012'),
('Carlos Henrique Souza',    '34567890123'),
('Daniela Lopes Andrade',    '45678901234'),
('Eduardo Lima Costa',       '56789012345'),
('Fernanda Rocha Mendes',    '67890123456'),
('Gabriel Vieira Ramos',     '78901234567'),
('Helena Castro Oliveira',   '89012345678'),
('Igor Matos Barreto',       '90123456789'),
('Juliana Torres Almeida',   '01234567890');
```

---

## 🛠 Tecnologias Utilizadas

- **Angular 16.2.0** - Framework principal
- **TypeScript 5.1.3** - Linguagem de programação
- **Angular Router** - Navegação entre páginas
- **Angular HttpClient** - Requisições HTTP
- **Angular Reactive Forms** - Formulários reativos
- **ngx-toastr 19.0.0** - Notificações toast
- **ngx-spinner 16.0.2** - Indicadores de loading
- **@ngneat/until-destroy 10.0.0** - Gerenciamento de subscriptions
- **Tailwind CSS 3.4.4** - Framework de estilização
- **Jasmine + Karma** - Testes unitários

---

## 🏗️ Arquitetura do Projeto

### Estrutura de Pastas

```
src/app/
├── component/           # Componentes reutilizáveis
│   ├── forms/          # Formulários reativos
│   ├── loading/        # Componentes de loading
│   ├── modal/          # Modais reutilizáveis
│   └── votacao/        # Componentes de votação
├── container/          # Containers (Smart Components)
├── pages/              # Páginas principais
├── services/           # Serviços HTTP
├── interfaces/         # Interfaces TypeScript
├── utils/              # Utilitários e mocks
└── shared/             # Pipes e outros recursos compartilhados
```

### Padrões Implementados

- **Container/Presentational Pattern** - Separação entre lógica e apresentação
- **Service Layer Pattern** - Centralização de chamadas HTTP
- **Reactive Forms** - Validação robusta de formulários
- **Dependency Injection** - Injeção de dependências Angular
- **Observable Pattern** - Gerenciamento de estado reativo

---

## Capturas de Tela

<p align="center">
  <img src="https://github.com/user-attachments/assets/898bca8a-834c-44fd-b083-af6122fc202d" width="400"/>
  <img src="https://github.com/user-attachments/assets/1040dc77-c2c4-44de-a368-677f4810aa56" width="400"/>
  <img src="https://github.com/user-attachments/assets/fdc529f8-acbc-4469-8405-8e5ade09bcbf" width="400"/>
  <img src="https://github.com/user-attachments/assets/161a56f1-d515-47af-a979-3b8a69342b03" width="400"/>
  <img src="https://github.com/user-attachments/assets/9c99acb8-dffd-48ca-8aa0-3a1f1f16c73b" width="400"/>
</p>

### 📱 Versão Mobile

<p align="center">
  <img src="https://github.com/user-attachments/assets/f2f09b66-72ce-4153-9d1e-2da2e11ddafd" width="200"/>
  <img src="https://github.com/user-attachments/assets/55e6af8c-8f8c-4536-a0db-71536477adff" width="200"/>
  <img src="https://github.com/user-attachments/assets/452d398f-1c4a-4562-bd2a-7707cc754b01" width="200"/>
  <img src="https://github.com/user-attachments/assets/a9c0a6ee-792b-45eb-a5e7-6f0d08263ec8" width="200"/>
</p>

---

## 💻 Como Rodar Localmente

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Angular CLI: `npm install -g @angular/cli`

### 1. Back-end (API)

```bash
git clone https://github.com/DannyCMMarques/desafio-votacao-spring-java.git
cd desafio-votacao-spring-java
docker-compose build
docker-compose up
```

### 2. Front-end

```bash
git clone https://github.com/DannyCMMarques/desafio-votacao.git
cd desafio-votacao
npm install
ng serve
```

### 3. Acesse no navegador

Abra: `http://localhost:4200`

---

## ✅ Testes

### Executar todos os testes:

```bash
ng test
```

### Executar testes com cobertura:

```bash
ng test --code-coverage
```

### Executar testes em modo watch:

```bash
ng test --watch
```

---

## 🎓 Aprendizados Principais

### **Conceitos Dominados:**

- ✅ Arquitetura de componentes Angular
- ✅ Comunicação entre componentes
- ✅ Formulários reativos e validação
- ✅ Serviços e injeção de dependências
- ✅ Roteamento e navegação
- ✅ HTTP e observables
- ✅ Lifecycle hooks
- ✅ Testes unitários
- ✅ TypeScript avançado
- ✅ Padrões de projeto

### **Boas Práticas Aplicadas:**

- ✅ Separação de responsabilidades
- ✅ Código reutilizável
- ✅ Tratamento de erros
- ✅ Performance otimizada
- ✅ Código limpo e legível
- ✅ Testes abrangentes

---
