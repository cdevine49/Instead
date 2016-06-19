var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var App = require('./components/app');

var SignIn = require('./components/signIn');
var SignUp = require('./components/signUp');
var Jobs = require('./components/jobs/index');

var SessionStore = require('./stores/session');

var UserUtil = require('./utils/userUtil');
var SessionUtil = require('./utils/session');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var hashHistory = ReactRouter.hashHistory; /* May be deprecated */
var IndexRoute = ReactRouter.IndexRoute;

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <Router history={hashHistory}>
      <Route path='/' component={App} >
        <IndexRoute component={Jobs} onEnter={_ensureLoggedIn} />
      </Route>

      <Route path='signup' component={SignUp}/>
      <Route path='signin' component={SignIn}/>

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
      replace('/signin');
    }
    callback();
  }
}
