import React from 'react';

import Header from './header';
import LoginModal from './loginModal';
import Footer from './footer';

export default class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <div>
        <Header />
        {React.Children.toArray(this.props.children)}
        <LoginModal />
        <Footer />
      </div>
    );
  }
}
