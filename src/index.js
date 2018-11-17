import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Switch, Route, withRouter,
} from 'react-router-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import PropTypes from 'prop-types';
import rootReducer from './reducers';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import App from './components/App';
import { setUser } from './actions';
import * as serviceWorker from './serviceWorker';
import firebase from './firebase';


const store = createStore(rootReducer, composeWithDevTools());

class Root extends Component {
  componentDidMount() {
    const { setUser, history } = this.props;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        history.push('/');
      } else {
        history.push('/login');
      }
    });
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    );
  }
}

const RootWithAuth = withRouter(connect(null, { setUser })(Root));

Root.propTypes = {
  history: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>, document.getElementById('root'),
);

serviceWorker.unregister();
