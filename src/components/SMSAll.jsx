import React, {useState} from 'react';
import styled from 'styled-components';
import { useUser } from "../context/UserProvider";

function SMSAll() {
  const [sms, setSms] = useState('');
  const [number, setNumber] = useState('');
  const { users } = useUser();

  const sendSms = (event) => {
    event.preventDefault();

    let smsObj = {
        mobile_number: '1' + number,
        message: sms,
    }

    
    users.forEach((user, key) => {
      //const [userData] = useState(user);
      console.log("sending text");

    
    fetch(`https://ExpressServer.darrenanimo.repl.co/send-text?recipient=${user.phoneNumber}&textmessage=${smsObj.message}`)
    .catch(err => console.error(err))
      })
  }
    
              


  const handleChange = (event) => {
    if (event.target.name === 'number') {
      setNumber(event.target.value);
    } else if (event.target.name === 'sms') {
      setSms(event.target.value);
    }
  
  }

  return (
    <Container>
      <Header>SMS All Volunteers (ill work on css of it by tonight)</Header>
      <Form onSubmit={sendSms}>
      
        <label>Message:</label>
        <TextArea name='sms' onChange={handleChange}></TextArea>
        <Button>Submit</Button>
      </Form>
    </Container>
  );
}

export default SMSAll;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #E8E2DC;
`

const Header = styled.h3`
  text-transform: uppercase;
  letter-spacing: 1px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;s
`

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 6px 0 4px;
`

const TextArea = styled.textarea`
  width: 100%;
  resize: vertical;
  padding: 12px;
  margin: 6px 0 4px;
  height: 100px;
`

const Button = styled.button`
  width: 180px;
  padding: 12px 25px;
  margin: 6px 0 4px;
  font-size: 12px;
  text-transform: uppercase;
  color: white;
  background-color: black;
  letter-spacing: 1px;
  &:hover {
    cursor: pointer;
  }
`