import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createUser } from '~/redux/modules/authentication';
import './SignUp.css';

class SignUp extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      displayName: '',
      email: '',
      password: '',
      confirmPasswordText: ''
    }
  }
  handleUsernameChange = (event) => {
    this.setState({username: event.target.value});
  }
  handleDisplayNameChange = (event) => {
    this.setState({displayName: event.target.value});
  }
  handleEmailChange = (event) => {
    this.setState({email: event.target.value});
  }
  handlePasswordChange = (event) => {
    this.setState({password: event.target.value});
  }
  handleConfirmPasswordChange = (event) => {
    this.setState({confirmPasswordText: event.target.value});
  }
  handleSubmit = (formData, push, e) => {
    e.preventDefault();
    this.props.dispatch(createUser(formData, push))
  }
  render () {
    const push = this.props.history.push;
    return (
      <div className="sign-up">
        <div>
          <h1>Nimbus</h1>
        </div>
        <form onSubmit={(e) => this.handleSubmit(this.state, push, e)}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="sign-up__input form-control"
              id="formGroupExampleInput"
              placeholder="Choose a username"
              onChange={this.handleUsernameChange}
            />
          </div>
          <div className="form-group">
            <label>Display Name</label>
            <input
              type="text"
              className="sign-up__input form-control"
              id="formGroupExampleInput2"
              placeholder="Choose a display name"
              onChange={this.handleDisplayNameChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="sign-up__input form-control"
              id="formGroupExampleInput3"
              placeholder="Enter your email address"
              onChange={this.handleEmailChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="sign-up__input form-control"
              id="formGroupExampleInput4"
              placeholder="Password"
              onChange={this.handlePasswordChange}
            />
          </div>
          <div className="form-group">
            <label>Confirm password</label>
            <input
              type="password"
              className="sign-up__input form-control"
              id="formGroupExampleInput4"
              placeholder="Password"
              onChange={this.handleConfirmPasswordChange}
            />
          </div>
          <button type="submit" className="sign-up__button btn btn-primary btn-lg">Sign Up</button>
        </form>
        <div>
          <p>Already have an account? <Link to="/login">Sign In</Link></p>
        </div>
      </div>
    );
  }
}

export default connect()(SignUp);
