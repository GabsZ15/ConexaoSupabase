import { useEffect, useState } from "react";
import { supabase } from "./supabase.js";
import "./App.css";

function App() {

    const [produtos, alteraProdutos] = useState([]);

    const [nome, alteraNome] = useState("");
    const [preco, alteraPreco] = useState("");
    const [tamanho, alteraTamanho] = useState("");
    const [descricao, alteraDescricao] = useState("");

    async function inserir() {
        if (!nome.trim() || !preco.trim()) {
            alert("Por favor, preencha pelo menos o nome e o preço do produto.");
            return;
        }

        const obj = {
            nome: nome,
            preco: preco,
            tamanho: tamanho,
            descricao: descricao
        };
        const { data, error } = await supabase.from('produtos').insert(obj);
        if (error) {
            console.error("Erro ao inserir produto:", error);
        } else {
            alteraNome("");
            alteraPreco("");
            alteraTamanho("");
            alteraDescricao("");
            buscaTodos();
        }
    }

    async function buscaTodos() {
        const { data, error } = await supabase.from('produtos').select();
        if (error) {
            console.error("Erro ao buscar produtos:", error);
        } else {
            console.log(data);
            alteraProdutos(data || []);
        }
    }

    useEffect(() => {
        buscaTodos();
    }, []);

    return (
        <div>
            <h1>Conexão com Supabase</h1>
            <p>Cadastro e listagem de produtos na tabela 'produtos'</p>
            <hr />

            <div className="form-container">
                <h2>Cadastrar Produto</h2>
                <input 
                    value={nome} 
                    onChange={e => alteraNome(e.target.value)} 
                    placeholder="Nome do Produto..." 
                />
                <br />
                <input 
                    value={preco} 
                    onChange={e => alteraPreco(e.target.value)} 
                    placeholder="Preço..." 
                />
                <br />
                <input 
                    value={tamanho} 
                    onChange={e => alteraTamanho(e.target.value)} 
                    placeholder="Tamanho..." 
                />
                <br />
                <input 
                    value={descricao} 
                    onChange={e => alteraDescricao(e.target.value)} 
                    placeholder="Descrição(opcional)..." 
                />
                <br />

                <button onClick={inserir}>Salvar Produto</button>
            </div>

            <hr />

            <h2>Produtos Cadastrados</h2>
            
            {produtos.length === 0 ? (
                <p className="sem-registros">Nenhum produto cadastrado ainda.</p>
            ) : (
                <div className="lista-produtos">
                    {produtos.map((i, index) => (
                        <div key={i.id || index} className="card-produto">
                            <h3>{i.nome}</h3>
                            <p className="preco-tamanho">
                                <strong>Preço:</strong> R$ {i.preco} 
                                {i.tamanho && <span> | <strong>Tamanho:</strong> {i.tamanho}</span>}
                            </p>
                            {i.descricao && (
                                <p className="descricao-card">
                                    <strong>Descrição:</strong> {i.descricao}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
