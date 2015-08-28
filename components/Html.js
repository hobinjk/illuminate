import React from 'react';

class Html extends React.Component {
  render() {
    return (
        <html>
        <head>
            <meta charSet="utf-8" />
            <title>{this.props.title}</title>
            <meta name="viewport" content="width=device-width, user-scalable=no" />
            <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.5.0/pure-min.css" />
        </head>
        <body>
            <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
        </body>
        <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
        <script src={'/public/js/' + this.props.clientFile}></script>
        </html>
    );
  }
}

export default Html;
