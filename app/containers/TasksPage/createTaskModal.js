/*
 *
 * TasksPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Modal } from 'react-bootstrap';
import { DateTimePicker } from 'react-widgets';

import makeSelectTasksPage from './selectors';
import { toggleCreateTaskModal, createTask, changeCreateTaskForm } from './actions';

export class CreateTaskModal extends React.PureComponent {

  renderResponse() {
    const { createTaskResponse: { success, message } } = this.props.TasksPage;
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
    const { onToggleCreateTaskModal, TasksPage: { showCreateTaskModal, creatingTask, createTaskForm }, onCreateTask, onChangeCreateTaskForm } = this.props;
    return (
      <Modal show={showCreateTaskModal}>
        <Modal.Header>
          <strong>Create a new task</strong>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onCreateTask}>
            <span>Task Name</span> <br />
            <input value={createTaskForm.name} onChange={(evt) => onChangeCreateTaskForm('name', evt.target.value)} readOnly={creatingTask} type="text" className="form-control" /> <br />
            <span>Task Description</span> <br />
            <textarea value={createTaskForm.description} onChange={(evt) => onChangeCreateTaskForm('description', evt.target.value)} readOnly={creatingTask} className="form-control" rows="3" /> <br />
            <span>Task End Date</span> <br />
            <DateTimePicker value={createTaskForm.endDate} min={new Date()} onChange={(value) => onChangeCreateTaskForm('endDate', value)} readOnly={creatingTask} time={false} /> <br />
            <button disabled={creatingTask} className="btn btn-primary">
              {creatingTask ? <i className="fa fa-spin fa-spinner" /> : <i className="fa fa-plus" />} Crate Task
            </button>
          </form>
          <br />
          {this.renderResponse()}
        </Modal.Body>
        <Modal.Footer>
          <button disabled={creatingTask} onClick={onToggleCreateTaskModal} className="btn btn-danger"><i className="fa fa-close" /> Close</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

CreateTaskModal.propTypes = {
  onToggleCreateTaskModal: PropTypes.func,
  onChangeCreateTaskForm: PropTypes.func,
  onCreateTask: PropTypes.func,
  TasksPage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  TasksPage: makeSelectTasksPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onToggleCreateTaskModal: () => dispatch(toggleCreateTaskModal()),
    onCreateTask: (evt) => {
      if (evt && evt.preventDefault) { evt.preventDefault(); }
      dispatch(createTask());
    },
    onChangeCreateTaskForm: (prop, value) => dispatch(changeCreateTaskForm(prop, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskModal);
