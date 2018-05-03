import React, { Component } from 'react';
import * as firebase from 'firebase';
import specialCharacters from "escape-unescape";

import { formatDateJSONtoBR } from '../../util/date';
import { isPropried, getTaskStatus } from '../../util/libObject';

class ModalComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nmComponent: '',
            dsCode: '',
        };

        this.setValues();
    }

    componentDidUpdate() {
        this.setValues();
    }

    setValues() {
        if (this.props.component !== this.state.nmComponent) {
            let code = this.props.code;
            code = specialCharacters.unescape(code);

            this.setState({
                nmComponent: this.props.component,
                dsCode: code,
            });
            if (this.props.component === '') {
                this.setState({
                    dsCode: '',
                });
            }
        }
    }

    handleSave() {
        let code = this.state.dsCode;
        code = specialCharacters.escape(code);

        var db = firebase.database();
        var ref = db.ref(`user/RDfOBwn0IBTetKL2kVwep2zrSRm2/project/${this.props.projectId}/task/${this.props.taskId}/component/${this.props.component}`)
        ref.child('code').set(code);
    }

    render() {
        return (
            <div className="modal fade" id="ModalComponent" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">Componente</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-4 m-1">
                                    <input
                                        type="email"
                                        className="form-control text-uppercase"
                                        placeholder="Componente"
                                        value={this.state.nmComponent}
                                        onChange={(evt) => this.setState({ nmComponent: evt.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 m-1">
                                    <textarea
                                        className="form-control"
                                        rows="25"
                                        placeholder="Cole o código fonte alterado..."
                                        value={this.state.dsCode}
                                        onChange={(evt) => this.setState({ dsCode: evt.target.value })}
                                    >
                                    </textarea>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.handleSave()}>Salvar</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalComponent;
