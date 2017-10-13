let React = require('react');

module.exports = class SvgLoader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'content': '',
            'width': 24,
            'height': 24
        };
    }
    componentDidMount() {
        let request = new XMLHttpRequest();
        request.open("GET", this.props.src);
        request.setRequestHeader("Content-Type", "image/svg+xml");
        let that = this;
        request.addEventListener("load", function(event) {
            let response = event.target.responseText;
            let doc = new DOMParser();
            let xml = doc.parseFromString(response, "image/svg+xml");
            if (xml.firstChild.nodeName != 'svg') {
              console.error(that.props.src + ' is not a valid svg file.');
              return false;
            }
            let viewPort = xml.firstChild.getAttribute('viewBox').split(' ');
            let width = xml.firstChild.getAttribute('width'); 
            let height = xml.firstChild.getAttribute('height');
            that.setState({
                'content': xml.firstChild.innerHTML,
                'width': width || viewPort[2] || 24,
                'height': height || viewPort[3] || 24
            })
        })
        request.send();
    }
    render() {
        return React.createElement(
            'svg',
            {
                className: this.props.className,
                viewBox: '0 0 ' + this.state.width + ' ' + this.state.height,
                width: this.state.width,
                height: this.state.height,
                dangerouslySetInnerHTML: {__html: this.state.content}
            }
        );
    }
}
