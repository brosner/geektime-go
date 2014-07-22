/** @jsx React.DOM */

var GeekTime = React.createClass({
    getInitialState: function() {
        return {};
    },
    calculateTime: function() {
        var d = new Date();
        var h = d.getUTCHours();
        var m = d.getUTCMinutes();
        var s = d.getUTCSeconds();
        var ms = d.getUTCMilliseconds();
        var geektime = Math.round(65536 * (3600000 * h + 60000 * m + 1000 * s + ms) / (24 * 60 * 60 * 1000));
        // geekchar
        var geekchar = "&#x" + geektime.toString(16) + ";"
        // geektime
        var padding = "";
        if (geektime < 0x1000) padding = "0";
        if (geektime < 0x100) padding = "00";
        if (geektime < 0x10) padding = "000";
        geektime = "0x" + padding + geektime.toString(16).toUpperCase();
        geektime_first = geektime.slice(0, 4);
        geektime_second = geektime.slice(4, 6);
        // geekdate
        var yy = d.getUTCFullYear();
        var mm = d.getUTCMonth();
        var dd = d.getUTCDate();
        var geekdate = Math.round((Date.UTC(yy, mm, dd) - Date.UTC(yy, 0, 1)) / (24 * 60 * 60 * 1000));
        padding = "";
        if (geekdate < 0x100) padding = "0";
        if (geekdate < 0x10) padding = "00";
        geekdate = "0x" + padding + geekdate.toString(16).toUpperCase();
        // end
        this.setState({
            first: geektime_first,
            second: geektime_second,
            date: geekdate,
            char: geekchar
        });
    },
    componentDidMount: function() {
        this.calculateTime();
        setInterval(this.calculateTime, this.props.updateInterval);
    },
    render: function() {
        return (
            <div>
                <a href={"/" + this.state.first + this.state.second} id="geektime">{this.state.first}<span className="minor">{this.state.second}</span></a>
                <div>on day <span id="geekdate">{this.state.date}</span></div>
                <div id="geekchar" dangerouslySetInnerHTML={{__html: this.state.char}} />
            </div>
        )
    }
});

React.renderComponent(
    <GeekTime updateInterval={650} />,
    document.getElementById("geekwrapper")
);
