/*
 *
 * DeletedTasksPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import makeSelectDeletedTasksPage from './selectors';
import { fetchTasksList } from './actions';

export class DeletedTasksPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { onFetchTasksList } = this.props;
    onFetchTasksList();
  }

  renderTasks() {
    const { DeletedTasksPage: { tasks, fetchingTasks } } = this.props;
    if (fetchingTasks) {
      return (
        <div>
          <i className="fa fa-spin fa-spinner fa-3x page-center" />
        </div>
      );
    }
    return tasks.map((task) => {
      const { name, _id: taskId, endDate, createdAt, description } = task;
      return (
        <div className="panel panel-default" key={taskId}>
          <div className="panel-heading clearfix">
            <strong>{name}</strong>
          </div>
          <div className="panel-body">{description}</div>
          <div className="panel-footer">
            <div className="row">
              <div className="col-sm-4">
                <strong>Task Ends:</strong> {new Date(endDate).toDateString()}
              </div>
              <div className="col-sm-4">
                <small><strong>Created At: </strong>{new Date(createdAt).toDateString()}</small>
              </div>
              <div className="col-sm-4">
                <small className="text-right"><strong>Task ID: </strong>{taskId}</small>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <Helmet
          title="Tasks List Deleted"
          meta={[
            { name: 'description', content: 'Description of DeletedTasksPage' },
          ]}
        />
        <div>
          {this.renderTasks()}
        </div>
      </div>
    );
  }
}

DeletedTasksPage.propTypes = {
  DeletedTasksPage: PropTypes.object.isRequired,
  onFetchTasksList: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  DeletedTasksPage: makeSelectDeletedTasksPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onFetchTasksList: () => dispatch(fetchTasksList()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeletedTasksPage);
