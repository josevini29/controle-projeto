import React, { Fragment } from 'react';
import * as firebase from 'firebase';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';

import { getDateNowJSON, formatDateJSONtoBR } from '../../util/date';

export default class RegisterProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inOpen: false,
            inEdit: false,
            cdProject: '',
            nmProject: '',
            goalProject: '',
            statusProject: 1,
            dateModification: '',
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            inOpen: nextProps.inOpen,
            cdProject: nextProps.project.cdProject,
            nmProject: nextProps.project.nmProject,
            goalProject: nextProps.project.goalProject,
            dateModification: nextProps.project.dtModification,
            inEdit: nextProps.project.cdProject !== '' ? true : false
        });
    }

    handleClose = () => {
        this.props.onClose();
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const project = {
            name: this.state.nmProject,
            description: this.state.goalProject,
            status: this.state.statusProject,
            dt_modification: getDateNowJSON(),
        }

        var db = firebase.database();
        var ref = db.ref(`user/0SB26bRlqVRaLTNrqzRNBg0JaDQ2`)
        ref.child('project').child(this.state.cdProject).update(project);

        this.props.onClose();
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.inOpen}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <form onSubmit={this.handleSubmit}>
                        <DialogTitle id="form-dialog-title">Cadastro de Projeto</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Digite as informações do projeto.
                            </DialogContentText>
                            <Grid container >
                                <Grid item xs={12} sm={3} md={3} lg={3} xl={3} style={{ padding: 5 }}>
                                    <TextField
                                        disabled={this.state.inEdit}
                                        required
                                        autoFocus
                                        margin="dense"
                                        label="Código Projeto"
                                        type="number"
                                        fullWidth
                                        value={this.state.cdProject}
                                        onChange={(event) => this.setState({ cdProject: event.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={9} md={9} lg={9} xl={9} style={{ padding: 5 }}>
                                    <TextField
                                        required
                                        margin="dense"
                                        label="Nome Projeto"
                                        type="text"
                                        fullWidth
                                        value={this.state.nmProject}
                                        onChange={(event) => this.setState({ nmProject: event.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ padding: 5 }}>
                                    <TextField
                                        required
                                        margin="dense"
                                        label="Ojetivo Projeto"
                                        type="text"
                                        fullWidth
                                        multiline
                                        value={this.state.goalProject}
                                        onChange={(event) => this.setState({ goalProject: event.target.value })}
                                    />
                                </Grid>
                                {this.state.inEdit ?
                                    <Fragment>
                                        <Grid item xs={12} sm={3} md={3} lg={3} xl={3} style={{ padding: 5 }}>
                                            <TextField
                                                select
                                                required
                                                label="Status"
                                                value={this.state.statusProject}
                                                onChange={(event) => this.setState({ statusProject: event.target.value })}
                                                margin="dense"
                                            >
                                                {[{ value: 1, label: 'Pendente' }, { value: 2, label: 'Implantado' }].map(option => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} sm={9} md={9} lg={9} xl={9} style={{ padding: 5 }}>
                                            <TextField
                                                required
                                                disabled
                                                margin="dense"
                                                label="Data Últ. Alteração"
                                                type="text"
                                                fullWidth
                                                value={formatDateJSONtoBR(this.state.dateModification)}
                                            />
                                        </Grid>
                                    </Fragment>
                                    : null}
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancelar
                            </Button>
                            <Button color="primary" type="submit">
                                Salvar
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    }
}
