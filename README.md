<h1 align="center">♞ ChessMind</h1>

<p align="center">Desenvolvendo sua mente, uma jogada por vez.</p>

<div align="center">
  <img src="https://img.freepik.com/fotos-premium/um-classico-jogo-de-tabuleiro-de-xadrez-como-banner_770883-271.jpg" alt="ChessMind Banner" width="600">
</div>

---

## 🧠 Sobre o Projeto

O **ChessMind** é uma plataforma educacional e interativa desenvolvida para auxiliar iniciantes e jogadores intermediários a aprenderem e se aperfeiçoarem no xadrez.

> Combinando teoria, prática, gamificação e dados, o site oferece uma experiência completa para desenvolver habilidades cognitivas e estratégicas no jogo de xadrez.

---

## 📂 Estrutura do Projeto

- 📁 css/ → Estilos personalizados (style.css, login.css, dashboard.css...)
- 📁 img/ → Imagens e ícones utilizados
- 📁 public/ → Páginas HTML (index.html, login.html, taticas.html, quiz.html...)
- 📁 js/ → Scripts JavaScript (quiz.js, calculadora.js, dashboard.js...)
- 📁 routes/ → Rotas da API (quiz.js, calculadora.js...)
- 📁 controllers/ → Lógica das funcionalidades (quizController.js, calculadoraController.js...)
- 📁 models/ → Acesso ao banco de dados (quizModel.js, calculadoraModel.js...)
- 📁 database/ → Script de criação do banco e tabelas
- README.md → Documentação do projeto
- server.js → Inicialização do servidor


---

## 🚀 Funcionalidades

- ✅ Página inicial com informações institucionais  
- ✅ Aprendizado básico sobre regras e peças  
- ✅ Explicação de táticas famosas  
- ✅ Quiz interativo com pontuação e ranking  
- ✅ Dashboard com gráficos de desempenho  
- ✅ Cálculo de MMR baseado em vitórias e derrotas  
- ✅ Sistema de login e cadastro  
- ✅ Salvamento de dados no banco de dados  
- ✅ Layout responsivo e tema escuro com destaque verde  

---

## 🖥️ Tecnologias Utilizadas

- **Front-End:** HTML5, CSS3, JavaScript, Chart.js  
- **Back-End:** Node.js (Express)  
- **Banco de Dados:** MySQL  
- **Ambiente:** Máquina Virtual Linux (Ubuntu Server)

---

## 🧩 Arquitetura

O projeto segue o padrão MVC:

- **Model:** Responsável pela comunicação com o banco de dados.  
- **Controller:** Processa regras de negócio e interage com o model.  
- **View (HTML/CSS/JS):** Interface que o usuário interage diretamente.  
- **Rotas (Express):** API para envio e recuperação de dados.

---

## 🧪 Como Rodar o Projeto Localmente

```bash
# Clone o repositório
git clone https://github.com/seuusuario/ChessMind.git

# Acesse a pasta do projeto
cd ChessMind

# Instale as dependências
npm install

# Inicie o servidor
node server.js

# Acesse pelo navegador
http://localhost:3333
