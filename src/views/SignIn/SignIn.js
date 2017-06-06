import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '~/redux/modules/authentication';
import './SignIn.css';

class SignIn extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }
  handleEmailChange = (event) => {
    this.setState({email: event.target.value});
  }
  handlePasswordChange = (event) => {
    this.setState({password: event.target.value});
  }
  handleSubmit = (credentials, push, e) => {
    e.preventDefault();
    this.props.dispatch(loginUser(credentials, push))
  }
  render () {
    const push = this.props.history.push;
    return (
      <div className="sign-in">
        <div>
          <h1>Nimbus</h1>
        </div>
        <form onSubmit={(e) => this.handleSubmit(this.state, push, e)}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="sign-in__input form-control"
              id="formGroupExampleInput3"
              placeholder="Enter your email address"
              onChange={this.handleEmailChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="sign-in__input form-control"
              id="formGroupExampleInput4"
              placeholder="Password"
              onChange={this.handlePasswordChange}
            />
          </div>
          <button type="submit" className="sign-in__button btn btn-primary btn-lg">Sign In</button>
        </form>
      </div>
    );
  }
}

export default connect()(SignIn);
