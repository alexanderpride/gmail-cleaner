import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Main(props) {
  const location = useLocation();
  const { userId, accessToken } = location.state;
  const [threads, setThread] = useState([]);
  const [emails, setEmails] = useState([]);
  const [group, setGroup] = useState(new Map());

  useEffect(() => {
    const instance = axios.create({
      baseURL: `https://gmail.googleapis.com/`,
      headers: { authorization: "Bearer " + accessToken },
    });
    instance
      .get(`gmail/v1/users/${userId}/threads`)
      .then((res) => res.data)
      .then((data) => {
        console.log("we are here: ", data);
        setThread(data.threads);
      });

    instance
      .get(`gmail/v1/users/${userId}/messages`)
      .then((res) => res.data)
      .then((data) => {
        console.log("we are here with messagesssssss: ", data);
        data.messages.forEach((message) => {
          instance
            .get(`gmail/v1/users/${userId}/messages/${message.id}`)
            .then((res) => res.data)
            .then((localData) => {
              console.log(localData);
              message.message = localData;
              localData.payload.headers.forEach((obj) => {
                if (obj.name === "From") {
                  const arr = group.get(obj.value);
                  if (arr) {
                    arr.push(message);
                  } else {
                    group.set(obj.value, [message]);
                  }
                  setGroup(new Map(group));
                }
              });
              setEmails([...data.messages]);
            });
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flexGrow: 1 }}>
        <h1>Emails</h1>
        <ul>
          {emails.map((element) => {
            return (
              <li key={element.id}>
                {element.message
                  ? element.message.snippet.length > 100
                    ? element.message.snippet.substring(0, 100) + "..."
                    : element.message.snippet
                  : "Loading"}
              </li>
            );
          })}
        </ul>
      </div>
      <div style={{ flexGrow: 1 }}>
        <h1>Threads</h1>
        <ul>
          {threads.map((element) => {
            return (
              <li key={element.id}>
                {element.snippet.length > 100
                  ? element.snippet.substring(0, 100) + "..."
                  : element.snippet}
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        {Array.from(group.entries()).map((value) => {
          const from = value[0];
          const messages = value[1];

          return (
            <div>
              <h1>{from}</h1>
              <ul>
                {messages.map((messageInfo) => {
                  return <li>{messageInfo.id}</li>;
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Main;
