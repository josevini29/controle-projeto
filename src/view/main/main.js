import React, { Component } from 'react';
import * as firebase from 'firebase';

import NavBar from '../../util/navbar'
import CardProject from './cardProject/cardProject'

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    };
  }

  componentWillMount() {
    var db = firebase.database();
    var ref = db.ref("user/RDfOBwn0IBTetKL2kVwep2zrSRm2/project");

    ref.on("value", (snapshot) => {
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
    }, (errorObject) => {
      alert("The read failed: " + errorObject.code);
    });
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="container-fluid">
          <h3 className="m-2 breadcrumb">Projetos</h3>
          <h4 className="m-3 text-center">Pendentes</h4>
          <div className="breadcrumb" style={style.lineSeparator}></div>
          <div className="row">
            {this.state.projects.map(project => (
              project.status === 1 ?
                <div key={project.projectId} className="col-md-3">
                  <CardProject project={project} />
                </div> : null
            ))}
          </div>
          <div className="breadcrumb" style={style.lineSeparator}></div>
          <h4 className="m-3 text-center">Implantados</h4>
          <div className="row">
            {this.state.projects.map(project => (
              project.status === 2 ?
                <div key={project.projectId} className="col-sm-12 col-md-3 col-lg-3">
                  <CardProject project={project} />
                </div> : null
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const style = {
  btnAction: {
    marginLeft: '1rem',
  },
  lineSeparator: {
    height: '1px',
    padding: '0px',
    backgroundColor: '#000',
    margin: '15px',
  },
};

export default Main;
