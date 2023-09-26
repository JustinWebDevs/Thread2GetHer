// import { useContext } from "react";
// import { splitName } from "../utils/splitName";
// import { UserContext } from "../context/userContext";

import Thread from "../components/Thread";

let tempThreadData = [
  {
    id: 1024368957,
    title: "[求助] 如何在vue中使用echarts",
    content: "<p>我想在vue中使用echarts，但是不知道怎么引入。有没有人能帮忙看",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
  },
  {
    id: 1024368954,
    title: "Sarah Logan 😀",
    content: "<p>我想在vue中使用echarts，但是不知道怎么引入。有没有人能帮忙看",
    image:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
      }}
    >
      <div>
        {tempThreadData.map((item, index) => (
          <Thread
            key={`${index}`}
            title={item.title}
            content={item.content}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}
