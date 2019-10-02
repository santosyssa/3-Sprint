import React from 'react';
import '../../assets/css/style.css';


  
componentDidMount()

mudarCep = (event) =>{
  this.setState({cep: event.target.value})
}

listarInformacoes = (event) =>{
  event.preventDefault();

  fetch('https://viacep.com.br/ws/' + this.state.cep + "/json/")
  .then(response => response.json())
  .then(data => {this.setState({
                  cep: data.cep,
                  logradouro: data.logradouro,
                  complemento: data.complemento,
                  bairro: data.bairro,
                  localidade: data.localidade,
                  uf: data.uf
                })
                console.log(this.state)
              }
        )
}

render() {
  return (
  <div className="App">
      <div className="row">
      <div className="col-55">
          <div className="container">
              <form onSubmit={this.listarInformacoes}> 
                  <div className="border">
                      <div className="row">
                          <div className="col-30">

                              <h3>Digite seus dados</h3>

                              <label htmlFor="fname"><i className="fa fa-user"></i> Cep</label>
                              <input arial-label="cep" type="text" id="cep" name="cep" onChange={this.mudarCep} value={this.state.cep}/>

                              <label htmlFor="logradouro"><i className="fa fa-envelope"></i> Logradouro</label>
                              <input type="text" id="logradouro" name="logradouro" disabled readyonly="true" defaultValue={this.state.logradouro}
                                  />

                              <label htmlFor="adr"><i className="fa fa-address-card-o"></i> Complemento</label>
                              <input type="text" id="complemento" name="complemento" disabled readyonly="true" defaultValue={this.state.complemento}/>

                              <label htmlFor="city"><i className="fa fa-institution"></i> Bairro</label>
                              <input type="text" id="bairro" name="bairro" readyonly="true" disabled defaultValue={this.state.bairro}/>

                              <label htmlFor="city"><i className="fa fa-institution"></i> Localidade</label>
                              <input type="text" id="localidade" name="localidade" disabled readyonly="true" defaultValue={this.state.localidade}/>

                              <label htmlFor="city"><i className="fa fa-institution"></i> Uf</label>
                              <input type="text" id="uf" name="uf" readyonly="true" disabled defaultValue={this.state.uf} />

                          </div>
                      </div>
                  </div>
                  <input type="submit" value="Enviar" className="btn" id="cadastro" />
              </form> 
          </div>
      </div>
  </div>
</div>
);
}

}
export default Enderecos;
