import React from 'react';
import { Link } from 'react-router';
import { Modal } from 'react-bootstrap';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { makeSelectApp } from './selectors';
import { changeLoginForm, toggleLoginModal, login } from './actions';

class LoginModal extends React.PureComponent {

  renderResponse() {
    const { response: { success, message } } = this.props.App;
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
    const { onChangeLoginForm, App: { showLoginModal, loggingIn, loginForm: { email, password } }, onToggleLoginModal, onLogin } = this.props;
    return (
      <Modal show={showLoginModal}>
        <Modal.Header>
          Login form
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onLogin}>
            <div className="input-group">
              <span className="input-group-addon" >
                <i className="fa fa-envelope-o" aria-hidden="true" />
              </span>
              <input value={email} required readOnly={loggingIn} onChange={(evt) => onChangeLoginForm('email', evt.target.value)} type="email" className="form-control" placeholder="Email" />
            </div>
            <br />
            <div className="input-group">
              <span className="input-group-addon" >
                <i className="fa fa-key" aria-hidden="true" />
              </span>
              <input value={password} required readOnly={loggingIn} onChange={(evt) => onChangeLoginForm('password', evt.target.value)} type="password" className="form-control" placeholder="Password" />
            </div>
            <br />
            <button disabled={loggingIn} className="btn btn-primary btn-block">
              {loggingIn ? <i className="fa fa-spin fa-spinner" /> : <i className="fa fa-sign-in" />} Login
            </button>
          </form>
          <br />
          {this.renderResponse()}
        </Modal.Body>
        <Modal.Footer>
          <Link onClick={loggingIn ? () => '' : onToggleLoginModal} className="login-modal-register-link" to={loggingIn ? '#' : '/register'}>
            Don{"'"}t Have an account?
          </Link>
          <button disabled={loggingIn} onClick={onToggleLoginModal} className="btn btn-danger"><i className="fa fa-close" /> Close</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

LoginModal.propTypes = {
  onChangeLoginForm: React.PropTypes.func,
  onToggleLoginModal: React.PropTypes.func,
  onLogin: React.PropTypes.func,
  App: React.PropTypes.object,
};

export const mapStateToProps = createStructuredSelector({
  App: makeSelectApp(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeLoginForm: (prop, value) => dispatch(changeLoginForm(prop, value)),
    onToggleLoginModal: () => dispatch(toggleLoginModal()),
    onLogin: (evt) => {
      if (evt && evt.preventDefault) { evt.preventDefault(); }
      dispatch(login());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
