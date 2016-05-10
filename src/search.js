require('react-select/dist/react-select.min.css');
var React = require('react');
var Select = require('react-select');
var birdLocations = require('./index.js');

var Search = React.createClass({
    getInitialState() {
        return {
            options: [],
        };
    },

    componentWillMount() {
        this.getOptions();
    },

    getOptions() {
        birdLocations.getForAutoComplete().then(options => {
            this.setState({
                options,
            });
        });
    },

    loadOptions(input, callback) {
        var filtered = birdLocations.filterAutoComplete(input, this.state.options);
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