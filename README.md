![NestJS](https://img.shields.io/badge/nestjs-red)

# api-build-de-pc(BuildWise)

## Identificação/Autor

**Vinicius Ferreira Pacheco**

## Descrição do Projeto
Api BuildWIse, API para montagem de computadores que integra dados como consumo de energia, gargalo e custo/benefício.
Podendo sugerir upgrades futuros(ex:" pode trocar essa GPU no futuro sem trocar a fonte").

### Instalação (Getting Started)
#### 1. Clone o repositório
```bash
git@github.com/Vinicius-FPach/api-build-de-pc.git
```

#### 2. Instale as dependências
```bash
yarn install
Ou
npm install
```

#### 3.	Configure o ambiente
Crie um arquivo .env na raiz e adicione:
```
DATABASE_URL="mysql://root:root@localhost:3306/meubanco"
```


#### 4.	Execute a migration do Prisma
```
npx prisma migrate dev --name init
```

#### 5. Inicie servidor NestJS
```
yarn start
# ou, para ambiente de desenvolvimento:
npm run start:dev
```

___

### Prisma Studio

O **Prisma Studio** é uma interface gráfica intuitiva para visualizar e gerenciar os dados do banco de dados utilizado no projeto.

#### Acessar com Yarn

```bash
yarn studio
# Ou
npx prisma studio
```

Após rodar o comando, acesse http://localhost:5555 no navegador para abrir o Studio.
___

**Variáveis de Ambiente:**

| Nome da Variável | Descrição | Exemplo |
|------------------|-----------|---------|
| `JWT_SECRET`     | Segredo usado para assinatura dos tokens JWT | `some-secret-here` |

---

## Diagrama de Entidade-Relacionamento (ERD):

<img width="1165" height="472" alt="DbDiagram" src="https://github.com/user-attachments/assets/b742693e-e846-4c2e-924e-678a8e9a4c47" />


---

## Documentação Swagger:

A documentação interativa da API está disponível em:

```
http://localhost:3000/api
```

Essa interface permite testar os endpoints da API diretamente pelo navegador, visualizar os parâmetros esperados, os retornos possíveis, além de simular autenticação com JWT usando o botão “Authorize”.

---

## Requisitos Avaliativos (RA) e Itens de Desempenho (ID)
#### RA1 - Projetar e desenvolver uma API funcional utilizando o framework NestJS.

- [x] **ID1:** O aluno configurou corretamente o ambiente de desenvolvimento e criou a API utilizando NestJS, com rotas e controladores que seguem a arquitetura modular.
- [x] **ID2:** O aluno aplicou boas práticas de organização da lógica de negócios, garantindo que os services contenham a lógica de negócio e sejam chamados pelos controladores, separando responsabilidades corretamente.
- [x] **ID3:** O aluno utilizou providers e configurou adequadamente a injeção de dependência no NestJS, garantindo uma arquitetura modular e escalável.
- [x] **ID4:** O aluno demonstrou a habilidade de criar e manipular rotas HTTP, manipulando parâmetros de rota, query e body, lidando corretamente com requisições e respostas.
- [x] **ID5:** O aluno aplicou boas práticas de tratamento de erros, utilizando filtros globais e personalizando as mensagens de erro para garantir respostas claras e consistentes.
- [x] **ID6:** O aluno criou classes DTO (Data Transfer Objects) para garantir a validação e consistência dos dados em diferentes endpoints, utilizando pipes para validar entradas de dados.
- [x] **ID7:** O aluno aplicou corretamente pipes de validação no NestJS, verificando entradas inválidas e assegurando a integridade dos dados transmitidos

#### RA2 - Implementar persistência de dados com um banco de dados relacional utilizando Prisma ou TypeORM.

- [x] **ID8:** O aluno modelou corretamente os dados da aplicação, definindo entidades, suas relações e campos necessários, refletidos em um Diagrama de Entidade-Relacionamento (ERD).
- [x] **ID9:** O aluno configurou e conectou a API a um banco de dados relacional (PostgreSQL, MySQL, etc.) utilizando Prisma ou TypeORM.
- [x] **ID10:** O aluno criou e aplicou migrações de banco de dados para garantir a consistência dos dados entre desenvolvimento e produção.
- [x] **ID11:** O aluno implementou corretamente as operações CRUD (Create, Read, Update, Delete) para pelo menos uma entidade no projeto, utilizando NestJS.

#### RA3 - Realizar testes automatizados para garantir a qualidade da API.

<!--
As observações abaixo explicam por que os itens ID12 e ID13 não foram implementados, conforme orientação do professor. Portanto, não serão marcadas como concluídos, mas sim mostrados como excluídos conscientemente do escopo.
-->

- [ ] ~~**ID12:** Implementou testes automatizados com Jest, validando funcionalidades críticas da API.~~

- [ ] ~~**ID13:** Garantiu cobertura de testes para rotas e serviços principais, incluindo operações CRUD.~~
      
#### RA4 - Gerar a documentação da API e realizar o deploy em um ambiente de produção.

- [x] **ID14:** O aluno integrou corretamente o Swagger à API, gerando a documentação completa e interativa dos endpoints, parâmetros e respostas da API, com exemplos de requisições e respostas.
- [] **ID15:** O aluno realizou o deploy da API em uma plataforma de hospedagem na nuvem (ex.: Render.com, Heroku, Vercel, etc.), garantindo que a API estivesse acessível publicamente.
- [x] **ID16:** O aluno garantiu que a API funcionasse corretamente no ambiente de produção, incluindo a documentação Swagger e o banco de dados.
- [x] **ID17:** O aluno realizou a configuração correta de variáveis de ambiente usando o ConfigModule do NestJS.
- [ ] **ID18:** O aluno implementou corretamente o versionamento de APIs REST no NestJS, assegurando que diferentes versões da API pudessem coexistir.

#### RA5 - Implementar autenticação, autorização e segurança em APIs utilizando JWT, Guards, Middleware e Interceptadores.

- [x] **ID19:** O aluno configurou a autenticação na API utilizando JWT (JSON Web Tokens).
- [x] **ID20:** O aluno implementou controle de acesso baseado em roles e níveis de permissão, utilizando Guards para verificar permissões em rotas específicas.
- [x] **ID21:** O aluno configurou e utilizou middleware para manipular requisições antes que elas chegassem aos controladores, realizando tarefas como autenticação, logging ou tratamento de CORS.
- [x] **ID22:** O aluno implementou interceptadores para realizar logging ou modificar as respostas antes de enviá-las ao cliente.
