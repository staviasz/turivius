# Documentação da API de Gerenciamento de Tasks

## Introdução

Esta documentação descreve as rotas disponíveis para interação com a API de gerenciamento de tasks. A API foi desenvolvida usando Django para o backend e React para o frontend. Ela oferece operações para registro e login de usuários, manipulação de tasks e autenticação baseada em JWT (JSON Web Tokens).

Para iniciar a aplicação em dev

```bash
docker-compose -f docker-compose.dev.yml up --build

```

Para iniciar a aplicação em prod

```bash
docker-compose -f docker-compose.prod.yml up --build

```

## Autenticação

As rotas protegidas exigem autenticação JWT. O token JWT deve ser incluído no cabeçalho de autorização da solicitação HTTP.

## Rotas de Usuário

### POST /user/login

Rota para autenticar um usuário existente.

#### Parâmetros de entrada:

- **email**: E-mail do usuário.
- **senha**: Senha do usuário.

#### Resposta:

- **id**: Identificador único do usuário.
- **email**: E-mail do usuário.
- **first_name**: Primeiro nome do usuário.
- **crsftoken**: Token CSRF para proteção contra ataques CSRF.
- **access_token**: Token de acesso JWT para autenticação posterior.

### POST /user/register

Rota para registrar um novo usuário.

#### Parâmetros de entrada:

- **first_name**: Primeiro nome do usuário.
- **email**: E-mail do usuário.
- **senha**: Senha do usuário.

#### Resposta:

- **id**: Identificador único do usuário.
- **email**: E-mail do usuário.
- **first_name**: Primeiro nome do usuário.

## Rotas de Tasks

### GET /task

Rota para buscar todas as tasks do usuário autenticado.

#### Resposta:

Retorna uma lista de objetos contendo informações sobre cada task:
- **id**: Identificador único da task.
- **title**: Título da task.
- **description**: Descrição da task.
- **execute_date**: Data de execução da task.
- **category**: Categoria da task.
- **completed**: Indica se a task foi concluída.

### POST /task

Rota para criar uma nova task para o usuário autenticado.

#### Parâmetros de entrada:

- **title**: Título da task.
- **description**: Descrição da task.
- **execute_date**: Data de execução da task.
- **category**: Categoria da task.

#### Resposta:

- **id**: Identificador único da task.

### PUT /task/{id}

Rota para atualizar uma task existente pelo seu ID.

#### Parâmetros de entrada:

- **title**: Título atualizado da task.
- **description**: Descrição atualizada da task.
- **execute_date**: Data de execução atualizada da task.
- **category**: Categoria atualizada da task.

### DELETE /task/{id}

Rota para excluir uma task existente pelo seu ID.
