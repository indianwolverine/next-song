import React from 'react';

class SCWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      src:
        'https://w.soundcloud.com/player/?url=http://api.soundcloud.com/users/1539950/favorites',
      queue: []
    };

    this.funTimes = () => {
      console.log('hi there');
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
          frameBorder="no"
        />

        <iframe
          src="https://open.spotify.com/embed?uri=spotify:user:invictusforever:playlist:2lW5hDsiy4vJj0AOfZlh9R"
          width="300"
          height="380"
          frameborder="0"
          allowtransparency="true"
          allow="encrypted-media"
        />
        <button onClick={() => this.funTimes()}>Surprise me</button>
      </div>
    );
  }
}

export default SCWidget;
