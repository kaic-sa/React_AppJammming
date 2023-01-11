let acessToken = "";
const clientID = "986daf19fd3f4cdca2954945021d0a46";
const redirectURI = "http://localhost:3000/";

const Spotify = {
  savePlaylist(playlistName, trackURIs) {
    if (!playlistName || !trackURIs.lenght) {
      return;
    }
    const acessToken = Spotify.getAcessToken();
    const headers = { Authorization: `Bearer ${acessToken}` };
    let userId = "";
    return fetch(`https://api.spotify.com/v1/me`, { headers: headers })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: "POST",
          body: JSON.stringify({
            name: playlistName,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((jsonResponse) => {
            let playlistId = jsonResponse.id;
            return fetch(
              `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
              { headers: headers, method: "POST", data: { trackURIs } }
            );
          });
      });
  },

  search(term) {
    const acessToken = Spotify.getAcessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: { Authorization: `Bearer ${acessToken}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (!jsonResponse) {
          return [];
        }
        return jsonResponseResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      });
  },
  getAcessToken() {
    //verifica se o token de acesso requerido pelo implicit grant flow da api do spotify já foi retornado na url, se não, recupera e retorna esse token, e seta um tempo de vida para o mesmo.
    if (acessToken) {
      return acessToken;
    }
    const acessTokenMatch = window.location.href.match(/acess_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (acessTokenMatch && expiresInMatch) {
      acessToken = acessTokenMatch[1];
      expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (acessToken = ""), expirationIn * 1000);
      window.history.pushState("Acess token", null, "/");
      return acessToken;
    } else {
      const acessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = acessUrl;
    }
  },
};

export default Spotify;
