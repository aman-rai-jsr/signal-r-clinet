import React, {Component} from "react";
import * as signalR from "@aspnet/signalr";
class SignalRComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nick: "",
      message: "",
      messages: [],
      hubConnection: null,
    };
  }

  componentDidMount = () => {
    const nick = window.prompt("Your name:", "John");
    const hubUrl = "https://localhost:5001/notifications";
    const hubConnection = new signalR.HubConnectionBuilder().withUrl(hubUrl).build();

    this.setState({ hubConnection, nick }, () => {
      this.state.hubConnection
        .start()
        .then(() => console.log("Connection started!"))
        .catch((err) => console.log("Error while establishing connection :("));

      this.state.hubConnection.on("sendToAll", (nick, receivedMessage) => {
        const text = `${nick}: ${receivedMessage}`;
        const messages = this.state.messages.concat([text]);
        this.setState({ messages });
      });
    });
  };

  sendMessage = () => {
    this.state.hubConnection
      .invoke("sendToAll", this.state.nick, this.state.message)
      .catch((err) => console.error(err));

    this.setState({ message: "" });
  };

  render() {
    return (
      <div>
        <br />
        <input
          type="text"
          value={this.state.message}
          onChange={(e) => this.setState({ message: e.target.value })}
        />

        <button onClick={this.sendMessage}>Send</button>

        <div>
          {this.state.messages.map((message, index) => (
            <span style={{ display: "block" }} key={index}>
              {" "}
              {message}{" "}
            </span>
          ))}
        </div>
      </div>
    );
  }
}

export default SignalRComponent;
