import React from "react";
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-js";

class SpotifyWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      src:
        "https://open.spotify.com/embed?uri=spotify:user:invictusforever:playlist:2lW5hDsiy4vJj0AOfZlh9R",
      queue: []
    };

    // this.spotifyApi = new SpotifyWebApi();
    // this.spotifyApi.setAccessToken(
    //   "BQATmZZqDMJUdmFoISwoiA-mXHDjvR6vj0qgqR0LCOU8sYj1RoPLW6TxQqvTWvr6kh5tigBMEIxRegGfCNFYcP0VljFfsoWPfFCv9siT6danHxfBUfwYeydQfHdgBNIXSMR7HNY9gwKg2zlp1VuWW9nqLrx5snhmYZVIgJwR5WU"
    // );
    // this.spotifyApi
    //   .getArtistAlbums("4Z8W4fKeB5YxbusRsdQVPb", {
    //     limit: 10,
    //     offset: 20
    //   })
    //   .then(
    //     function(data) {
    //       console.log("Album information", data);
    //     },
    //     function(err) {
    //       console.error(err);
    //     }
    //   );

    this.getToken = async () => {
      const data = await axios.get("/api/token");
      console.log(data);
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
        <button onClick={() => this.getToken()}>Surprise me</button>
      </div>
    );
  }
}

export default SpotifyWidget;
