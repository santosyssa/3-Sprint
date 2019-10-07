import React, { Component } from "react";

import logo from '../../assets/img/icon-login.png';
import Rodape from '../../components/Rodape';
import Axios from 'axios';
import Titulo from '../../components/Titulo';

export default class Eventos extends Component {

    constructor() {
        super();
        this.state = {
            listaE: [],
            idCategoriaNavigation: [],

            titulo: "",
            localizacao: "",
            data: "",
            ativo: "",
            idCategoria: "",
            descricao: ""
        }
    }

    componentDidMount() {
        this.listarEventos();
        this.listarCategorias();
    }

    listarEventos = () => {
        // event.preventDefault();

        Axios.get('http://192.168.7.85:5000/api/eventos')
            .then(response => {
               this.setState({ listaE: response.data })
            })
    }

    listarCategorias = () => {
        Axios.get('http://192.168.7.85:5000/api/categorias')
            .then(response => {
                // console.log(response.data)

                this.setState({ idCategoriaNavigation: response.data })
            })
    }

    cadastrarEvento = (event) => {
        event.preventDefault();
        console.log(this.state);

        fetch('http://192.168.7.85:5000/api/eventos', {
            method: "POST",
            body: JSON.stringify({
                    titulo: this.state.titulo,
                    descricao:this.state.descricao,
                    dataEvento: this.state.data,
                    ativo: this.state.ativo,
                    localizacao: this.state.localizacao,
                    idCategoria: this.state.idCategoria
            }),

                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(respose => this.listarEventos())
                .catch(error => console.log(error))
        }


    tituloEvento = (event) => {
        this.setState({ titulo: event.target.value });
    }

    localizacaoEvento = (event) => {
        this.setState({ localizacao: event.target.value });
    }

    dataEvento = (event) => {
        this.setState({ data: event.target.value });
    }

    ativoEvento = (event) => {
        if (event.target.value === "true") {
            this.setState({ ativo: true });

        } else {
            this.setState({ ativo: false });

        }
    }

    categoriaEvento = (event) => {
        // console.log(event.target.value)
        this.setState({ idCategoria: Number(event.target.value) });
        // console.log(this.state)
    }

    descricaoEvento = (event) => {
        this.setState({ descricao: event.target.value });
    }

    render() {
        return (
            <div>
                <header className="cabecalhoPrincipal">
                    <div className="container">
                        <img src={logo} />

                        <nav className="cabecalhoPrincipal-nav">
                            Administrador
                        </nav>
                    </div>
                </header>

                <main className="conteudoPrincipal">
                    <section className="conteudoPrincipal-cadastro">
                        {/* <h1 className="conteudoPrincipal-cadastro-titulo">Eventos</h1> */}
                        <Titulo titulo="Eventos" />
                        <div className="container" id="conteudoPrincipal-lista">

                            <table id="tabela-lista">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Evento</th>
                                        <th>Data</th>
                                        <th>Acesso Livre</th>
                                        <th>Tipo do Evento</th>
                                    </tr>
                                </thead>

                                <tbody id="tabela-lista-corpo">
                                    {this.state.listaE.map(element => {
                                        console.log(element.idCategoriaNavigation)
                                        return (
                                            <tr key={element.idEvento}>
                                                <td>{element.idEvento}</td>
                                                <td>{element.titulo}</td>
                                                <td>{element.dataEvento}</td>
                                                <td>{(element.ativo) ? 'sim' : 'não'}</td>
                                                <td>{element.idCategoriaNavigation === undefined ? "vázio" : element.idCategoriaNavigation.nome}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>

                        </div>

                        <div className="container" id="conteudoPrincipal-cadastro" >
                            <h2 className="conteudoPrincipal-cadastro-titulo">Cadastrar Evento</h2>
                            <div className="container">

                                <input type="text" id="evento__titulo" placeholder="título do evento" value={this.state.titulo} onChange={this.tituloEvento} />

                                <input type="text" id="evento__localizacao" placeholder="localização" value={this.state.localizacao} onChange={this.localizacaoEvento} />

                                <input type="date" id="evento__data" placeholder="dd/MM/yyyy" value={this.state.data} onChange={this.dataEvento} />

                                <select id="option__acessolivre" onChange={this.ativoEvento}>
                                    <option value="null">Selecione</option>
                                    <option value="true">Ativo</option>
                                    <option value="false">Desativo</option>
                                </select>

                                <select id="option__tipoevento" onChange={this.categoriaEvento}>
                                    {this.state.idCategoriaNavigation.map(element => {
                                        return (
                                            <option value={element.idCategoria} key={element.idCategoria}>{element.nome}</option>
                                        )
                                    })}
                                </select>
                                <textarea rows="3" cols="50" placeholder="descrição do evento" id="evento__descricao" value={this.state.descricao} onChange={this.descricaoEvento}>
                                </textarea >

                            </div>
                            <button className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro" onClick={this.cadastrarEvento}>Cadastrar</button>

                        </div>

                    </section>
                </main>
                <Rodape />
            </div>
        )
    }
}