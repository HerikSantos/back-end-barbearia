# Sistema de Fidelidade

Um sistema de fidelidade feito para um barbearia, onde vc pode cadastrar seus clientes e adicionar seus cortes de cabelo.

## 🚀 Sobre

Api para um aplicação de sistema de fidelidade de uma barbearia.

Nessa api existem duas entidades, clients e admins.

Somente os admins podem fazer alterações nos dados dos clientes, desde criação até remoção. Foi usado o JWT para fazer essa autenticação.

Os Admins possuem senhas que foram hasheada com Bcryptjs antes de serem armazenados no banco de dados.

A documentação completa da aplicação feita com Swagger está aqui (https://projeto1.heriksantos.com/api-docs)
Criando um user admin e fazendo o login, vc recebe um token que te da acesso as outras rotas da aplicação.

### 📋 Pré-requisitos

De que coisas você precisa para instalar o software e como instalá-lo?

```
Ter instalado pelo menos um gerenciador de pacotes do Node, [Npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/).

```

### 🔧 Instalação

Executar na raiz do projeto o seguinte comando para instalar as dependências `yarn install` ou `npm install`

Para executar a API localmente, deve ter o mysql instalado ou um container com ele.

```
Para configurar a variáveis de ambiente da aplicação deve ser criado um .env.dev e passar as informações conforme o .env.example

```

## ⚙️ Executando os testes

Todos os UseCase e controllers da aplicação estão com testes automatizados, verificando as regras de negócios e garantido a funcionalidade da aplicação.

```sh
npm run test
```

### Rotas da Aplicação

Todas as rotas e informações da aplicação estão documentadas aqui (https://projeto1.heriksantos.com/api-docs)

## 🚀 Deploy<a name = "deploy"></a>

Você pode utilizar a API, está aqui: `http://projeto1.heriksantos.com`

O processo de deploy foi feita usando AWS EC2 desde a criação de uma VM até o upload dos arquivos e o processo de roteamento do servidor.
Usei Nginx para o proxy reverso, usei PM2 para manter a aplicação sempre funcionando e o GIT para versionamento e upload dos arquivos.

## 🛠️ Construído com


* [TypeScript(JavaScript)] - A linguagem usada
* [Express] - O framework web usado
* [Typeorm] - O ORM utilizado
* [JWT] - Usado para a autenticação das rotas
* [Bcryptjs] - Usado para o hasheamento das senhas e garantir a segurança dos dados da aplicação
* [Jest] - Para o teste da aplicação
* [MySQL] - Como banco de dados
* [AWS EC2] - Para o deploy
* [Nginx] - Para o proxy reverso do servidor aws

## ✒️ Autores

* **Herik Santos** - *Documentação* - (https://github.com/HerikSantos)

## 📄 Licença

Este projeto está sob a licença (MIT LICENSE) - veja o arquivo [LICENSE.md] (https://github.com/HerikSantos/back-end-barbearia/blob/main/LICENSE) para detalhes.
