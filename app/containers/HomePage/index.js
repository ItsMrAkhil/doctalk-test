/*
 *
 * HomePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import Helmet from 'react-helmet';
import { debounce } from 'lodash';
import { Input, Card, Image } from 'semantic-ui-react';
import { createStructuredSelector } from 'reselect';
import makeSelectHomePage from './selectors';
import { searchGitHubUsers, changeText } from './actions';

export class HomePage extends React.PureComponent {

  constructor(props) {
    super(props);
    this.onTextChange = debounce((evt) => this.props.onTextChange(evt), 500);
  }

  renderUsers(users) {
    return users.map((user) => {
      const { avatar_url: avatar, html_url: url, login } = user;
      return (
        <Card color="teal" key={login}>
          <Image as="a" href={url} src={avatar} />
          <Card.Content>
            <Card.Header>{login}</Card.Header>
          </Card.Content>
        </Card>
      );
    });
  }

  render() {
    const { onSearchGitHubUsers, HomePage: { users, searching } } = this.props;
    return (
      <div>
        <div className="container">
          <form action="" onSubmit={onSearchGitHubUsers}>
            <Input
              icon="search"
              placeholder="search..."
              onChange={({ target: { value } }) => this.onTextChange(value)}
              fluid
              loading={searching}
              disabled={searching}
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
