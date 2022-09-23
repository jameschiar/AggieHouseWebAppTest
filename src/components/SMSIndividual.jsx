import React, { Component } from "react";

class SMSIndividual extends Component {
  state = {
    text: {
      recipient: "",
      textmessage: "",
    },
  };

  sendText = (_) => {
    const { text } = this.state;
    console.log("sending text");
    //pass text message GET variables via query string
    fetch(
      `http://localhost:5173/send-text?recipient=${text.recipient}&textmessage=${text.textmessage}`
    )
      .then((msg) => console.log(msg))
      .catch((err) => console.error(err));
  };

  render() {
    const { text } = this.state;
    const spacer = {
      margin: 8,
    };
    const textArea = {
      borderRadius: 4,
    };
    return (
      <main>
        <h2> Send Text Message to a Volunteer</h2>

        <label style={{ margin: "10px" }}>
          {" "}
          Your Phone Number (ex: +19166477953)
        </label>
        <br />
        <input
          className="inputText"
          value={text.recipient}
          onChange={(e) =>
            this.setState({ text: { ...text, recipient: e.target.value } })
          }
        />
        <div style={spacer} />
        <label style={{ margin: "10px" }}> Message: </label>
        <br />
        <textarea
          className="inputText"
          rows={3}
          value={text.textmessage}
          style={textArea}
          onChange={(e) =>
            this.setState({ text: { ...text, textmessage: e.target.value } })
          }
        />
        <div style={spacer} />
        <button onClick={this.sendText} className="mini-button">
          {" "}
          Send Text{" "}
        </button>
      </main>
    );
  }
}

export default SMSIndividual;
