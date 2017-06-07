import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
        <div className="sign-in__logo-wrapper">
          <img className="sign-in__logo" src="http://i.imgur.com/OHRPgRy.png" alt="nimbus"/>
        </div>
        <form onSubmit={(e) => this.handleSubmit(this.state, push, e)}>
          <div className="form-group">
            <input
              type="email"
              className="sign-in__input form-control"
              id="formGroupExampleInput3"
              placeholder="Email"
              onChange={this.handleEmailChange}
            />
          </div>
          <div className="form-group">
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
        <div className="sign-in__go-back">
          <p><Link to="/" style={{color: '#fff'}}>Go back</Link></p>
        </div>
      </div>
    );
  }
}

export default connect()(SignIn);
