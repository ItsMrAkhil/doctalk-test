import React from 'react';
import { connect } from 'react-redux';
import { AlertList } from 'react-bs-notifier';

class AlertContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { alerts } = this.props.App;
    return (
      <AlertList alerts={alerts} />
    );
  }
}

AlertContainer.propTypes = {
  App: React.PropTypes.object,
};

export default connect()(AlertContainer);
