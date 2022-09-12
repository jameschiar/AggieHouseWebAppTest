import React, { Component } from 'react';
//import './SMSForm.css';
class SMSIndividual extends Component {

  state = {
    text: {
      recipient: '',
      textmessage: ''
    }
  }

  sendText = _ => {
    const { text } = this.state;
    //pass text message GET variables via query string
    fetch(`https://ExpressServer.darrenanimo.repl.co/send-text?recipient=${text.recipient}&textmessage=${text.textmessage}`)
    .catch(err => console.error(err))
    
  }

  render() {
    const { text } = this.state;
    const spacer = {
      margin: 8
    }
    const textArea = {
      borderRadius: 4
    }
    return (
      <main> 
          <a href="https://replit.com/@darrenanimo/ExpressServer#index.js">For now to use make sure this replit server is running</a>
          <h2> Send Text Message to a Volunteer</h2>
        <h3>method to choose volunteer should be dif</h3>
          <label> Your Phone Number (ex: +19166477953)</label>
          <br />
          <input value={text.recipient}
            onChange={e => this.setState({ text: { ...text, recipient: e.target.value } })} />
          <div style={spacer} />
          <label> Message </label>
          <br />
          <textarea rows={3} value={text.textmessage} style={textArea}
            onChange={e => this.setState({ text: { ...text, textmessage: e.target.value } })} />
          <div style={spacer} />
          <button onClick={this.sendText}> Send Text </button>
        </main>
    );
  }
}

export default SMSIndividual;