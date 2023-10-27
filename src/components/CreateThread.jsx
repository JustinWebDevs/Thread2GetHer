import { v4 as uuidv4 } from "uuid";
import { useState, useContext } from "react";
import { db } from "../firebase/connections";
import { collection, addDoc } from "firebase/firestore";
import { ThreadContext } from "../context/threadContext";

export default function CreateThread(name) {
  const [threadContent, setThreadContent] = useState("");
  const { threads, saveThreads, update, deleteThread, updateThreads } = useContext(ThreadContext);

  const maxCharLimit = 300; // Límite máximo de caracteres

  const saveThreadData = async (e) => {
    e.preventDefault();
    const uniqueId = uuidv4();
    const currentTimestamp = Date.now();

    const tempThread = {
      id: uniqueId,
      title: name,
      content: threadContent,
      timeStamp: currentTimestamp,
      reactions: {
        thread: 0,
        share: {
          value: 0,
          isShared: false,
        },
        like: {
          value: 0,
          isLiked: false,
        },
        view: 0,
      },
    };

    try {
      await addDoc(collection(db, "threads"), {
        id: uniqueId,
        title: name,
        content: threadContent,
        timeStamp: currentTimestamp,
        reactions: {
          thread: 0,
          share: {
            value: 0,
            isShared: false,
          },
          like: {
            value: 0,
            isLiked: false,
          },
          view: 0,
        },
      });
      alert("Thread guardado");
    } catch (e) {
      console.log(e);
      alert("Error ", e);
    }

    update();
    saveThreads(tempThread);
    setThreadContent("");
  };

  return (
    <div>
      <form onSubmit={saveThreadData}>
        <div className="relative">
          <textarea
            placeholder="Escribe tu mensaje"
            value={threadContent}
            rows="4"
            cols="50"
            required
            minLength="5"
            maxLength={maxCharLimit}
            spellCheck="false"
            autoComplete="off"
            autoCapitalize="none"
            className="w-full mt-2"
            onChange={(e) => {
              setThreadContent(e.target.value);
            }}
          />
          {/* Muestra la cantidad de caracteres restantes dentro del textarea */}
          <span className="absolute right-2 bottom-2 text-sm text-gray-500">
            {maxCharLimit - threadContent.length} caracteres restantes
          </span>
        </div>
        <button
          type="submit"
          className="w-full mt-0 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}
