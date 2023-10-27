import React, { useState } from "react";
import { UserContext } from "../context/userContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/connections";
import { useEffect, useContext } from "react";
import Thread from "../components/Thread"
import { ThreadContext } from "../context/threadContext";
import CreateThread from "../components/CreateThread";
import {auth} from "../firebase/connections"
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

export default function Extra() {

  const [threadInfo, setThreadInfo] = useState();

  const [currentUser, setCurrentUser] = useState();
  const [name, setName] = useState();

  const { threads, saveThreads, update, deleteThread, updateThreads } =
    useContext(ThreadContext);

  const getThreads = async () => {
      const threadInfoElement = [];

    const querySnapshot = await getDocs(collection(db, "threads"));
      querySnapshot.forEach((doc) => {
        threadInfoElement.push(doc);
      });

      setThreadInfo(threadInfoElement);
  }

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (!userAuth) {
        setName('Anonimo');
      }else{
        setCurrentUser(userAuth)
      }
    });
  }, []);

  useEffect(() => {
    const setNameUser = async () => {
      const docRes = await getDoc(doc(db, "users", currentUser.uid))
  
      const data = {
        first: docRes.data().first,
        last: docRes.data().last
      }
  
      setName(`${data.first} ${data.last}`);
      console.log(name)
    }

    setNameUser();
  }, [currentUser]);

  useEffect(() => {
    getThreads();
  }, []);

  return (
    <div className=" bg-gray-200">
      <CreateThread name={name}/>
      {threadInfo ? (
        threadInfo.map((item, index) => (
          <Thread
            key={`${index}`}
            id={item.data().id}
            title={item.data().title}
            content={item.data().content}
            image={item.data().image}
            timeStamp={item.data().timeStamp}
            deleteThread={deleteThread}
            updateThreads={updateThreads}
            reactions={item.data().reactions}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
