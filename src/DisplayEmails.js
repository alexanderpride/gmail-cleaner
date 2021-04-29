import React,{useEffect,useState} from 'react'
import axios from 'axios';

function DisplayEmails({userId,accessToken}) {
    const [emails,setEmails] = useState([])

    
    useEffect(()=>{
        const instance = axios.create({   baseURL: `https://gmail.googleapis.com/`,     headers :{ 'authorization': 'Bearer ' + accessToken } })
        instance.get(`gmail/v1/users/${userId}/threads`).then(res=>res.data).then(data=>{console.log("we are here: ",data);setEmails(data.threads)});

    },[])
    return (
        <div>
            <h1>Emails</h1>
            <ul>
            {emails.map(element => {
                console.log("element:",element);
                return <li>{element.snippet.length>100 ? element.snippet.substring(0,100)+"..." :element.snippet }</li>
            })}
            </ul>
        </div>
    )
}



export default DisplayEmails

