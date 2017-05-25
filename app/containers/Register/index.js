/*
 *
 * Register
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';

import { makeSelectApp } from '../App/selectors';
import makeSelectRegister from './selectors';
import { changeRegisterForm, register } from './actions';

export class Register extends React.PureComponent {

  componentDidMount() {
    if (this.props.App.loggedIn) {
      browserHistory.replace('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.App.loggedIn) {
      browserHistory.replace('/');
    }
  }


  renderResponse() {
    const { response: { success, message } } = this.props.Register;
    if (success === false) {
      return (
        <div className="alert alert-danger">
          {message}
        </div>
      );
    } else if (success === true) {
      return (
        <div className="alert alert-success">
          {message}
        </div>
      );
    }
    return '';
  }

  render() {
    const { Register: { registering, registerForm: { name, email, password, confirmPassword } }, onRegister, onChangeRegisterForm } = this.props;
    return (
      <div className="row">
        <Helmet
          title="Register"
          meta={[
            { name: 'description', content: 'This is the register page for the user.' },
          ]}
        />
        <div className="col-sm-4 col-sm-offset-4">
          <h2><center>Registration Form</center></h2>
          <form onSubmit={onRegister}>
            <div className="input-group">
              <span className="input-group-addon" >
                <i className="fa fa-user-circle" aria-hidden="true" />
              </span>
              <input value={name} required readOnly={registering} onChange={(evt) => onChangeRegisterForm('name', evt.target.value)} type="text" className="form-control" placeholder="Name" />
            </div>
            <br />
            <div className="input-group">
              <span className="input-group-addon">
                <i className="fa fa-envelope-o" aria-hidden="true" />
              </span>
              <input value={email} required readOnly={registering} onChange={(evt) => onChangeRegisterForm('email', evt.target.value)} type="email" className="form-control" placeholder="Email" />
            </div>
            <br />
            <div className="input-group">
              <span className="input-group-addon" >
                <i className="fa fa-key" aria-hidden="true" />
              </span>
              <input value={password} required readOnly={registering} onChange={(evt) => onChangeRegisterForm('password', evt.target.value)} type="password" className="form-control" placeholder="Password" />
            </div>
            <br />
            <div className="input-group">
              <span className="input-group-addon" >
                <i className="fa fa-key" aria-hidden="true" />
              </span>
              <input value={confirmPassword} required readOnly={registering} onChange={(evt) => onChangeRegisterForm('confirmPassword', evt.target.value)} type="password" className="form-control" placeholder="Confirm Password" />
            </div>
            <br />
            <button disabled={registering} className="btn btn-primary btn-block">
              {registering ? <i className="fa fa-spin fa-spinner" /> : <i className="fa fa-sign-in" />} Register
            </button>
          </form>
          <br />
          {this.renderResponse()}
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  Register: PropTypes.object,
  onRegister: PropTypes.func,
  onChangeRegisterForm: PropTypes.func,
  response: PropTypes.object,
  App: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  Register: makeSelectRegister(),
  App: makeSelectApp(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeRegisterForm: (prop, value) => dispatch(changeRegisterForm(prop, value)),
    onRegister: (evt) => {
      if (evt && evt.preventDefault) { evt.preventDefault(); }
      dispatch(register());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
