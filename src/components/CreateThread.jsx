import { v4 as uuidv4 } from "uuid";
import { useState, useContext} from "react";
import { db } from "../firebase/connections";
import { collection, addDoc } from "firebase/firestore";
import { ThreadContext } from "../context/threadContext";

export default function CreateThread(name){
    const [threadContent, setThreadContent] = useState("");

    const { threads, saveThreads, update, deleteThread, updateThreads } =
    useContext(ThreadContext);

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
    
        try{
          await addDoc(collection(db, "threads"),  {
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
          alert("Thread guardado ");
      } catch (e){
        console.log(e);
        alert("Error ",e);
      }
    
        update();
        saveThreads(tempThread);
        setThreadContent("");
        // setPostDone(true);
        // setEnableButton(false);
      };
    
    return(
        <div>
            <form onSubmit={saveThreadData}>
                <textarea placeholder="Escribe tu mensaje" value={threadContent} 
                rows="4" cols="50"
                required
                minLength="5"
                maxLength="300"
                spellCheck="false"
                autoComplete="off"
                autoCapitalize="none" onChange={(e) => {setThreadContent(e.target.value)}}/>
                <button type="submit">Guardar</button>
            </form>
        </div>
    )
}