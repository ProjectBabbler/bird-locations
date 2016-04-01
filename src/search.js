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
        birdLocations.getAll().then(locs => {
            var options = [];
            for (var code in locs) {
                var loc = locs[code];
                options.push({
                    value: code,
                    label: birdLocations.getNiceName(loc),
                });
            }

            this.setState({
                options,
            });
        });
    },

    loadOptions(input, callback) {
        var filtered = this.state.options.filter(o => {
            return o.label.toLowerCase().match(input);
        });
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
            />
        );
    },
});

module.exports = Search;