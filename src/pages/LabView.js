import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Lab = props => (
  <tr>
    <td>{props.lab.patientname}</td>
    <td>{props.lab.testdate}</td>
    <td>{props.lab.testtype}</td>
    <td>
      <Link to={"/edit/"+props.lab._id}>view</Link> | <a href="#" id="b9" onClick={() => { props.deleteLab(props.lab._id) }}>delete</a>
    </td>
  </tr>
)

export default class LabView extends Component {
  constructor(props) {
    super(props);

    this.deleteLab = this.deleteLab.bind(this);

    this.state = {lab: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/lab/')
      .then(response => {
        this.setState({ lab: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteLab(id) {
    axios.delete('http://localhost:5000/lab/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      lab: this.state.lab.filter(el => el._id !== id)
    })
  }

  LabView() {
    return this.state.lab.map(currentlab => {
      return <Lab lab={currentlab} deleteLab={this.deleteLab} key={currentlab._id}/>;
    })
  }

  render() {
    return (
      <div className="LabView">
        <h3>View lab details</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Patient Name</th>
              <th>Test Date</th>
              <th>Test Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.LabView() }
          </tbody>
        </table>
      </div>
    )
  }
}