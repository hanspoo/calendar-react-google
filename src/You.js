import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { number, shape, string } from "prop-types";

var ZiShape = shape({
  access_token: string,
  expires_at: number,
  expires_in: number,
  first_issued_at: number,
  id_token: string,
  idpId: string,
  login_hint: string,
  scope: string,
  session_state: shape({
    extraQueryParams: shape({
      authuser: string
    })
  }),
  token_type: string
});

shape({
  El: string,
  Zi: ZiShape,
  accessToken: string,
  googleId: string,
  profileObj: shape({
    email: string,
    familyName: string,
    givenName: string,
    googleId: string,
    imageUrl: string,
    name: string
  }),
  tokenId: string,
  tokenObj: ZiShape,
  w3: shape({
    Eea: string,
    Paa: string,
    U3: string,
    ig: string,
    ofa: string,
    wea: string
  })
});

const API_KEY = "AIzaSyB5uk216spJfORFV-G-EiVHMmrPNtYAPEI";

const event = {
  summary: "Google I/O 2015",
  location: "800 Howard St., San Francisco, CA 94103",
  description: "A chance to hear more about Google's developer products.",
  start: {
    dateTime: "2019-02-01T09:00:00-07:00",
    timeZone: "America/Santiago"
  },
  end: {
    dateTime: "2019-02-01T17:00:00-07:00",
    timeZone: "America/Santiago"
  }
};

export default class App extends Component {
  state = { gapiReady: false, messsage: "", loggedIn: false, auth: null };
  loadYoutubeApi() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    script.onload = () => {
      window.gapi.load("client", () => {
        window.gapi.client.setApiKey(API_KEY);
        window.gapi.client.load("calendar", "v3", () => {
          this.setState({ gapiReady: true });
        });
      });
    };

    document.body.appendChild(script);
  }

  componentDidMount() {
    this.loadYoutubeApi();
  }

  agregarEvento = () => {
    var request = window.gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: event
    });
    request.execute(event => {
      console.log("event", event);
      if (event.error) {
        this.setState({ message: event.error.message });
      } else this.setState({ message: "Event created: " + event.htmlLink });
    });
  };

  onSuccessLogin = auth => {
    console.log("respuesta de success login", auth);
    this.setState({ loggedIn: true, auth });
  };
  onFailureLogin = a => {
    console.log("respuesta de failure", a);
    this.setState({ loggedIn: false, message: "Login fallido" });
  };
  render() {
    const { gapiReady, message, loggedIn, auth } = this.state;
    if (gapiReady) {
      return (
        <div>
          <p>
            {loggedIn ? "Logged in " + auth.profileObj.email : "Not logged in"}
          </p>
          <h1>GAPI is loaded and ready to use.</h1>
          <GoogleLogin
            clientId="958229799636-upj54qtq8g19tgohikkc970s3h6tpvpr.apps.googleusercontent.com"
            render={renderProps => (
              <button onClick={renderProps.onClick}>
                This is my custom Google button
              </button>
            )}
            buttonText="Login"
            onSuccess={this.onSuccessLogin}
            onFailure={this.onFailureLogin}
          />
          ,<button onClick={this.agregarEvento}>Agregar evento</button>
          <p>{message}</p>
        </div>
      );
    } else return <p>Cargando API</p>;
  }
}
