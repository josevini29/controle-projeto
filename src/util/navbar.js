import React from 'react';
import * as firebase from 'firebase';

const NavBar = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-fixed-top">
        <a className="navbar-brand" href="/">Controle de Alterações</a>
        <div className="collapse navbar-collapse my-2 my-lg-0 d-flex flex-row-reverse" id="navbarSupportedContent">
            <button className="btn btn-outline-primary my-2 my-sm-0" onClick={handleSignOut}>Sair <i className="fas fa-sign-out-alt"></i></button>
        </div>
    </nav >
);

const handleSignOut = () => {
    firebase.auth().signOut()
        .then((response) => {
            window.location.href = "/login";
        }).catch((error) => {
            console.log(error.code, error.message);
        });
}

export default NavBar;