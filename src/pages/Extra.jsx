import React, { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/connections";
import { useEffect, useContext } from "react";
import Thread from "../components/Thread"
import { ThreadContext } from "../context/threadContext";
import CreateThread from "../components/CreateThread";


export default function Extra() {

  const [threadInfo, setThreadInfo] = useState();

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

  console.log(threadInfo);

  useEffect(() => {
    getThreads();
  }, []);

  return (
    <div>
      <CreateThread/>
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
