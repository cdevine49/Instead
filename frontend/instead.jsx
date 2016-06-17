var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var App = require('./components/app');

var SignIn = require('./components/signIn');
var SignUp = require('./components/signUp');

var SessionStore = require('./stores/session');

var UserUtil = require('./utils/userUtil');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var hashHistory = ReactRouter.hashHistory; /* May be deprecated */
var IndexRoute = ReactRouter.IndexRoute;
// onEnter={_ensureLoggedIn}
document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <Router history={hashHistory}>
      <Route path='/' component={App} >
        <IndexRoute component={App} onEnter={_ensureLoggedIn} />
        <Route path='signin' component={SignIn}/>
        <Route path='signup' component={SignUp}/>
      </Route>


    </Router>,
    document.getElementById('root')
  );
});

function _ensureLoggedIn(nextState, replace, callback) {
  if (!SessionStore.currentUserFetched()) {
    UserUtil.fetchCurrentUser(_redirectUnlessLoggedIn);
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
