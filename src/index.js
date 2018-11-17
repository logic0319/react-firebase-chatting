import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import firebase from './firebase';
import * as serviceWorker from './serviceWorker';

import {
  BrowserRouter as Router, Switch, Route, withRouter,
} from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import App from './components/App';
import Spinner from './components/common/Spinner';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import { setUser, clearUser } from './actions';


const store = createStore(rootReducer, composeWithDevTools());

class Root extends Component {
  componentDidMount() {
    const { setUser, clearUser, history } = this.props;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        history.push('/');
      } else {
        history.push('/login');
        clearUser();
      }
    });
  }

  render() {
    const { isLoading } = this.props;
    return isLoading ? (
      <Spinner />
    ) : (
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.user.isLoading,
});

const RootWithAuth = withRouter(connect(mapStateToProps, { setUser, clearUser })(Root));

Root.propTypes = {
  history: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setUser: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired,
};

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>, document.getElementById('root'),
);

serviceWorker.unregister();
