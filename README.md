# Sibel — Studio de Beleza e Estilo

Interface web responsiva do aplicativo Sibel, construída em React e Vite a partir do projeto no Figma.

## Executar localmente

```bash
npm install
npm run dev
```

## Cadastro local (antes do Firebase)

- Crie uma conta na tela de cadastro; depois entre com o email e a senha cadastrados.
- Nome, email e verificador de senha com salt/PBKDF2 são guardados neste navegador. A senha não é armazenada em texto puro.
- A sessão usa sessionStorage. O perfil permite salvar o nome e sair da conta.
- O nome da conta aparece na Home e no perfil, inclusive depois de atualizado.

Isto é apenas um protótipo local: não protege dados em produção, não sincroniza dispositivos e não substitui Firebase Authentication. Não utilize senhas ou dados reais. Recuperação por email e as demais abas do perfil continuam como telas demonstrativas, sem integração.

## Rotas principais

- `/` — apresentação
- `/login` — acesso
- `/cadastro` — criação de conta
- `/recuperar-senha` e `/nova-senha` — recuperação de acesso
- `/home` — início
- `/profissionais` — profissionais
- `/servicos` — catálogo
- `/agendamento` — formulário de agendamento
- `/confirmar` e `/sucesso` — confirmação
- `/perfil` — dados do usuário
