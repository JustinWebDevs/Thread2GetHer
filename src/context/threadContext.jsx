import React, { createContext, useEffect, useState } from "react";
const ThreadContext = createContext();

function compareTimestampsDESC(a, b) {
  return b.timeStamp - a.timeStamp;
}

function ThreadProvider({ children }) {
  const [threads, setThreads] = useState([]);
  const [updateData, setUpdateData] = useState(true);

  useEffect(() => {
    // localStorage.removeItem("threads");
    orderTodos();
  }, []);

  useEffect(() => {
    // localStorage.removeItem("threads");
    orderTodos();
  }, [updateData]);

  const orderTodos = () => {
    let storedThreads = localStorage.getItem("threads");
    let jsonTodos = JSON.parse(storedThreads);

    let orderedThreads =
      jsonTodos !== null ? jsonTodos.sort(compareTimestampsDESC) : [];

    // console.log(orderedThreads);
    if (storedThreads) {
      setThreads(orderedThreads);
    }
  };

  const saveThread = (data) => {
    let tempThreads = [...threads, data];
    setThreads(tempThreads);
    localStorage.setItem("threads", JSON.stringify(tempThreads));
  };

  const saveThreads = (updatedThreads) => {
    setThreads(updatedThreads);
    localStorage.setItem("threads", JSON.stringify(updatedThreads));
  };

  const updateThreads = (updatedThread) => {
    // console.log("UPDATE TODO", updatedTodo);
    const updatedThreads = threads.map((thread) =>
      thread.id === updatedThread.id ? updatedThread : thread
    );
    saveThreads(updatedThreads);
    console.log("THREADS:", updatedThreads);
    console.log(updatedThread);

    update();
  };

  const deleteThread = (threadId) => {
    const updatedThread = threads.filter((thread) => thread.id !== threadId);
    saveThreads(updatedThread);
    update();
  };

  const update = async () => {
    setUpdateData(!updateData);
  };

  return (
    <ThreadContext.Provider
      value={{
        threads,
        setThreads,
        saveThreads: saveThread,
        updateThreads,
        deleteThread,
        update,
      }}
    >
      {children}
    </ThreadContext.Provider>
  );
}

export { ThreadContext, ThreadProvider };
