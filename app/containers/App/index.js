import React from 'react';
import withProgressBar from 'components/ProgressBar';

import Header from './header';
import LoginModal from './loginModal';
import Footer from './footer';

class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <div className="pb80">
        <Header />
        {React.Children.toArray(this.props.children)}
        <LoginModal />
        <Footer />
      </div>
    );
  }
}

export default withProgressBar(App);
