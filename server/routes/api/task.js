const router = require('express')();
const { isMongoId } = require('validator');

const Task = require('../../models/Task');
const { isLoggedIn } = require('../../middlewares/authMiddleware');

router.post('/api/tasks', isLoggedIn, (req, res) => {
  const { name, description, endDate: reqEndDate } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, message: 'Task name required.' });
  } else if (!description) {
    return res.status(400).json({ success: false, message: 'Task description required.' });
  } else if (!reqEndDate) {
    return res.status(400).json({ success: false, message: 'Task end date required.' });
  }
  const endDate = new Date(reqEndDate).setHours(23, 59, 59, 999);
  const { _id: userId } = req.user;
  return Task.create({ name, description, endDate, createdBy: userId }, (errCreateTask, task) => {
    if (errCreateTask || !task) {
      return res.status(500).json({ success: false, message: 'Error while creating task' });
    }
    return res.status(201).json({ success: true, message: 'Task created successfully', task });
  });
});

router.get('/api/tasks', isLoggedIn, (req, res) => {
  const { _id: userId } = req.user;
  const findQuery = { createdBy: userId };
  const { deleted, fromDate, toDate } = req.query;
  if (deleted === 'true') {
    findQuery.status = 'delete';
  } else {
    findQuery.status = { $ne: 'delete' };
  }
  if (fromDate) {
    const parsedFromDate = new Date(fromDate).setHours(0, 0, 0, 1);
    findQuery.createdAt = { $gte: parsedFromDate };
  } if (toDate) {
    const parsedToDate = new Date(toDate).setHours(23, 59, 59, 999);
    findQuery.createdAt = { $lte: parsedToDate };
  }
  Task.find(findQuery, (errFind, tasks) => {
    if (errFind) {
      return res.status(500).json({ success: false, message: 'Error while fetching tasks' });
    }
    return res.status(200).json({ success: true, message: 'Find tasks key', tasks });
  });
});

router.delete('/api/tasks/:taskId', isLoggedIn, (req, res) => {
  const { taskId } = req.params;
  if (!isMongoId(taskId)) {
    return res.status(400).json({ success: false, message: 'Invalid task ID' });
  }
  const { _id: userId } = req.user;
  return Task.findOne({ _id: taskId, createdBy: userId }, (errFind, task) => {
    if (errFind) {
      return res.status(500).json({ success: false, message: 'Error while deleting task' });
    } else if (!task) {
      return res.status(500).json({ success: false, message: 'Task not found.' });
    }
    task.status = 'delete'; // eslint-disable-line
    return task.save((errSave) => {
      if (errSave) {
        return res.status(500).json({ success: false, message: 'Error while deleting task' });
      }
      return res.status(203).json({ success: true, message: 'Task deleted successfully' });
    });
  });
});

router.put('/api/tasks/:taskId', isLoggedIn, (req, res) => {
  const { taskId } = req.params;
  const { name, description, endDate: reqEndDate } = req.body;
  if (!name && !description && !reqEndDate) {
    return res.status(400).json({ success: false, message: 'Nothing has been changed.' });
  } if (!isMongoId(taskId)) {
    return res.status(400).json({ success: false, message: 'Invalid task ID' });
  }
  const { _id: userId } = req.user;
  const endDate = new Date(reqEndDate).setHours(23, 59, 59, 999);
  return Task.findOne({ _id: taskId, createdBy: userId, status: 'todo' }, (errFind, task) => {
    if (errFind) {
      return res.status(500).json({ success: false, message: 'Error while editing task' });
    } else if (!task) {
      return res.status(500).json({ success: false, message: 'Task not found.' });
    }
    if (name) {
      task.name = name; // eslint-disable-line
    } if (description) {
      task.description = description; // eslint-disable-line
    } if (reqEndDate) {
      task.endDate = endDate; // eslint-disable-line
    }
    return task.save((errSave) => {
      if (errSave) {
        return res.status(500).json({ success: false, message: 'Error while editing task' });
      }
      return res.status(203).json({ success: true, message: 'Task edited successfully' });
    });
  });
});

module.exports = router;
