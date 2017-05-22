import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectApp } from './selectors';
import { toggleLoginModal, logout } from './actions';

class Header extends React.PureComponent {

  renderNavLinks() {
    const { onToggleLoginModal, App: { loggedIn, user, loggingIn, loggingOut }, onLogout } = this.props;
    if (loggingIn || loggingOut) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="#"><i className="fa fa-spin fa-spinner" /> Loading ...</Link></li>
        </ul>
      );
    }
    if (!loggedIn) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li><Link onClick={onToggleLoginModal}>Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      );
    }
    return (
      <ul className="nav navbar-nav navbar-right">
        <li><a> {user.name} </a></li>
        <li><Link onClick={onLogout} > Logout </Link></li>
      </ul>
    );
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">
                <img alt="App" height="30" width="30" src="https://res.cloudinary.com/dzfragjmc/image/upload/v1495421048/tasker_eyzpwv.svg" />
              </Link>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              {this.renderNavLinks()}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  App: React.PropTypes.object,
  onToggleLoginModal: React.PropTypes.func,
  onLogout: React.PropTypes.func,
};

export const mapStateToProps = createStructuredSelector({
  App: makeSelectApp(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onToggleLoginModal: () => dispatch(toggleLoginModal()),
    onLogout: () => dispatch(logout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
