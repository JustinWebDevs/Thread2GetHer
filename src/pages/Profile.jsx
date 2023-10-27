import { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { UserContext } from "../context/userContext";
import { ThreadContext } from "../context/threadContext";
import Thread from "../components/Thread";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase/connections";
import { collection, addDoc, doc, getDoc } from "firebase/firestore"; 
import {auth} from "../firebase/connections"
import { onAuthStateChanged } from "firebase/auth";
import { data } from "autoprefixer";

const imageSize = 120;

export default function Profile() {
  const { t } = useTranslation(["translation"]);

  const { user, saveUser } = useContext(UserContext);
  const { threads, saveThreads, update, deleteThread, updateThreads } =
    useContext(ThreadContext);

  const [currentUser, setCurrentUser] = useState(user);
  const [currentThread, setCurrentThread] = useState(user);
  const [postDone, setPostDone] = useState(false);
  const [enableButton, setEnableButton] = useState(false);
  const [name, setName] = useState('');


  const getUserData = async () => {
    const docRes = await getDoc(doc(db, "users", currentUser.uid))

    const data = {
      first: docRes.data().first,
      last: docRes.data().last
    }

    return data
  }
  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (!userAuth) {
        history(`/home`);
      }else{
        setCurrentUser(userAuth)
      }
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser.displayName) {
        setName(currentUser.displayName);
      } else {
        try {
          const userData = await getUserData();
          console.log(userData);
          setName(`${userData.first} ${userData.last}`);
        } catch (error) {
          console.error("Error al obtener datos del usuario:", error);
        }
      }
    }
  
    fetchData();
  }, [currentUser]);

  // useEffect(() => {
  //   setCurrentUser(user);
  //   // console.log(user);
  // }, [user]);

  useEffect(() => {
    if (postDone) {
      setCurrentThread({ content: "" });
      setPostDone(false);
    }
  }, [postDone]);

  // const handleUserData = (e) => {
  //   // e.preventDefault();
  //   const value = e.target.value;
  //   let temporalUserData = { ...user, [e.target.name]: value };
  //   setCurrentUser(temporalUserData);
  //   console.log("USER HANDLE", temporalUserData);
  // };

  // const saveUserData = (e) => {
  //   e.preventDefault();
  //   saveUser(currentUser);
  // };

  const handleThreadData = (e) => {
    // e.preventDefault();
    const value = e.target.value;
    let temporalThreadData = { [e.target.name]: value };
    setCurrentThread(temporalThreadData);

    if (temporalThreadData.content.length > 0) {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
  };

  const saveThreadData = async (e) => {
    e.preventDefault();
    const uniqueId = uuidv4();
    const currentTimestamp = Date.now();
    // const currentDate = new Date(currentTimestamp);

    const tempThread = {
      id: uniqueId,
      title: name,
      content: currentThread.content,
      timeStamp: currentTimestamp,
      image: user.image ? user.image : "",
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
      content: currentThread.content,
      timeStamp: currentTimestamp,
      image: user.image ? user.image : "",
      reactions: {
        thread: Math.floor(Math.random() * 10 + 1),
        share: {
          value: Math.floor(Math.random() * 10 + 1),
          isShared: false,
        },
        like: {
          value: Math.floor(Math.random() * 10 + 1),
          isLiked: false,
        },
        view: Math.floor(Math.random() * 10 + 1),
      },
    });
      alert("Thread guardado ");
  } catch (e){
    console.log(e);
    alert("Error ",e);
  }

    update();
    saveThreads(tempThread);
    setPostDone(true);
    setEnableButton(false);
  };

  return (
    <>
      <div
        className="container-profile"
        style={{
          minHeight: "100vh",
          maxHeight: "100vh",
          height: "100%",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <div>
          <div
            style={{
              maxHeight: "380px",
              minHeight: "380px",
              marginBottom: `${2 * imageSize * 0.7}px`,
              backgroundImage: `url(${user.background})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              position: "relative",
            }}
          >
            <img
              src={`${user.image}`}
              style={{
                position: "relative",
                borderRadius: "50%",
                maxHeight: `${2 * imageSize}px`,
                maxWidth: `${2 * imageSize}px`,
                height: "100%",
                width: "100%",
                bottom: `-${380 - imageSize}px`,
                left: `calc(50% - ${imageSize}px)`,
                right: `calc(50% - ${imageSize}px)`,
                zIndex: 1,
              }}
            />
          </div>

          <h2 className="text-3xl font-bold mb-3 text-center text-gray-800">
            {name}
          </h2>

          <h3 className="text-xl text-center mb-4">
            {currentUser.description || ""}
          </h3>
          <h2 className="text-3xl font-bold mb-3 text-center">Threads</h2>
          <form>
            <input
              type="text"
              placeholder={"Write your content here"}
              name="content"
              value={currentThread.content}
              onChange={(e) => handleThreadData(e)}
              className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              className={`button-add-threads mb-px ${
                enableButton ? "button-enable" : "button-disable"
              }`}
              onClick={(e) => saveThreadData(e)}
              disabled={!enableButton}
            >
              Add a thread
            </button>
          </form>

          {threads.length !== 0 &&
            threads.map((item, index) => (
              <Thread
                key={`${index}`}
                id={item.id}
                title={item.title}
                content={item.content}
                image={item.image}
                timeStamp={item.timeStamp}
                deleteThread={deleteThread}
                updateThreads={updateThreads}
                reactions={item.reactions}
              />
            ))}

          {threads.length === 0 && (
            <div className="flex justify-center items-center">
              No Threads posted yet
            </div>
          )}
        </div>
      </div>
    </>
  );
}
