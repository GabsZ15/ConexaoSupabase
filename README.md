# Conexão Supabase - React + Vite 🚀

Este projeto é uma aplicação **React** desenvolvida com **Vite** que demonstra a integração com o **Supabase** (Banco de Dados PostgreSQL as a Service) para realizar operações de cadastro e consulta de tabelas relacionais (`produtos`, `empresas` e `funcionarios`).

---

## 📌 Funcionalidades

### 1. 🏢 Gestão de Empresas e Funcionários (`Empresas.jsx`)
- **Consulta Relacional**: Exibição das empresas e seus respectivos funcionários via consulta relacional no Supabase (`select("*, empresas(*)")`).
- **Filtro por Empresa**: Possibilidade de visualizar funcionários de uma empresa específica.
- **Modal de Cadastro**: Janela modal estilizada com fundo fosco (*backdrop-blur*) para inserção de novos funcionários com seleção de cargo (Administrador ou Usuário Comum).
- **Alternância de Telas**: Alternância suave entre a listagem de empresas e de funcionários.

### 2. 📦 Gestão de Produtos (`App.jsx`)
- **Cadastro de Produtos**: Formulário para inserção de nome, preço, tamanho e descrição opcional na tabela `produtos`.
- **Listagem em Cards**: Exibição dos produtos cadastrados em cartões organizados e estilizados em grid.

### 3. 🎨 Estilização Global e Navegação
- **Menu de Navegação Superior**: Alterne facilmente no topo entre as telas de *Empresas & Funcionários* e *Produtos*.
- **CSS Moderno**: Interface elegante com CSS3 puro, suporte a modo focado em inputs, modal responsivo, tabelas estilizadas com zebrado e cards de produtos.
- **Compatibilidade Total**: Todos os estilos (`Empresas.css` e `App.css`) estão totalmente funcionais em todas as páginas da aplicação.

---

## 🛠️ Tecnologias Utilizadas

- **[React](https://react.dev/)**: Biblioteca JavaScript para criação de interfaces.
- **[Vite](https://vitejs.dev/)**: Ferramenta de build ultrarrápida.
- **[Supabase JS Client](https://supabase.com/docs/reference/javascript)**: Cliente oficial para integração com o banco Supabase.
- **CSS3**: Estilização moderna com Flexbox, CSS Grid e efeitos visuais.

---

## 📁 Estrutura do Projeto

```
ConexaoSupabase/
├── public/
├── src/
│   ├── assets/
│   ├── App.css          # Estilos do componente App (Produtos)
│   ├── App.jsx          # Componente de Gestão de Produtos
│   ├── Empresas.css     # Estilos do componente Empresas e Modal
│   ├── Empresas.jsx     # Componente de Empresas e Funcionários
│   ├── main.jsx         # Ponto de entrada com a barra de navegação principal
│   └── supabase.js      # Configuração da conexão com o Supabase
├── index.html
├── package.json
├── vite.config.js
└── README.md            # Documentação completa do projeto
```

---

## ⚙️ Como Executar o Projeto

### Pré-requisitos
- **Node.js** (versão 18 ou superior) instalado.

### Passo a Passo

1. **Acessar a pasta do projeto:**
   ```bash
   cd ConexaoSupabase
   ```

2. **Instalar as dependências:**
   ```bash
   npm install
   ```

3. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acessar no navegador:**
   Abra o endereço gerado pelo Vite (normalmente `http://localhost:5173`).

---

## 🗄️ Estrutura do Banco de Dados (Supabase)

Para o correto funcionamento da aplicação no Supabase, certifique-se de possuir as tabelas abaixo criadas:

### Tabela `produtos`
- `id` (int8, chave primária)
- `nome` (text)
- `preco` (numeric / text)
- `tamanho` (text)
- `descricao` (text, opcional)

### Tabela `empresas`
- `id` (int8, chave primária)
- `nome` (text)
- `cnpj` (text)
- `endereco` (text)

### Tabela `funcionarios`
- `id` (int8, chave primária)
- `nome` (text)
- `contato` (text)
- `cargo` (int4 - `0` para Administrador, `1` para Usuário Comum)
- `id_empresa` (int8, Chave Estrangeira referenciando `empresas.id`)

---

## 📝 Licença

Projeto desenvolvido para fins de aprendizado e práticas de integração React + Supabase.
