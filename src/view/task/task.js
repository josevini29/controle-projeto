import React, { Component } from 'react';
import * as firebase from 'firebase';
import renderHTML from 'react-render-html';

import NavBar from '../../util/navbar';
import { isPropried } from '../../util/libObject';
import ModalComponent from './ModalComponent';

class Task extends Component {

    constructor(props) {
        super(props);
        this.state = {
            taskId: '',
            description: '',
            dateModification: '',
            status: '',
            components: [],
            componentEdit: '',
            codeEdit: '',
        };
    }

    componentWillMount() {
        var db = firebase.database();
        var ref = db.ref(`user/0SB26bRlqVRaLTNrqzRNBg0JaDQ2/project/${this.props.match.params.projectId}/task/${this.props.match.params.taskId}`);

        ref.on("value", (snapshot) => {
            const response = snapshot.val();
            let componentArray = [];
            for (const componentRes in response.component) {
                if (isPropried(response, "component")) {
                    const component = {
                        component: componentRes,
                        code: response.component[componentRes].code,
                        description: response.component[componentRes].description,
                        dateModification: response.component[componentRes].dt_modification,
                        status: response.component[componentRes].status,
                    }
                    componentArray.push(component);
                }
            }
            this.setState({
                taskId: this.props.match.params.taskId,
                description: response.description,
                dateModification: response.dt_modification,
                status: response.status,
                components: componentArray,
            });
        }, (errorObject) => {
            alert("The read failed: " + errorObject.code);
        });
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="container-fluid">
                    <h4 className="m-3 text-center">Tarefa: {this.state.taskId} - {this.state.description}</h4>
                    <div className="breadcrumb" style={style.lineSeparator}></div>
                    <div className="row">
                        <div className="col-md-2">
                            <h4>Componentes</h4>
                            <div className="list-group" id="list-tab" role="tablist">
                                {this.state.components.map((component, index) => (
                                    <a
                                        key={component.component}
                                        className={`list-group-item list-group-item-action ${index === 0 ? 'active' : ''}`}
                                        id={`list-${component.component}`}
                                        data-toggle="list"
                                        href={`#list-${component.component}-code`}
                                        role="tab"
                                        aria-controls="home">
                                        {component.component}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="col-md-10">
                            <h4>Código alterado:</h4>
                            <div className="tab-content" id="nav-tabContent">
                                {this.state.components.map((component, index) => (
                                    <div
                                        key={component.component}
                                        className={`tab-pane fade ${index === 0 ? 'show active' : ''}`}
                                        id={`list-${component.component}-code`}
                                        role="tabpanel"
                                        aria-labelledby={`list-${component.component}`}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="d-flex flex-row-reverse my-2">
                                                    <button
                                                        style={style.btnAction}
                                                        className="btn btn-warning"
                                                        data-toggle="modal"
                                                        data-target="#ModalComponent"
                                                        onClick={() => {
                                                            this.setState({
                                                                componentEdit: component.component,
                                                                codeEdit: component.code,
                                                            });
                                                        }}>
                                                        <i className="fa fa-pencil-alt"></i> Editar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 border p-2" style={style.divCode}>
                                                {renderHTML(`<pre><code>${component.code}<code><pre>`)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <ModalComponent
                    projectId={this.props.match.params.projectId}
                    taskId={this.props.match.params.taskId}
                    component={this.state.componentEdit}
                    code={this.state.codeEdit}
                />
            </div>
        );
    }
}

const style = {
    divCode: {
        backgroundColor: '#EFEFEF'
    },
    lineSeparator: {
        height: '1px',
        padding: '0px',
        backgroundColor: '#000'
    },
    btnAction: {
        marginLeft: '1rem',
        float: 'center'
    },
}

export default Task;
