/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { makeSelectApp } from '../App/selectors';
import { toggleLoginModal } from '../App/actions';

class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { onToggleLoginModal, App: { loggedIn } } = this.props;
    return (
      <div>
        <div className="intro-header">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="intro-message">
                  <h1>Task Manager</h1>
                  <h3>A simple task manager for users.</h3>
                  <hr className="intro-divider" />
                  <ul className="list-inline intro-social-buttons">
                    {
                      !loggedIn
                        ?
                          <li>
                            <Link to="#" onClick={onToggleLoginModal} className="btn btn-default btn-lg"><i className="fa fa-sign-in fa-fw" /> <span className="network-name">Login to Manage Tasks</span></Link>
                          </li>
                        :
                          <li>
                            <Link to="/tasks/list" className="btn btn-default btn-lg"><i className="fa fa-list fa-fw" /> <span className="network-name">Manage Your Tasks</span></Link>
                          </li>
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  onToggleLoginModal: React.PropTypes.func,
  App: React.PropTypes.object,
};

export const mapStateToProps = createStructuredSelector({
  App: makeSelectApp(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onToggleLoginModal: () => dispatch(toggleLoginModal()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
