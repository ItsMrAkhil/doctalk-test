
import { createSelector } from 'reselect';

const selectApp = (state) => state.get('app');

const makeSelectApp = () => createSelector(
  selectApp,
  (appState) => appState.toJS()
);

const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  makeSelectLocationState,
  makeSelectApp,
};
