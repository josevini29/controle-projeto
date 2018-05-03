import React from 'react';
import { Link } from 'react-router-dom'


const CardProject = (props) => (
    <div className="card m-1">
        <div className="card-body shadow p-3" style={style.divCard}>
            <h5 className="card-title">Proj: {props.project.projectId} - {props.project.name}</h5>
            <p className="card-text">{props.project.description}</p>
            <div className="d-flex flex-row-reverse">
                <Link
                    className="btn btn-primary m-1"
                    to={{ pathname: `/project/${props.project.projectId}` }}><i className="fa fa-clipboard-list"></i> Tarefas
                 </Link>
                <button className="btn btn-danger m-1"><i className="fa fa-trash-alt"></i> Excluir</button>
                <button className="btn btn-success m-1"><i className="fa fa-check"></i> Implantar</button>
            </div>
        </div>
    </div>
);

const style = {
    divCard: {
        backgroundColor: '#444444',
        color: '#FFF',
    }
};

export default CardProject;