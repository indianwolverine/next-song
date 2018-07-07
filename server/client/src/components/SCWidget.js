import React from 'react';

class SCWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      src:
        'https://open.spotify.com/embed?uri=spotify:user:invictusforever:playlist:2lW5hDsiy4vJj0AOfZlh9R',
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
          src={this.state.src}
          width="300"
          height="380"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
        />
        <hr />
        <button onClick={() => this.funTimes()}>Surprise me</button>
      </div>
    );
  }
}

export default SCWidget;
