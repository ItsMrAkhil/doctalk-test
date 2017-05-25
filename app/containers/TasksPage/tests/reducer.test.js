
import { fromJS } from 'immutable';
import tasksPageReducer from '../reducer';

describe('tasksPageReducer', () => {
  it('returns the initial state', () => {
    expect(tasksPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
