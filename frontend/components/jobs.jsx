var React = require('react');

// var Filter = require('./jobs/filter');
// var Sidebar = require('./jobs/sidebar');
// var Posting = require('./jobs/posting');

var JobUtil = require('../utils/job');
var JobStore = require('../stores/job');

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
    var Index;

    if (this.state.jobs) {
      Index = this.state.jobs.map(function(job, index) {
          // <Posting key={ index } job={ job } />;
          <p>test</p>;
      });
    } else {
      Index = <p>Enter a new search</p>;
    }
    // <Filter />
    // <Sidebar />

    return (
      <div>
        { Index }
      </div>
    );



  }

});

module.exports = Jobs;
