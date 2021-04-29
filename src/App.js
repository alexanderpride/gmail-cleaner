import './App.css';
import React,{useState} from 'react'
import { GoogleLogin } from 'react-google-login';
import DisplayEmails from './DisplayEmails'
function App() {
const [login,setLogin] = useState(null);

const responseGoogle = (response) => {
  console.log(response)
  if(response.error){
    console.log("was error");
  }else{
    console.log("no err");
    console.log(response.qc);
    console.log(response.ft);
    console.log(response.tokenObj);
    console.log(response.profileObj);
    const userId = response.profileObj.googleId;
    const accessToken = response.tokenObj.access_token;
    setLogin({userId:userId,accessToken:accessToken})
  }

}
  
  return (
    <div className="App">
       {!login&&<header className="App-header">
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_KEY}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            scope="https://mail.google.com/"
            // responseType='code'
          />
      </header>}
      {login&& <DisplayEmails {...login}/>}
    </div>
  );
}

export default App;
