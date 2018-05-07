import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom'

import { formatDateJSONtoBR } from '../../util/date';
import { isPropried, getTaskStatus } from '../../util/libObject';

class Project extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectId: '',
            name: '',
            description: '',
            dateModification: '',
            status: '',
            tasks: [],
        };
    }

    componentWillMount() {
        var db = firebase.database();
        var ref = db.ref(`user/0SB26bRlqVRaLTNrqzRNBg0JaDQ2/project/${this.props.match.params.projectId}`);

        ref.on("value", (snapshot) => {
            const response = snapshot.val();
            let taskArray = [];
            for (const taskRes in response.task) {
                if (isPropried(response, "task")) {
                    const qtComponent = isPropried(response.task[taskRes], "component") ? Object.keys(response.task[taskRes].component).length : 0;
                    const task = {
                        taskId: taskRes,
                        description: response.task[taskRes].description,
                        dateModification: response.task[taskRes].dt_modification,
                        status: response.task[taskRes].status,
                        qtComponent: qtComponent,
                    }
                    taskArray.push(task);
                }
            }
            this.setState({
                projectId: this.props.match.params.projectId,
                name: response.name,
                description: response.description,
                dateModification: response.dt_modification,
                status: response.status,
                tasks: taskArray,
            });
        }, (errorObject) => {
            alert("The read failed: " + errorObject.code);
        });
    }

    render() {
        return (
            <div>
                <div className="container-fluid">
                    <h4 className="m-3 text-center">Projeto: {this.state.projectId} - {this.state.name}</h4>
                    <div className="breadcrumb" style={style.lineSeparator}></div>
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-12 table-responsive">
                            <table className="table table-striped table-dark table-hover">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Tarefa</th>
                                        <th className="text-center" scope="col">Total Componentes</th>
                                        <th className="text-center" scope="col">Status</th>
                                        <th className="text-center" scope="col">Data Criação</th>
                                        <th className="text-center" scope="col">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.tasks.map(task => (
                                        <tr key={task.taskId}>
                                            <th scope="row">{task.taskId}</th>
                                            <td>{task.description}</td>
                                            <td className="text-center">{task.qtComponent}</td>
                                            <td className="text-center">{getTaskStatus(task.status)}</td>
                                            <td className="text-center">{formatDateJSONtoBR(task.dateModification)}</td>
                                            <td className="text-center">
                                                <Link
                                                    className="btn btn-primary"
                                                    style={style.btnAction}
                                                    to={{ pathname: `/task/${this.state.projectId}/${task.taskId}` }}><i class="fa fa-code"></i> Alterações
                                                </Link>
                                                <button style={style.btnAction} className="btn btn-danger"><i className="fa fa-trash-alt"></i> Excluir</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const style = {
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

export default Project;
