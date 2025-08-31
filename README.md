# Seu Agendamento API

Uma API RESTful para gerenciamento de agendamentos de estabelecimentos, construída com Node.js, Fastify, Prisma e PostgreSQL.

## 🎯 Sobre o Projeto

O **Seu Agendamento API** é uma solução completa para gerenciamento de agendamentos de estabelecimentos. Permite que estabelecimentos criem horários disponíveis e que clientes realizem agendamentos de forma simples e eficiente.

### Principais Características

- ✅ Sistema de autenticação via magic link (email)
- ✅ Gerenciamento de estabelecimentos e horários
- ✅ Sistema de agendamentos com status
- ✅ Notificações via email e SMS
- ✅ API RESTful com validação de dados
- ✅ Arquitetura limpa com Clean Architecture
- ✅ Testes unitários e E2E
- ✅ Documentação completa

## 🚀 Funcionalidades

### Para Estabelecimentos (Managers)
- Criar e gerenciar estabelecimentos
- Configurar horários de funcionamento por dia da semana
- Visualizar agendamentos realizados
- Gerenciar status dos agendamentos

### Para Clientes
- Cadastro de usuário
- Autenticação via magic link enviado por email
- Visualizar horários disponíveis dos estabelecimentos
- Realizar agendamentos
- Cancelar agendamentos

## 🛠 Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **TypeScript** - 
- **Fastify** - Framework web
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados
- **Zod** - Validação de schemas
- **JWT** - Autenticação

### Comunicação
- **Nodemailer** - Envio de emails
- **Twilio** - Envio de SMS ( Future )

### Desenvolvimento
- **Vitest** - Framework de testes
- **ESLint** - Linter
- **Docker** - Containerização
- **pnpm** - Gerenciador de pacotes


## 📡 API Endpoints

### Autenticação

#### POST `/users`
Cria um novo usuário.

**Body:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "+5511999999999"
}
```

#### POST `/authenticate`
Envia link de autenticação por email.

**Body:**
```json
{
  "email": "joao@email.com"
}
```

#### GET `/auth-links/authenticate`
Autentica usuário via link mágico.

**Query Parameters:**
- `code`: Código do link de autenticação
- `redirect`: URL de redirecionamento após autenticação

### Estabelecimentos

#### POST `/establishment`
Cria um novo estabelecimento.

**Body:**
```json
{
  "managerId": "user-uuid",
  "name": "Barbearia Silva",
  "description": "Barbearia especializada em cortes modernos"
}
```

### Horários dos Estabelecimentos

#### POST `/establishment/:establishmentId/time-slots`
Cria um novo horário para o estabelecimento.

**Body:**
```json
{
  "dayOfWeek": 1,
  "startTime": "09:00",
  "endTime": "18:00"
}
```

**Nota:** `dayOfWeek` - 0 = Domingo, 1 = Segunda, ..., 6 = Sábado

#### GET `/establishment/:establishmentId/time-slots`
Lista os horários disponíveis do estabelecimento.

### Agendamentos

#### POST `/establishment/:userId/appointments/:establishmentId`
Cria um novo agendamento.

**Body:**
```json
{
  "timeSlotId": "time-slot-uuid"
}
```

#### GET `/establishment/:establishmentId/appointments`
Lista os agendamentos de um estabelecimento.

#### DELETE `/establishment/:appointmentId/appointments`
Cancela um agendamento.

## 🔐 Autenticação

A API utiliza autenticação via **link mágico**:

1. **Envio do link**: O usuário solicita autenticação informando o email
2. **Link mágico**: Um link único é enviado por email
3. **Autenticação**: Ao acessar o link, o usuário é autenticado automaticamente
4. **JWT**: Um token JWT é gerado e armazenado em cookie httpOnly


## 🧪 Testes

### Estrutura de Testes

- **Testes Unitários**: Testam casos de uso isoladamente
- **Testes E2E**: Testam fluxos completos da API
- **Repositórios In-Memory**: Para testes sem dependência de banco

### Executando Testes

```bash
# Todos os testes unitários
pnpm run test

# Testes específicos
pnpm test src/test/unit/create-user.spec.ts

# Testes E2E
pnpm run test:e2e

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

- Use TypeScript
- Siga a arquitetura Clean Architecture
- Escreva testes para novos casos de uso
- Use ESLint para manter qualidade do código
- Documente APIs com exemplos

## 📝 Licença

Este projeto está sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

