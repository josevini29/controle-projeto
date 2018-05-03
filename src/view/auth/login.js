import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Redirect } from 'react-router-dom';

const LogoProject = require('../../img/project.png');

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            cdMessage: 0,
            inSign: false,
        };
    }

    componentWillMount() {

    }

    handleSignIn(event) {
        const { email, password } = this.state;
        if (email === '') {
            this.setState({ cdMessage: 3 });
            return;
        }
        if (password === '') {
            this.setState({ cdMessage: 4 });
            return;
        }

        this.setState({ cdMessage: 0 });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((response) => {
                this.setState({ inSign: true });
            }).catch((error) => {
                console.log(error.code, error.message);
                this.setState({ cdMessage: 5 });
            });
    }

    render() {
        if (this.state.inSign) {
            return <Redirect to="/" />;
        }

        return (
            <div style={style.body}>
                <div className="col-md-3">
                    <div className="form-signin">
                        <div className="text-center mb-3">
                            <img className="mb-4" src={LogoProject} alt="Controle de Projeto" width="72" height="72" />
                            <h1 className="h3 mb-3 font-weight-normal">Controle Alterações</h1>
                        </div>

                        <div className="form-label-group my-3">
                            <input value={this.state.email} onChange={(evt) => this.setState({ email: evt.target.value })} type="email" id="inputEmail" className="form-control" placeholder="E-mail" required />
                        </div>

                        <div className="form-label-group my-3">
                            <input value={this.state.password} onChange={(evt) => this.setState({ password: evt.target.value })} type="password" id="inputPassword" className="form-control" placeholder="Senha" required />
                        </div>

                        <div className="checkbox mb-3">
                            <label>
                                <input type="checkbox" value="remember-me" /> Lembrar-me?
                            </label>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block" onClick={() => this.handleSignIn()}>Entrar</button>
                        <p className="mt-5 mb-3 text-muted text-center">&copy; 2018-2019</p>
                    </div>
                    {this.state.cdMessage !== 0 ?
                        <div className="alert alert-danger" role="alert">
                            {message[this.state.cdMessage].message}
                        </div>
                        : null
                    }
                </div>
            </div>
        );
    }
}

const style = {
    body: {
        height: '100vh',
        display: 'flex',
        MsFlexAlign: 'center',
        alignItems: 'center',
        paddingTop: '40px',
        paddingBottom: '40px',
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
    },
}

const message = {
    1: { message: 'E-mail é inválido.' },
    2: { message: 'Senha é inválida.' },
    3: { message: 'E-mail é obrigatório.' },
    4: { message: 'Senha é obrigatória.' },
    5: { message: 'Login ou senha incorretos.' },
}

export default Login;
