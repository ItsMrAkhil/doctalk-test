import React from 'react';
import withProgressBar from 'components/ProgressBar';
import { Container, Image, Menu } from 'semantic-ui-react';

const fixedMenuStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
};

class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <div>
        <Menu
          borderless
          style={fixedMenuStyle}
        >
          <Container>
            <Menu.Item>
              <Image size="mini" src="https://res.cloudinary.com/dzfragjmc/image/upload/v1495421048/tasker_eyzpwv.svg" />
            </Menu.Item>
            <Menu.Item header />
          </Container>
        </Menu>
        <Container style={{ paddingTop: '1em' }}>
          {React.Children.toArray(this.props.children)}
        </Container>
      </div>
    );
  }
}

export default withProgressBar(App);
