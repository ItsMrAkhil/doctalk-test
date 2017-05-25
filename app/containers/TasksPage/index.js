/*
 *
 * TasksPage
 *
 */

import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import { makeSelectApp } from '../App/selectors';
import makeSelectTasksPage from './selectors';
import { toggleCreateTaskModal } from './actions';

import CreateTaskModal from './createTaskModal';

export class TasksPage extends React.PureComponent {

  componentWillReceiveProps(nextProps) {
    if (!nextProps.App.loggedIn && nextProps.App.loggedIn !== this.props.App.loggedIn) {
      browserHistory.replace('/');
    }
  }

  render() {
    const { onToggleCreateTaskModal } = this.props;
    return (
      <div className="container">
        <Helmet
          title="Tasks Page"
          meta={[
            { name: 'description', content: 'Description of Tasks Page' },
          ]}
        />
        <div className="row">
          <div className="col-sm-3">
            <p className="lead">Tasks Manager</p>
            <button onClick={onToggleCreateTaskModal} className="btn btn-primary btn-block">Create a Task</button><br />
            <div className="list-group">
              <Link to="/tasks/list" activeClassName="active" className="list-group-item">
                <i className="fa pull-right fa-list"></i> All Tasks
              </Link>
              <Link to="/tasks/deleted" activeClassName="active" className="list-group-item">
                <i className="fa pull-right fa-trash"></i> Deleted
              </Link>
            </div>
          </div>
          <div className="col-sm-9">
            {this.props.children}
          </div>
        </div>
        <CreateTaskModal />
      </div>
    );
  }
}

TasksPage.propTypes = {
  onToggleCreateTaskModal: PropTypes.func,
  App: PropTypes.object,
  children: PropTypes.node,
};

const mapStateToProps = createStructuredSelector({
  TasksPage: makeSelectTasksPage(),
  App: makeSelectApp(),
});

function mapDispatchToProps(dispatch) {
  return {
    onToggleCreateTaskModal: () => dispatch(toggleCreateTaskModal()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);
