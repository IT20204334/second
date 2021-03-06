  import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditLab extends Component {
  constructor(props) {
    super(props);

    this.onChangePatientname = this.onChangePatientname.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeTestdate = this.onChangeTestdate.bind(this);
    this.onChangeMobilenumber = this.onChangeMobilenumber.bind(this);
    this.onChangeTesttype = this.onChangeTesttype.bind(this);
    this.onChangeTestresult = this.onChangeTestresult.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        patientname: '',
        age: '',
        gender: '',
        testdate: new Date(),
        mobilenumber: '',
        testtype: '',
        testresult: '',
       
    }
}

  componentDidMount() {
    axios.get('http://localhost:5000/lab/'+this.props.match.params.id)
      .then(response => {
        this.setState({
            patientname: response.data.patientname,
            age: response.data.age,
            gender: response.data.gender,
            testdate: new Date(response.data.testdate),
            mobilenumber: response.data.mobilenumber,
            testtype: response.data.testtype,
            testresult: response.data.testresult
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onChangePatientname(e) {
    this.setState({
        patientname: e.target.value
    })
  }

  onChangeAge(e) {
    this.setState({
        age: e.target.value
    })
  }

  onChangeGender(e) {
    this.setState({
        gender: e.target.value
    })
  }

  onChangeTestdate(date) {
    this.setState({
      testdate: date
    })
  }

  onChangeMobilenumber(e) {
    this.setState({
        mobilenumber: e.target.value
    })
  }

  onChangeTesttype(e) {
    this.setState({
        testtype: e.target.value
    })
  }

  onChangeTestresult(e) {
    this.setState({
        testresult: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const lab = {
        patientname: this.state.patientname,
        age: this.state.age,
        gender: this.state.gender,
        testdate: this.state.testdate,
        mobilenumber: this.state.mobilenumber,
        testtype: this.state.testtype,
        testresult: this.state.testresult
    }

    console.log(lab);

    axios.post('http://localhost:5000/lab/update/' + this.props.match.params.id, lab)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div className="EditLab">
      <h3>Edit Lab Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label><b>Patient Name: </b></label>
             <input  type="text"
              required
              className="form-control"
              value={this.state.patientname}
              onChange={this.onChangePatientname} />
             
          
        </div>
        <div className="form-group"> 
          <label><b>Age: </b></label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.age}
              onChange={this.onChangeAge}
              />
        </div>
        <div class="form-group">
              <label><b>Gender: </b></label>
              <select  value={this.state.Gender}  onChange={this.onChangeGender} >
              <option selected disabled value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              
              </select></div>
        
        
          <div className="form-group"> 
          <label>Mobile Number: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.mobilenumber}
              pattern = "[0-9]*"
              maxLength="10"
              onChange={this.onChangeMobilenumber}
              />
        </div>
        <div className="form-group"> 
          <label>Test Type: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.testtype}
              onChange={this.onChangeTesttype}
              />
        </div>
        <div className="form-group"> 
          <label>Test Result: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.testresult}
              onChange={this.onChangeTestresult}
              />
        </div>
        <div className="form-group">
          <label>Test Date: </label>
          <div>
            <DatePicker
              selected={this.state.testdate}
              onChange={this.onChangeTestdate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="UPDATE LAB DETAILS" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
