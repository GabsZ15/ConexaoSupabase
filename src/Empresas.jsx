import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import './Empresas.css';

function Empresas() {

    const [empresas, altereEmpresas] = useState([]);
    const [funcionarios, alteraFuncionarios] = useState([]);

    const [exibeFuncionarios, alteraExibeFuncionarios] = useState(false);
    const [exibeEmpresas, alteraExibeEmpresas] = useState(true);

    const [exibemodal, alteraExibeModal] = useState(false);

    const [nome, alteraNome] = useState("")
    const [contato, alteraContato] = useState("")
    const [cargo, alteraCargo] = useState("1")
    const [idEmpresa, alteraIdEmpresa] = useState("0")


    async function inserirFuncionario() {
        const obj = {
            id_empresa: parseInt(idEmpresa),
            nome: nome,
            cargo: parseInt(cargo),
            contato: contato,
        }
        const { error} = await supabase.from("funcionarios").insert(obj);
        if (error == null){
            alert("Funcionário cadastrado com sucesso")
            alteraExibeModal(false)
            buscaFuncionariosPorEmpresa(idEmpresa)
        }else{
            alert("Erro ao cadastrar funcionário. Entre em contato com o suporte técnico")
            console.log(error)
        }
    }


    async function buscatodasEmpresas() {
        const { error, data } = await supabase.from("empresas").select();
        console.log(data);
        altereEmpresas(data);
    }

    async function buscatodosFuncionarios() {
        const { error, data } = await supabase.from("funcionarios").select("*, empresas(*)");
        console.log(data);
        alteraFuncionarios(data);
    }

    async function buscaFuncionariosPorEmpresa(id_empresa) {
        const { error, data } = await supabase.from("funcionarios").select("*, empresas(*)").eq("id_empresa", id_empresa);
        console.log(data);
        alteraIdEmpresa(id_empresa);
        alteraFuncionarios(data);
    }

    function alternaVisualizacao() {
        if (exibeEmpresas === true) {
            alteraExibeEmpresas(false);
            alteraExibeFuncionarios(true);
        } else {
            alteraExibeEmpresas(true);
            alteraExibeFuncionarios(false);
        }
    }

    useEffect(() => {
        buscatodasEmpresas();
        buscatodosFuncionarios();
    }, []);

    return (
        <div>

            {exibemodal === true ? (
                <div>
                    <div className="fundopreto" onClick={() => alteraExibeModal(false)}></div>
                    <div className="modal">
                        <h2>Novo funcionário</h2>
                        <input onChange={(e) => alteraNome(e.target.value)} placeholder="Nome" />
                        <input onChange={(e) => alteraContato(e.target.value)} placeholder="Contato" />
                        <select onChange={(e) => alteraCargo(e.target.value)} >
                            <option value={1}>Funcionário Comum</option>
                            <option value={0}>Administrador</option>
                        </select>
                        <button onClick={inserirFuncionario}>Salvar</button>
                        <button className="btn-fechar" onClick={() => alteraExibeModal(false)}>Cancelar</button>
                    </div>
                </div>
            ) : (
                <></>
            )}

            <h1>Relacionamento de Tabelas</h1>
            <p>Consulta na tabela empresas e funcionários</p>
            <hr />

            {exibeEmpresas === true ? (
                <div>
                    <h2>Empresas</h2>

                    <table border="true">
                        <thead>
                            <tr>
                                <td><strong>ID:</strong></td>
                                <td><strong>Nome:</strong></td>
                                <td><strong>CNPJ:</strong></td>
                                <td><strong>Endereço:</strong></td>
                                <td><strong>Ações</strong></td>
                            </tr>
                        </thead>
                        <tbody>
                            {empresas.map(i => (
                                <tr key={i.id}>
                                    <td> {i.id} </td>
                                    <td> {i.nome} </td>
                                    <td> {i.cnpj} </td>
                                    <td> {i.endereco} </td>
                                    <td><button onClick={() => { buscaFuncionariosPorEmpresa(i.id); alternaVisualizacao() } }>Ver funcionários</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <></>
            )}

            <hr />

            {exibeFuncionarios === true ? (
                <div>
                    <h2>Funcionários</h2>
                    <div className="botoes-topo">
                        <button onClick={() => { alternaVisualizacao(); alteraIdEmpresa("") }}>Voltar</button>
                        <button className="btn-cadastrar" onClick={() => alteraExibeModal(true)}>Cadastrar Funcionário</button>
                    </div>

                    <table border="true">
                        <thead>
                            <tr>
                                <td><strong>ID:</strong></td>
                                <td><strong>Nome:</strong></td>
                                <td><strong>Nome da Empresa:</strong></td>
                                <td><strong>Endereço da Empresa:</strong></td>
                                <td><strong>Cargo:</strong></td>
                                <td><strong>Contato:</strong></td>
                            </tr>
                        </thead>
                        <tbody>
                            {funcionarios.map(i => (
                                <tr key={i.id}>
                                    <td> {i.id} </td>
                                    <td> {i.nome} </td>
                                    <td> {i.empresas?.nome} </td>
                                    <td> {i.empresas?.endereco}</td>
                                    <td><strong> {i.cargo === 0 ? "Administrador" : "Usuário comum"} </strong></td>
                                    <td><strong> {i.contato} </strong></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <></>
            )}

        </div>
    );
}

export default Empresas;