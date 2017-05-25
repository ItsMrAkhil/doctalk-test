/*
 *
 * ListTasksPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { Modal } from 'react-bootstrap';
import { DateTimePicker } from 'react-widgets';

import makeSelectListTasksPage from './selectors';
import {
  fetchTasksList, toggleDeleteTaskModal,
  deleteTask, toggleEditTaskModal,
  changeEditTaskForm, editTask, changeFilterForm,
  resetFilter,
} from './actions';

export class ListTasksPage extends React.PureComponent {

  componentDidMount() {
    const { onFetchTasksList } = this.props;
    onFetchTasksList();
  }

  renderResponse() {
    const { response: { success, message } } = this.props.ListTasksPage;
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

  renderEditTaskModal(taskId, name, description, endDate) {
    const { onChangeEditTaskForm, onEditTask, onToggleEditTaskModal } = this.props;
    const { editModalTaskId, editTaskForm, editingTask } = this.props.ListTasksPage;
    return (
      <Modal show={taskId === editModalTaskId}>
        <Modal.Header>
          Edit task <strong>{name}</strong>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onEditTask}>
            <span>Task Name</span> <br />
            <input value={editTaskForm.name || name} onChange={(evt) => onChangeEditTaskForm('name', evt.target.value)} readOnly={editingTask} type="text" className="form-control" /> <br />
            <span>Task Description</span> <br />
            <textarea value={editTaskForm.description || description} onChange={(evt) => onChangeEditTaskForm('description', evt.target.value)} readOnly={editingTask} className="form-control" rows="3" /> <br />
            <span>Task End Date</span> <br />
            <DateTimePicker value={editTaskForm.endDate || new Date(endDate)} min={new Date()} onChange={(value) => onChangeEditTaskForm('endDate', value)} readOnly={editingTask} time={false} /> <br />
            <button disabled={editingTask} className="btn btn-primary">
              {editingTask ? <i className="fa fa-spin fa-spinner" /> : <i className="fa fa-pencil" />} Edit Task
              </button>
          </form>
          <br />
          {this.renderResponse()}
        </Modal.Body>
        <Modal.Footer>
          <button disabled={editingTask} className="btn btn-danger" onClick={() => onToggleEditTaskModal('')}><i className="fa fa-close" /> Close</button>
        </Modal.Footer>
      </Modal>
    );
  }

  renderDeleteTaskModal(name, taskId) {
    const { ListTasksPage: { deleteModalTaskId, deletingTask }, onToggleDeleteTaskModal, onDeleteTask } = this.props;
    return (
      <Modal show={taskId === deleteModalTaskId}>
        <Modal.Header>
          Are you sure you want to delete <strong>{name}</strong>?
        </Modal.Header>
        {
          this.props.ListTasksPage.response.success !== undefined
            ?
              <Modal.Body>
                {this.renderResponse()}
              </Modal.Body>
            :
              ''
        }
        <Modal.Footer>
          <button disabled={deletingTask} className="btn btn-primary" onClick={() => onToggleDeleteTaskModal('')}>
            <i className="fa fa-close" /> Cancel
          </button>
          <button disabled={deletingTask} className="btn btn-danger" onClick={onDeleteTask}>
            {deletingTask ? <i className="fa fa-spin fa-spinner" /> : <i className="fa fa-trash" />} Delete
          </button>
        </Modal.Footer>
      </Modal>
    );
  }

  renderTasks() {
    const { ListTasksPage: { tasks, fetchingTasks }, onToggleDeleteTaskModal, onToggleEditTaskModal } = this.props;
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
            <div className="btn-group pull-right">
              <button className="btn btn-info" onClick={() => onToggleEditTaskModal(taskId)}><i className="fa fa-pencil" /> Edit</button>
              <button className="btn btn-danger" onClick={() => onToggleDeleteTaskModal(taskId)}><i className="fa fa-trash" /> Delete</button>
            </div>
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
          {this.renderDeleteTaskModal(name, taskId)}
          {this.renderEditTaskModal(taskId, name, description, endDate)}
        </div>
      );
    });
  }

  render() {
    const { onChangeFilterForm, ListTasksPage: { filterForm }, onResetFilter } = this.props;
    return (
      <div>
        <Helmet
          title="Tasks List"
          meta={[
            { name: 'description', content: 'Description of ListTasksPage' },
          ]}
        />
        <div>
          <div className="row">
            <div className="col-sm-4">
              Created on/after: <br />
              <DateTimePicker value={filterForm.fromDate} max={filterForm.toDate || new Date()} onChange={(value) => onChangeFilterForm('fromDate', value)} time={false} /> <br />
            </div>
            <div className="col-sm-4">
              Created on/before: <br />
              <DateTimePicker value={filterForm.toDate} min={filterForm.fromDate} max={new Date()} onChange={(value) => onChangeFilterForm('toDate', value)} time={false} /> <br />
            </div>
            <div className="col-sm-4">
              <br />
              <button onClick={onResetFilter} className="btn btn-default btn-block"> <i className="fa fa-times-circle-o" /> Clear Filter</button>
            </div>
          </div>
          {this.renderTasks()}
        </div>
      </div>
    );
  }
}

ListTasksPage.propTypes = {
  ListTasksPage: PropTypes.object,
  onFetchTasksList: PropTypes.func.isRequired,
  onToggleDeleteTaskModal: PropTypes.func.isRequired,
  onToggleEditTaskModal: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onChangeEditTaskForm: PropTypes.func.isRequired,
  onChangeFilterForm: PropTypes.func.isRequired,
  onResetFilter: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ListTasksPage: makeSelectListTasksPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onFetchTasksList: () => dispatch(fetchTasksList()),
    onToggleDeleteTaskModal: (taskId) => dispatch(toggleDeleteTaskModal(taskId)),
    onToggleEditTaskModal: (taskId) => dispatch(toggleEditTaskModal(taskId)),
    onDeleteTask: () => dispatch(deleteTask()),
    onEditTask: (evt) => {
      if (evt && evt.preventDefault) { evt.preventDefault(); }
      dispatch(editTask());
    },
    onChangeEditTaskForm: (prop, value) => dispatch(changeEditTaskForm(prop, value)),
    onChangeFilterForm: (prop, value) => dispatch(changeFilterForm(prop, value)),
    onResetFilter: () => dispatch(resetFilter()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListTasksPage);
