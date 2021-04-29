import { useHistory } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
export default function Home(props){
    const history=useHistory();
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
          history.push({pathname: '/main',state:{userId:userId,accessToken:accessToken}})
        }
      
      }
    return<GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_KEY}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            scope="https://mail.google.com/"
            // responseType='code'
          />

}