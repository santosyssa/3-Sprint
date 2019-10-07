import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//pages
import App from './pages/Home/App';
import Categorias from './pages/Categorias/Categorias';
import Eventos from './pages/Eventos/Eventos';
import Contatos from './pages/Contatos/Contatos';
import Login from './pages/Login/Login';
import NaoEncontrado from './pages/NaoEncontrado/NaoEncontrado';

//routes
import {Route, Link, BrowserRouter as Router, Switch, Redirect} from "react-router-dom";

import * as serviceWorker from './serviceWorker';

const RotaPrivada = ({component: Component}) =>(
    <Router
        render={ props=>
            localStorage.getItem("usuario-gufos") !== null ?
            (
                <Component {...props}/>
            ): (
                <Redirect 
                    to={{pathname: "/login", state: {from: props.location}}}
                />
            )
        }
    
   />
)

const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path='/' component={App}/>
                <Route path='/categorias' component={Categorias}/>
                <Route path='/eventos' component={Eventos}/>
                {/* <Route path='/contatos' component={Contatos}/> */}
                <Route path='/login'component={Login}/>
                <Route component={NaoEncontrado}/>
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(routing , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
