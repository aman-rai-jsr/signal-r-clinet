import React from "react";
import { HubConnection } from "signalr-client-react";

function SignalRComponent() {
  let [messages, setMessages] = React.useState(["Some dummy message"]);

  // Hub Url
  const hubUrl = "/test";

  let connection = new HubConnection(hubUrl);

  // add second parameter if any configurtions needs to be added except the Hub URL as show below
  // let connection = new HubConnection(hubUrl,{});

  // to intially connect with hub when componet renders
  React.useEffect(() => {
    start();
  });

  // function which holds the code for creating a connection
  async function start() {
    try {
      await connection.start();
      console.log("connected");
    } catch (err) {
      console.log(err);
      // Try to reconnect if fails
      setTimeout(() => start(), 5000);
    }
  }

  // Reconnect when connection drop
  connection.onclose(async () => {
    await start();
  });

  // Update the event listner name as per the Hub
  connection.on("newMessage", (data) => {
    console.log(data);
    let temp = messages;
    temp.push(data);
    setMessages([...temp]);
  });

  const renderMessages = () => {
    return messages.map((message) => {
      return <div>{JSON.stringify(message)}</div>;
    });
  };

  return (
    <>
      <h1>Hello it works</h1>
      <div>{renderMessages()}</div>
    </>
  );
}

export default SignalRComponent;
