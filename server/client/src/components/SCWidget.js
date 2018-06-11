import React from 'react';

class SCWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      src:
        'https://w.soundcloud.com/player/?url=http://api.soundcloud.com/users/1539950/favorites',
      message: '',
      messages: []
    };
  }
  render() {
    return (
      <div>
        <iframe
          title="SCWidget"
          id="sc-widget"
          src={this.state.src}
          width="100%"
          height="465"
          scrolling="no"
          frameborder="no"
        />
      </div>
    );
  }
}

export default SCWidget;
