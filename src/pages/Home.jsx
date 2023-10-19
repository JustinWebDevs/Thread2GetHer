// import { useContext } from "react";
// import { splitName } from "../utils/splitName";
// import { UserContext } from "../context/userContext";

import Thread from "../components/Thread";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/connections";


export default async function Home() {
  // const { user } = useContext(UserContext);

  // const { name, lastName } = splitName(userId);

  const threads = await getDocs(collection(db, "users"));
    console.log(threads)
    

  return (
    <div
      className="container-profile"
      style={{
        maxHeight: "100vh",
        height: "100%",
        minHeight: "100vh",
        overflowY: "auto",
      }}>
      <div>
        {
        // tempThreadData.map((item, index) => (
        //   <Thread
        //     key={`${index}`}
        //     id={item.id}
        //     title={item.title}
        //     content={item.content}
        //     image={item.image}
        //     timeStamp={item.timeStamp}
        //     deleteThread={null}
        //     updateThreads={null}
        //     reactions={item.reactions}
        //   />
        // ))
        }
      </div>
    </div>
  );
}
