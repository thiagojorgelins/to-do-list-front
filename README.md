# Todo List Frontend
Este repositório contém o **Todo List Frontend**, uma aplicação web de gerenciamento de tarefas desenvolvida em **React** com **TypeScript** e estilizada com **Tailwind CSS**. O frontend se integra com a Todo List API para fornecer uma interface intuitiva para gerenciamento de tarefas.


## Tecnologias Utilizadas
- [React](https://reactjs.org/): Biblioteca JavaScript para construção de interfaces.
- [TypeScript](https://www.typescriptlang.org/): Superset tipado do JavaScript.
- [Tailwind CSS](https://tailwindcss.com/): Framework CSS utility-first.
- [Docker](https://www.docker.com/): Plataforma para containerização de aplicações.

## Instruções para Rodar a Aplicação

### Pré-requisitos
- **Docker** e **Docker Compose** instalados na máquina.
- API Todo List rodando ([ver documentação da API](https://github.com/thiagojorgelins/to-do-list.git)).

### Passo a Passo
- **Iniciar a Aplicação**

   Para desenvolvimento:
   ```bash
   # Primeira vez ou ao adicionar dependências
   docker-compose -f docker-compose.dev.yml up --build

   # Demais vezes
   docker-compose -f docker-compose.dev.yml up
   ```

   Para produção:
   ```bash
   # Primeira vez ou quando houver alterações
   docker-compose up --build -d

   # Demais vezes
   docker-compose up -d
   ```

- **Acessar a Aplicação**
   Com a aplicação em execução, acesse [http://localhost:3000](http://localhost:3000)

- **Parar a Aplicação**
   ```bash
   docker-compose down
   ```




### Scripts Disponíveis
```json
{
  "docker:build": "Constrói a imagem Docker",
  "docker:start": "Inicia os containers",
  "docker:dev": "Inicia em modo desenvolvimento",
  "docker:prod": "Inicia em modo produção",
  "docker:stop": "Para os containers"
}
```
