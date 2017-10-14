/*
 *
 * HomePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import Helmet from 'react-helmet';
import { Input, Card, Image } from 'semantic-ui-react';
import { createStructuredSelector } from 'reselect';
import makeSelectHomePage from './selectors';
import { searchGitHubUsers, changeText } from './actions';

export class HomePage extends React.PureComponent {

  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(evt) {
    const { onTextChange, onSearchGitHubUsers, HomePage: { texts } } = this.props;
    const val = evt.target.value;
    if (val) {
      onTextChange(val);
    }
    if (!texts.length && val) {
      onSearchGitHubUsers();
    }
  }

  renderUsers(users) {
    return users.map((user) => {
      const { avatar_url: avatar, html_url: url, login } = user;
      return (
        <Card color="teal">
          <Image as="a" href={url} src={avatar} />
          <Card.Content>
            <Card.Header>{login}</Card.Header>
          </Card.Content>
        </Card>
      );
    });
  }

  render() {
    const { HomePage: { users, searching } } = this.props;
    return (
      <div>
        <div className="container">
          <form action="" onSubmit={(evt) => evt.preventDefault()}>
            <Input
              icon="search"
              placeholder="search..."
              onChange={this.handleTextChange}
              fluid
              loading={searching}
            />
          </form>
          <br />
          <br />
          <Card.Group itemsPerRow={4}>
            {this.renderUsers(users)}
          </Card.Group>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  onSearchGitHubUsers: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired,
  HomePage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  HomePage: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSearchGitHubUsers: (evt) => {
      if (evt && evt.preventDefault) { evt.preventDefault(); }
      dispatch(searchGitHubUsers());
    },
    onTextChange: (value) => {
      dispatch(changeText(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
