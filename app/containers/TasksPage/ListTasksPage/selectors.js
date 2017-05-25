import { createSelector } from 'reselect';

/**
 * Direct selector to the listTasksPage state domain
 */
const selectListTasksPageDomain = () => (state) => state.get('listTasksPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ListTasksPage
 */

const makeSelectListTasksPage = () => createSelector(
  selectListTasksPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectListTasksPage;
export {
  selectListTasksPageDomain,
};
