import React from 'react';
import { Link } from 'react-router-dom'
import * as firebase from 'firebase';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Delete from '@material-ui/icons/Delete';
import Create from '@material-ui/icons/Create';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';

import DialogConfirm from '../../components/DialogConfirm';

class CardProject extends React.Component {

  render() {
    return (
      <div>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {this.props.project.projectId} - {this.props.project.name}
            </Typography>
            <Divider style={{ marginBottom: '5px' }} />
            <Typography component="p">
              {this.props.project.description}
            </Typography>
          </CardContent>
          <CardActions style={{ display: 'flex', }}>
            <Link
              style={{ textDecoration: 'none' }}
              to={{ pathname: `/project/${this.props.project.projectId}` }}>
              <Button variant="raised" color="primary">
                Tarefas
              </Button>
            </Link>
            <MenuAction onEdit={this.props.onEdit} project={this.props.project} />

          </CardActions>
        </Card>
      </div>
    );
  }
}

class MenuAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: null,
      inOpenDialogDelete: false,
      messageDialogDelete: '',
      titleDialogDelete: '',
    }

    this.handleOpenDialogDelete = this.handleOpenDialogDelete.bind(this);
    this.handleOnOkDialogDelete = this.handleOnOkDialogDelete.bind(this);
  }

  //Function Menu
  handleMenu = (event) => {
    this.setState({
      openMenu: event.currentTarget,
    });
  }

  handleClose = () => {
    this.setState({ openMenu: null });
  };

  handleEdit = () => {
    this.props.onEdit(this.props.project);
    this.handleClose();
  };

  handleDelete = () => {
    this.setState({
      messageDialogDelete: `Deseja realmente deletar o projeto ${this.props.project.projectId} - ${this.props.project.name} ?`,
      titleDialogDelete: 'Confirmação',
    });
    this.handleOpenDialogDelete();
    this.handleClose();
  };

  //Function Dialog Delete
  handleOpenDialogDelete = () => {
    this.setState({
      inOpenDialogDelete: !this.state.inOpenDialogDelete,
    });
  }

  handleOnOkDialogDelete = () => {
    
    var db = firebase.database();
    var ref = db.ref(`user/0SB26bRlqVRaLTNrqzRNBg0JaDQ2`)
    ref.child('project').child(this.props.project.projectId).remove();

    this.handleOpenDialogDelete();
  }

  render() {
    return (
      <div style={{ width: '100%' }}>
        <IconButton
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
          style={{ float: 'right' }}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={this.state.openMenu}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(this.state.openMenu)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleEdit}>
            <Create style={{ fontSize: 18 }} />
            Editar
          </MenuItem>
          <MenuItem onClick={this.handleDelete}>
            <Delete style={{ fontSize: 18 }} />
            Deletar
          </MenuItem>
        </Menu>
        <DialogConfirm
          inOpen={this.state.inOpenDialogDelete}
          title={this.state.titleDialogDelete}
          message={this.state.messageDialogDelete}
          onCancel={this.handleOpenDialogDelete}
          onOk={this.handleOnOkDialogDelete} />
      </div>
    );
  }
}

export default CardProject;

