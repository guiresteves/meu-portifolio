# Portfólio — Guilherme Esteves

## Descrição curta

Este repositório contém o site de portfólio pessoal de Guilherme Esteves — um desenvolvedor focado em Back-end (APIs e microsserviços). É um site estático simples com seções: Home, About, Skills, Projects e Contact.

## Conteúdo do projeto

- `index.html` — página principal HTML do portfólio.
- `css/style.css` — estilos do site.
- `js/script.js` — scripts JavaScript que controlam animações, navbar, skills, formulário de contato e integração com EmailJS.
- `assets/` — imagens, logos e recursos estáticos usados no site.

## Principais funcionalidades

- Efeito de "digitador" na seção Home para descrever o perfil.
- Navbar com indicador animado e versão dropdown para telas menores.
- Scroll reveal (animação ao aparecer na viewport).
- Seção Skills com navegação e cards gerados dinamicamente.
- Grid de projetos com cards e links para GitHub.
- Formulário de contato integrado com EmailJS (envio de e-mail através do cliente EmailJS).

## Como rodar localmente

Opção 1 — abrir localmente (rápido):

1. Abra a pasta do projeto no seu explorador de arquivos.
2. Dê um duplo clique em `index.html` para abrir no navegador.

Opção 2 — servidor HTTP simples (recomendado para evitar problemas com carregamento de recursos):

No PowerShell, dentro da pasta do projeto execute:

```powershell
python -m http.server 8000
# depois abra http://localhost:8000 no navegador
```

Ou use a extensão Live Server do VS Code para servir a pasta e recarregamento automático.

## Configuração do EmailJS (formulário de contato)

O projeto usa EmailJS para enviar mensagens do formulário. No arquivo `js/script.js` há chamadas que precisam das suas credenciais:

- `emailjs.init("0nOTFDy6tltT0CC7v");` — chave pública (User ID / public key) está atualmente no arquivo.
- No envio: `emailjs.send("service_ekb8hai", "template_4pltybk", { ... })` — service ID e template ID.

O que você deve fazer antes de colocar em produção:

1. Crie uma conta em https://www.emailjs.com/ e configure um serviço de e-mail (por exemplo, Gmail/SMTP, etc.).
2. Crie um template com os campos (`name`, `email`, `message`) ou ajuste o envio conforme seu template.
3. Substitua a chave pública em `emailjs.init(...)`, o `service ID` e o `template ID` no `js/script.js` pelos seus valores.
4. Atenção: evite expor credenciais sensíveis em repositórios públicos. A chave pública do EmailJS é menos sensível que uma secret, mas ainda assim considere usar um proxy/ backend para envio em aplicações maiores.

## Personalização

- Para alterar textos e links: edite `index.html`.
- Para adicionar/remover skills: edite o objeto `skillsData` em `js/script.js`.
- Para trocar logos e imagens: substitua arquivos em `assets/` ou atualize os caminhos no HTML/JS.

## Estrutura recomendada para deploy

Este é um site estático, então opções rápidas de deploy:

- GitHub Pages — ótimo para projetos estáticos.
- Netlify / Vercel — deploy contínuo integrado ao GitHub.
- Hospedagem estática tradicional (S3 + CloudFront, etc.).

Exemplo breve — GitHub Pages

1. Commit e push do repositório para GitHub.
2. Nas configurações do repositório, habilite GitHub Pages (branch `main` ou `gh-pages`).

## Boas práticas e sugestões (próximos passos)

- Adicionar meta tags adicionais para SEO (Open Graph, Twitter Cards).
- Otimizar imagens (WebP) e usar lazy loading onde aplicável.
- Auditar acessibilidade (contraste, aria-labels, foco de teclado).
- Incluir testes simples (lighthouse, checks de link quebrado) em CI.
- Remover chaves/IDs sensíveis do repositório ou mover lógica de envio para um backend quando necessário.

## Contato

Você pode encontrar o autor nas redes listadas no próprio site (links no `index.html`).

## Licença

MIT License — sinta-se livre para usar/adaptar este projeto; mantenha os créditos quando apropriado.

---