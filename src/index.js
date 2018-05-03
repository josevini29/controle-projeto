import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as firebase from 'firebase';

import Main from './view/main/main';
import Project from './view/project/project'
import Task from './view/task/task'
import NotFound from './view/others/404'
import NotEnvironment from './view/others/notEnvironment'

var config = '';

if (document.domain === 'controle-projeto.firebaseapp.com') { //Production
    config = {
        apiKey: "AIzaSyAJxpRDLVWccg7bjI6II_ZybaV-_cvIsIc",
        authDomain: "controle-projeto.firebaseapp.com",
        databaseURL: "https://controle-projeto.firebaseio.com",
        projectId: "controle-projeto",
        storageBucket: "controle-projeto.appspot.com",
        messagingSenderId: "793685034348"
    };
} else if (document.domain === 'controle-projeto-des.firebaseapp.com' || document.domain === 'localhost') { //development
    config = {
        apiKey: "AIzaSyAK4nntcA3R5NNxGn6woYkl7F5yiyHLDLo",
        authDomain: "controle-projeto-des.firebaseapp.com",
        databaseURL: "https://controle-projeto-des.firebaseio.com",
        projectId: "controle-projeto-des",
        storageBucket: "controle-projeto-des.appspot.com",
        messagingSenderId: "552342174558"
    };
    console.log('Development environment...');
}

if (config !== "") {
    firebase.initializeApp(config);

    ReactDOM.render(
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Main} exact />
                <Route path="/project/:projectId" component={Project} />
                <Route path="/task/:projectId/:taskId" component={Task} />
                <Route path='*' component={NotFound} />
            </Switch>
        </ BrowserRouter>
        , document.getElementById('root'));
    registerServiceWorker();

} else {
    ReactDOM.render(<NotEnvironment />, document.getElementById('root'));
    registerServiceWorker();
}