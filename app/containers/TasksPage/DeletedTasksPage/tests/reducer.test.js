
import { fromJS } from 'immutable';
import deletedTasksPageReducer from '../reducer';

describe('deletedTasksPageReducer', () => {
  it('returns the initial state', () => {
    expect(deletedTasksPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
