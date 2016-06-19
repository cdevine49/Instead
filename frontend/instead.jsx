var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var App = require('./components/app');
var SignUp = require('./components/signUp');
var Jobs = require('./components/jobs');

var UserUtil = require('./utils/userUtil');
var SessionUtil = require('./utils/session');
var SessionStore = require('./stores/session');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;
// onEnter={_ensureLoggedIn}
document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <Router history={hashHistory}>
      <Route path='/' component={App} >
        <IndexRoute component={Jobs} />
      </Route>

      <Route path='/signup' component={SignUp}/>
      <Route path='/signin' />

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
      replace('/signup');
    }
    callback();
  }
}
