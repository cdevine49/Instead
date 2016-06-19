var React = require('react');

var Filter = require('./filter');
var Sidebar = require('./sidebar');
var Posting = require('./posting');

var JobUtil = require('../../utils/job');
var JobStore = require('../../stores/job');

var Jobs = React.createClass({

  getInitialState: function() {
    return {
      jobs: null,
      page: 1,
      per: 10
    };
  },

  componentDidMount: function() {
    this.jobStoreToken = JobStore.addListener(this._onChange);
  },

  _onChange: function() {
    var jobs = JobStore.all();
    var page = JobStore.meta().page;
    var per = JobStore.meta().per;

    this.setState({ jobs: jobs, page: page, per: per });
  },

  render: function() {
    var Previews = "Enter a new search";

    if (this.state.jobs) {
      Previews = this.state.jobs.map(function(job, index) {
          <Posting key={ index } job={ job } />;
      });
    }

    return (
      <div>
        <Filter />
        <Sidebar />
        { Previews }
      </div>
    );



  }

});

module.exports = Jobs;
