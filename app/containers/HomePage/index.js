/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <div className="intro-header">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="intro-message">
                  <h1>MERN Kit</h1>
                  <h3>A simple starter application built with MERN stack</h3>
                  <hr className="intro-divider" />
                  <ul className="list-inline intro-social-buttons">
                    <li>
                      <a target="_blank" href="https://twitter.com/itsMrAkhil" className="btn btn-default btn-lg"><i className="fa fa-twitter fa-fw" /> <span className="network-name">Twitter</span></a>
                    </li>
                    <li>
                      <a target="_blank" href="https://github.com/itsMrAkhil" className="btn btn-default btn-lg"><i className="fa fa-github fa-fw" /> <span className="network-name">Github</span></a>
                    </li>
                    <li>
                      <a target="_blank" href="https://linkedin.com/in/akhilp1" className="btn btn-default btn-lg"><i className="fa fa-linkedin fa-fw" /> <span className="network-name">Linkedin</span></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
