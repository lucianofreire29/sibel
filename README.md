# Sibel — Studio de Beleza e Estilo

Aplicação web de salão de beleza, com interface mobile-first baseada no [projeto do Figma](https://www.figma.com/design/I09tLKEwO845qR8JxLrfxs/Sal%C3%A3oSibel?node-id=23-5).

**Status:** protótipo de interface com cadastro e login locais. Ainda não integrado ao Firebase e não pronto para uso em produção.

## Tecnologias

React, Vite, React Router, CSS e Lucide React. ESLint para análise estática e Node Test Runner para testes da autenticação local.

## Executar no computador

Use Node.js 22.13 ou superior da linha 22, ou Node.js 24, e npm.

```bash
git clone https://github.com/lucianofreire29/sibel.git
cd sibel
npm ci
npm run dev
```

No PowerShell, caso haja bloqueio de scripts, use:

```powershell
npm.cmd ci
npm.cmd run dev
```

Abra o endereço **Local** exibido pelo Vite, normalmente `http://localhost:5173`, no mesmo computador que executa o servidor.

**Importante:** não use o endereço **Network** em HTTP para testar o cadastro. As APIs `crypto.randomUUID` e `crypto.subtle` exigem um contexto seguro, como localhost ou HTTPS. Em outro dispositivo, localhost aponta para aquele dispositivo, não para o computador que está rodando o projeto. Uma prévia de rede precisa de HTTPS configurado.

Execute os comandos na raiz do projeto, onde fica `package.json`, e não dentro de `src`.

## O que funciona nesta etapa

- Apresentação inicial com transição para o login; a barra não permanece na tela de login.
- Cadastro com nome, email, senha e confirmação, com validações e rejeição de emails duplicados.
- Cadastro retorna ao login, sem autenticação automática.
- Login usando a conta criada; não há credenciais fixas de teste.
- Rotas internas redirecionam visitantes sem sessão ao login.
- Nome e iniciais da conta na Home e no perfil; email no perfil.
- Edição do nome no perfil refletida na Home e botão Sair.
- Pesquisa de profissionais, filtros de serviços e navegação entre as telas.

## Autenticação local e limites

As contas são armazenadas no `localStorage` deste navegador e desta origem (endereço/porta). A sessão usa `sessionStorage`. Limpar os dados do site remove as contas locais; mudar de navegador, endereço ou porta não transfere os cadastros.

A senha não é armazenada em texto puro: o protótipo utiliza salt aleatório e PBKDF2/SHA-256. Ainda assim, os dados e a validação estão no cliente e podem ser alterados por quem controla o navegador. **Isso não é autenticação segura para produção. Não use senhas ou dados reais.**

Não há Firebase, servidor, envio de email ou sincronização entre dispositivos.

## Telas e rotas

| Rota | Tela |
| --- | --- |
| `/` | Apresentação |
| `/login` | Login |
| `/cadastro` | Cadastro local |
| `/recuperar-senha` | Recuperação de senha — demonstrativa |
| `/nova-senha` | Atualização de senha — demonstrativa |
| `/home` | Home |
| `/profissionais` | Lista e pesquisa de profissionais |
| `/servicos` | Catálogo e filtros |
| `/agendamento` | Formulário de agendamento |
| `/confirmar` | Resumo demonstrativo |
| `/sucesso` | Confirmação visual |
| `/perfil` | Perfil e edição do nome |

## O que ainda é demonstrativo

- Agendamentos usam dados fixos: seleções ainda não são propagadas por todo o fluxo nem salvas. A tela de sucesso não cria uma reserva real.
- Avisos de envio por WhatsApp/email são apenas textos da interface.
- Recuperação de senha e abas Endereço, Segurança e Aparência não têm integração real.
- No perfil, apenas o nome é editado e salvo nesta etapa.
- Logo e avatares são provisórios. A fidelidade de todas as telas ao Figma ainda precisa ser revisada.

## Organização

- `src/App.jsx`: telas e rotas.
- `src/components.jsx`: componentes compartilhados.
- `src/local-auth.js`: cadastro, login, sessão e nome do usuário.
- `src/data.js`: dados demonstrativos de serviços e profissionais.
- `src/styles.css`: estilos e paleta.
- `tests/local-auth.test.js`: testes de cadastro, login, sessão e isolamento de contas.

## Paleta

| Uso | Cor |
| --- | --- |
| Botões principais | `#4A2C20` |
| Textos | `#35231B` |
| Elementos secundários | `#6B4533` |
| Destaque | `#A8795B` |
| Fundo complementar | `#D8C1AE` |
| Rosado | `#C9A49A` |
| Superfícies | `#F4E9E1` |
| Pêssego | `#DB9D84` |

Fundo principal em degradê: `#F4E7DE` → `#EBCFC1` (58%) → `#D9B49B`.

## Verificações

```bash
npm run lint
node --test tests/local-auth.test.js
npm run build
```

No PowerShell, substitua `npm` por `npm.cmd`. O build é gerado em `dist`. Uma hospedagem futura deverá oferecer HTTPS e redirecionar rotas da SPA para `index.html`.

## Próximas etapas a definir

- Revisar telas e substituir logo/fotos pelos arquivos finais.
- Conectar escolhas de profissional, serviço, data e horário no fluxo de agendamento.
- Integrar Firebase Authentication e persistência de dados.
- Implementar recuperação de senha e demais funcionalidades do perfil.
- Testar em diferentes tamanhos de tela e preparar a publicação.
