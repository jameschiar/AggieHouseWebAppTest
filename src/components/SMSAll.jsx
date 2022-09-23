import React, { Component } from 'react';
import { useUser } from "../context/UserProvider";

import { db } from "../firebase-config";
import { collection, deleteDoc, doc, updateDoc, addDoc, onSnapshot } from "@firebase/firestore";

class SMSAll extends Component {

  state = {
    text: {
      recipient: '',
      textmessage: '',
    },
  };

  

  sendText = (volunteer) => {
    const { text } = this.state;
    
    fetch(`https://ExpressServer.darrenanimo.repl.co/send-text?recipient=${volunteer}&textmessage=${text.textmessage}`)
    .catch(err => console.error(err))
  }

  
  
  sendAll = _ => {
    
    const { text } = this.state;

    //{users.map((user, key) => {
      //const [userData] = useState(user);
      console.log("sending text");
      
      fetch(`https://ExpressServer.darrenanimo.repl.co/send-text?recipient=${userData.phoneNumber}&textmessage=${text.textmessage}`)
    .catch(err => console.error(err))
        //})}
  };

  render() {
    const { text } = this.state;
    const spacer = {
      margin: 8
    }
    const textArea = {
      borderRadius: 4
    }

    //const { users } = useUser();

    
    return (
      <main> 
          <h2> Send Text Message to All Volunteers</h2>
          
          <div style={spacer} />
          <label style={{margin:'10px'}}> Message: </label>
          <br />
          <textarea className='inputText' rows={3} value={text.textmessage} style={textArea}
            onChange={e => this.setState({ text: { ...text, textmessage: e.target.value } })} /><br/>
          <button onClick={this.sendAll} className='mini-button'> Send Text </button>

        
        </main>
    );
  }
}

export default SMSAll;