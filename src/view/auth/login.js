import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import FloatingMessage from '../components/floatingMessage';

//const LogoProject = require('../../img/project.png');

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

    handleSubmit = (event) => {
        event.preventDefault();

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
            <Grid container style={style.body} spacing={12}>
                <div style={style.divForm}>
                    <form onSubmit={this.handleSubmit} style={style.form}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={style.gridItem}>
                            <TextField
                                required
                                autoFocus
                                margin="dense"
                                label="E-mail"
                                type="email"
                                fullWidth
                                value={this.state.email}
                                onChange={(event) => this.setState({ email: event.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={style.gridItem}>
                            <TextField
                                required
                                margin="dense"
                                label="Senha"
                                type="password"
                                fullWidth
                                value={this.state.password}
                                onChange={(event) => this.setState({ password: event.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={style.gridButton}>
                            <Button variant="raised" color="primary" type="submit" fullWidth>
                                Entrar
                        </Button>
                            {this.state.cdMessage !== 0 ?
                                <FloatingMessage message={message[this.state.cdMessage].message} />
                                : null
                            }
                        </Grid>
                    </form>
                </div>
            </Grid>
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
        justifyContent: 'center',
    },
    form: {
        width: '350px',
    },
    divForm: {
        backgroundColor: '#FFF',
        height: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        MsFlexAlign: 'center',
        padding: '10px',
    },
    gridItem: {
        margin: '10px',
    },
    gridButton: {
        margin: '10px',
        marginTop: '30px',
    }
}

const message = {
    1: { message: 'E-mail é inválido.' },
    2: { message: 'Senha é inválida.' },
    3: { message: 'E-mail é obrigatório.' },
    4: { message: 'Senha é obrigatória.' },
    5: { message: 'Login ou senha incorretos.' },
}

export default Login;
