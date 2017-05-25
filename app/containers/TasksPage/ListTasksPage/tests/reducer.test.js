
import { fromJS } from 'immutable';
import listTasksPageReducer from '../reducer';

describe('listTasksPageReducer', () => {
  it('returns the initial state', () => {
    expect(listTasksPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
