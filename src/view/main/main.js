import React, { Component } from 'react';
import * as firebase from 'firebase';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Refresh from '@material-ui/icons/Refresh';
import Tooltip from 'material-ui/Tooltip';

import Root from '../root/root'
import CardProject from './cardProject/cardProject'
import FloatingButtonAdd from '../components/floatingButtonAdd';
//import CircleProgress from '../components/circleProgress';
import FormRegisterProject from './registerProject';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inOpenFormRegisterProject: false,
      projectRegister: {
        cdProject: '',
        nmProject: '',
        goalProject: '',
        dtModification: '',
        status: '',
      },
      projects: [],
    };

    this.handleOpenFormRegisterProjectEdit = this.handleOpenFormRegisterProjectEdit.bind(this);
    this.handleOpenFormRegisterProject = this.handleOpenFormRegisterProject.bind(this);
    this.handleCloseFormRegisterProject = this.handleCloseFormRegisterProject.bind(this);
  }

  async getUid() {
    let user = await firebase.auth().currentUser;
    //let uid = await user.uid;
    console.log(user);
  }

  componentDidMount() {

    /* if (!user) {
       window.location.href = "/login";
        return;
     }*/
    this.getUid();
    var db = firebase.database();
    var ref = db.ref("user/0SB26bRlqVRaLTNrqzRNBg0JaDQ2/project");

    ref.once("value", (snapshot) => {
      const response = snapshot.val();
      let projectArray = [];
      for (const projectRes in response) {
        const project = {
          projectId: projectRes,
          name: response[projectRes].name,
          description: response[projectRes].description,
          dateModification: response[projectRes].dt_modification,
          status: response[projectRes].status,
        }
        projectArray.push(project);
      }
      this.setState({
        projects: projectArray,
      });
    }, (error) => {
      if (error.code === 'PERMISSION_DENIED') {
        window.location.href = "/login";
        return;
      } else {
        alert(`${error.code}: ${error.message}`);
      }
    });
  }

  handleOpenFormRegisterProjectEdit = (project) => {
    this.setState({
      inOpenFormRegisterProject: true,
      projectRegister: {
        cdProject: project.projectId,
        nmProject: project.name,
        goalProject: project.description,
        dtModification: project.dateModification,
        status: '',
      }
    });
  }

  handleOpenFormRegisterProject = () => {
    this.setState({
      inOpenFormRegisterProject: true,
      projectRegister: {
        cdProject: '',
        nmProject: '',
        goalProject: '',
        dtModification: '',
        status: '',
      }
    });
  }

  handleCloseFormRegisterProject = () => {
    this.setState({
      inOpenFormRegisterProject: false
    });
    this.componentWillMount();
  }

  render() {
    return (
      <Root>
        <Paper elevation={4} style={style.paperTitle}>
          <Typography variant="headline" style={style.textCab}>
            Projetos
          </Typography>
          <Tooltip title="Atualizar página">
            <IconButton
              aria-haspopup="true"
              onClick={() => this.componentWillMount()}
              color="inherit"
            >
              <Refresh />
            </IconButton>
          </Tooltip>
        </Paper>
        <div style={style.container}>
          <Typography variant="subheading" style={style.textStatus}>
            Pendentes
          </Typography>
          <Divider style={style.divider} />
          <Grid container spacing={24}>
            {this.state.projects.map((project, index) => (
              project.status === 1 ?
                <Grid item key={index} xs={12} sm={3} md={3} lg={3} xl={2}>
                  <CardProject project={project} onEdit={this.handleOpenFormRegisterProjectEdit} />
                </Grid> : null
            ))}
          </Grid>
          <Typography variant="subheading" style={style.textStatus}>
            Implantados
          </Typography>
          <Divider style={style.divider} />
          <Grid container spacing={24}>
            {this.state.projects.map((project, index) => (
              project.status === 2 ?
                <Grid item key={index} xs={12} sm={3} md={3} lg={3} xl={2}>
                  <CardProject project={project} onEdit={this.handleOpenFormRegisterProjectEdit} />
                </Grid> : null
            ))}
          </Grid>
          <FloatingButtonAdd onClick={this.handleOpenFormRegisterProject} tooltip="Novo Projeto" />
          <FormRegisterProject inOpen={this.state.inOpenFormRegisterProject} project={this.state.projectRegister} onClose={this.handleCloseFormRegisterProject} />
        </div>
      </Root>
    );
  }
}

const style = {
  container: {
    padding: '15px',
  },
  btnAction: {
    marginLeft: '1rem',
  },
  divider: {
    marginTop: '15px',
    marginBottom: '15px',
  },
  paperTitle: {
    padding: 10,
    display: 'flex',
    aligItems: 'center',
  },
  textStatus: {
    margin: '10px',
  },
  textCab: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  }
};

export default Main;
