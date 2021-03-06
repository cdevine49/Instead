var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Modal = require('react-modal');

var App = require('./components/app');
var LogIn = require('./components/logIn');
var SignUp = require('./components/signUp');
var Jobs = require('./components/jobs');
var Profile = require('./components/profile');
var Home = require('./components/home');

var UserUtil = require('./utils/userUtil');
var SessionUtil = require('./utils/session');
var SessionStore = require('./stores/session');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;

document.addEventListener('DOMContentLoaded', function () {
  Modal.setAppElement(document.body);
  ReactDOM.render(
    <Router history={hashHistory}>
      <Route path='/' component={App} onEnter={_ensureLoggedIn} >
        <IndexRoute component={Home} />
        <Route path='/users/:id' component={Profile} />
      </Route>

      <Route path='/login' component={LogIn} onEnter={_ensureLoggedOut} />
      <Route path='/signup' component={SignUp} onEnter={_ensureLoggedOut} />

    </Router>,
    document.getElementById('root')
  );
});

function _ensureLoggedIn(nextState, replace, callback) {
  if (!SessionStore.currentUserFound()) {
    SessionUtil.findCurrentUser(_redirectUnlessLoggedIn);
  } else {
    _redirectUnlessLoggedIn();
  }

  function _redirectUnlessLoggedIn() {
    if (!SessionStore.isLoggedIn()) {
      replace('/login');
    }
    callback();
  }
}

function _ensureLoggedOut(nextState, replace, callback) {
  if (!SessionStore.currentUserFound()) {
    SessionUtil.findCurrentUser(_redirectUnlessLoggedOut);
  } else {
    _redirectUnlessLoggedOut();
  }

  function _redirectUnlessLoggedOut() {
    if (SessionStore.isLoggedIn()) {
      replace('/');
    }
    callback();
  }
}
