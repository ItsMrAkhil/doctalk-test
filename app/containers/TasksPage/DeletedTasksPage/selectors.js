import { createSelector } from 'reselect';

/**
 * Direct selector to the deletedTasksPage state domain
 */
const selectDeletedTasksPageDomain = () => (state) => state.get('deletedTasksPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by DeletedTasksPage
 */

const makeSelectDeletedTasksPage = () => createSelector(
  selectDeletedTasksPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectDeletedTasksPage;
export {
  selectDeletedTasksPageDomain,
};
