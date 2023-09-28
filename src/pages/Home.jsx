// import { useContext } from "react";
// import { splitName } from "../utils/splitName";
// import { UserContext } from "../context/userContext";

import Thread from "../components/Thread";

let tempThreadData = [
  {
    id: "ff1a2d6a-bfcc-4c05-aa16-e73e6452b128",
    title: "[求助] 如何在vue中使用echarts",
    content: "<p>我想在vue中使用echarts，但是不知道怎么引入。有没有人能帮忙看",
    timeStamp: 1695937387882,
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    reactions: {
      thread: 4,
      share: {
        value: 1,
        isShared: false,
      },
      like: {
        value: 2,
        isLiked: false,
      },
      view: 4,
    },
  },
  {
    id: "ff1a2d8a-bfcc-4c05-aa16-e73e6452b538",
    title: "Sarah Logan 😀",
    content: "<p>我想在vue中使用echarts，但是不知道怎么引入。有没有人能帮忙看",
    timeStamp: 1695937387871,
    image:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    reactions: {
      thread: 4,
      share: {
        value: 1,
        isShared: false,
      },
      like: {
        value: 2,
        isLiked: false,
      },
      view: 4,
    },
  },
];

export default function Home() {
  // const { user } = useContext(UserContext);

  // const { name, lastName } = splitName(userId);

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
        {tempThreadData.map((item, index) => (
          <Thread
            key={`${index}`}
            id={item.id}
            title={item.title}
            content={item.content}
            image={item.image}
            timeStamp={item.timeStamp}
            deleteThread={null}
            updateThreads={null}
            reactions={item.reactions}
          />
        ))}
      </div>
    </div>
  );
}
