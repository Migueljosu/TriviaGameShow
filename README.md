# 🎉 Trivia Game Show

![Status](https://img.shields.io/badge/status-active-success?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)
![Made with HTML](https://img.shields.io/badge/HTML5-orange?logo=html5&logoColor=white&style=for-the-badge)
![Made with CSS](https://img.shields.io/badge/CSS3-blue?logo=css3&logoColor=white&style=for-the-badge)
![Made with JS](https://img.shields.io/badge/JavaScript-yellow?logo=javascript&logoColor=black&style=for-the-badge)
![Made with Love](https://img.shields.io/badge/Made%20with-%E2%9D%A4-red?style=for-the-badge)

---

**Trivia Game Show** é uma aplicação web interativa de perguntas e respostas, desenvolvida com **HTML, CSS e JavaScript**.  
O jogo consome a API [Open Trivia Database (OpenTDB)](https://opentdb.com/) para exibir perguntas dinâmicas, com suporte a ranking, gráfico de desempenho e efeitos visuais.

---

## 📌 Funcionalidades

- Seleção de **categoria** e **nível de dificuldade**  
- Perguntas carregadas em tempo real via **API OpenTDB**  
- **Cronômetro de 15 segundos** por questão  
- **Feedback visual e sonoro** para respostas corretas e incorretas  
- **Efeitos de partículas animadas** com Canvas API  
- **Pontuação em tempo real** com gráfico interativo via **Chart.js**  
- **Ranking persistente** utilizando `localStorage`  
- Interface responsiva e intuitiva  

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** – Estrutura da aplicação  
- **CSS3** – Estilização e animações  
- **JavaScript (ES6+)** – Lógica e integração com API  
- **Chart.js** – Gráfico de desempenho  
- **Open Trivia Database API** – Fonte de perguntas  
- **Canvas API** – Efeitos visuais (`particle.js`)  

---

## 📂 Estrutura do Projeto

```

Trivia-Game-Show/
├── index.html              # Estrutura principal
├── style.css               # Estilização e layout
├── app.js                  # Lógica do jogo (quiz, ranking, timer, gráfico)
├── particle.js             # Efeitos de partículas
├── sonido-correcto-331225.mp3  # Som de resposta correta
├── wrong-47985.mp3         # Som de resposta incorreta
└── README.md               # Documentação

````

---

## ▶️ Instalação e Execução

1. Clone este repositório:
   ```bash
   git clone https://github.com/josueluis29/Trivia-Game-Show.git
````

2. Acesse o diretório do projeto:

   ```bash
   cd Trivia-Game-Show
   ```

3. Abra o arquivo `index.html` em qualquer navegador moderno.

   * Alternativamente, utilize uma extensão como **Live Server** (VS Code) para rodar localmente.

---

## 🎮 Modo de Uso

1. Escolha uma **categoria** e a **dificuldade** desejada.
2. Clique em **Iniciar Jogo**.
3. Responda às perguntas dentro do limite de **15 segundos**.
4. Acompanhe sua **pontuação e progresso** pelo gráfico.
5. Insira seu nome no final para salvar no **ranking local**.
6. Reinicie e tente superar seu próprio desempenho.

---

## 📊 Ranking

* O ranking é armazenado localmente via `localStorage`.
* São exibidos os **10 melhores jogadores**.
* Reiniciar o jogo não apaga os registros.

---

## 🤝 Contribuição

Contribuições são bem-vindas. Para contribuir:

1. Faça um fork do repositório
2. Crie uma branch para sua feature ou correção:

   ```bash
   git checkout -b minha-feature
   ```
3. Commit suas alterações:

   ```bash
   git commit -m "Adiciona nova funcionalidade"
   ```
4. Envie a branch:

   ```bash
   git push origin minha-feature
   ```
5. Abra um **Pull Request**

---

## 📜 Licença

Este projeto está disponível sob a licença **MIT**.
Sinta-se à vontade para usar, modificar e distribuir conforme necessário.

---

### 👨‍💻 Autor

**Miguel Josué Luís**
📧 Email: [josuluis29@gmail.com](mailto:josuluis29@gmail.com)
🌐 GitHub: [github.com/josueluis29](https://github.com/josueluis29)

```


