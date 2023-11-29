# Sistema Hospitalar

Este é um sistema hospitalar desenvolvido em Express.js para gerenciar informações sobre médicos, enfermeiros, pacientes, status dos pacientes e tarefas.

## Configuração

1. **Clone o Repositório:**
   ```bash
   git clone https://github.com/ghps2704/system-hospital.git
   cd system-hospital
   
2. Instale as Dependências:
npm install

3. Configuração do Banco de Dados:
Configure as informações do banco de dados no arquivo db.js.

4. Inicie o Servidor:
npm start
O servidor será iniciado em http://localhost:3000 por padrão.

## Endpoints Disponíveis

### Médicos
- **GET /doctors**: Obter todos os médicos.
- **GET /doctors/:id**: Obter um médico específico.
- **POST /doctors**: Criar um novo médico.
- **PUT /doctors/:id**: Atualizar informações de um médico.
- **DELETE /doctors/:id**: Excluir um médico.

### Enfermeiros
- **GET /nurses**: Obter todos os enfermeiros.
- **GET /nurses/:id**: Obter um enfermeiro específico.
- **POST /nurses**: Criar um novo enfermeiro.
- **PUT /nurses/:id**: Atualizar informações de um enfermeiro.
- **DELETE /nurses/:id**: Excluir um enfermeiro.

### Pacientes
- **GET /patients**: Obter todos os pacientes.
- **GET /patients/:id**: Obter um paciente específico.
- **POST /patients**: Criar um novo paciente.
- **PUT /patients/:id**: Atualizar informações de um paciente.
- **DELETE /patients/:id**: Excluir um paciente.

### Status dos Pacientes
- **GET /patient-status**: Obter todos os status dos pacientes.
- **GET /patient-status/:id**: Obter um status específico do paciente.
- **POST /patient-status**: Criar um novo status do paciente.
- **PUT /patient-status/:id**: Atualizar informações de um status do paciente.
- **DELETE /patient-status/:id**: Excluir um status do paciente.

### Tarefas
- **GET /tasks**: Obter todas as tarefas.
- **GET /tasks/:id**: Obter uma tarefa específica.
- **POST /tasks**: Criar uma nova tarefa.
- **PUT /tasks/:id**: Atualizar informações de uma tarefa.
- **DELETE /tasks/:id**: Excluir uma tarefa.

Contribuição
Sinta-se à vontade para contribuir com melhorias ou correções. Basta seguir estes passos:

Faça um fork do repositório.
Crie uma branch para a sua contribuição: ``git checkout -b feature/nova-funcionalidade``.
Faça as alterações desejadas.
Commit e faça push das alterações para o seu fork.
Abra um pull request para revisão.
Esperamos que este sistema seja útil para você! Se tiver dúvidas ou encontrar problemas, sinta-se à vontade para abrir uma issue.

Happy coding!
