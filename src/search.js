require('react-select/dist/react-select.min.css');
var React = require('react');
var Select = require('react-select');
var birdLocations = require('./index.js');

var Search = React.createClass({
    getInitialState() {
        return {
            index: null,
        };
    },

    componentWillMount() {
        this.getOptions();
    },

    getOptions() {
        birdLocations.getIndex().then(index => {
            this.setState({
                index,
            });
        });
    },

    loadOptions(input, callback) {
        var filtered = this.state.index ? this.state.index.searchResults(input) : [];
        var limited = filtered.slice(0, 10);

        callback(null, {
            options: limited
        });
    },

    render() {
        return (
            <Select.Async
                {...this.props}
                loadOptions={this.loadOptions}
                filterOptions={(r) => { return r; }}
            />
        );
    },
});

module.exports = Search;