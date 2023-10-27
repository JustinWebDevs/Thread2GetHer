import React, { useState, useEffect } from "react";
import { getDate } from "../utils/date";
import {
  FaRetweet,
  FaRegComment,
  FaRegHeart,
  FaHeart,
  FaRegChartBar,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Thread(props) {
  const history = useNavigate();
  const size = 100;

  const {
    id,
    title,
    content,
    image,
    timeStamp,
    deleteThread,
    updateThreads,
    reactions,
  } = props;

  const [isLiked, setIsLiked] = useState(reactions.like.isLiked);
  const [isShared, setIsShared] = useState(reactions.share.isShared);
  const [currentReactions, setCurrentReactions] = useState(reactions);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) {
      let currentShare = { ...currentReactions.share };

      setCurrentReactions({
        ...currentReactions,
        share: {
          value: isShared ? currentShare.value + 1 : currentShare.value - 1,
          isShared: isShared,
        },
      });
    }
  }, [isShared]);

  useEffect(() => {
    if (loaded) {
      let currentLike = { ...currentReactions.like };

      setCurrentReactions({
        ...currentReactions,
        like: {
          value: isLiked ? currentLike.value + 1 : currentLike.value - 1,
          isLiked: isLiked,
        },
      });
    }
  }, [isLiked]);

  useEffect(() => {
    if (loaded) {
      updateThreads({
        id,
        title,
        content,
        image,
        timeStamp,
        reactions: currentReactions,
      });
    }
  }, [currentReactions]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const expandThread = (threadId) => {
    history(`/threadExpanded/${threadId}`);
  }

  return (
    <div className="w-full">
      <hr className="border-t border-gray-400 my-4" />
      <div className="flex flex-row p-4">
        <div className="avatar" style={{ maxHeight: `${size}px`, maxWidth: `${size}px` }}>
          <div
            style={{
              backgroundImage: `url(${
                image ||
                "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
              })`,
            }}
            className="h-full w-full bg-center bg-cover bg-no-repeat"
          ></div>
        </div>
        <div className="flex flex-col w-full">
          <div className="p-4 bg-white shadow-md rounded-lg cursor-pointer" onClick={() => { expandThread(id) }}>
            <h2 className="text-lg text-title-thread font-bold">
              {`${title}` || "Title"} ·{" "}
              <span className="text-sm font-semibold">{getDate(timeStamp)}</span>
            </h2>
            <p className="mt-2">{content || ""}</p>
          </div>
          <div className="p-4 bg-gray-100 mt-4 rounded-b-lg">
            <div className="flex flex-row justify-between reaction-container">
              <button
                className="reaction-button blue"
                onClick={() => {
                  console.log("1");
                }}
              >
                <FaRegComment style={{ marginRight: "10px" }} />
                {currentReactions.thread}
              </button>
              <button
                className={`reaction-button ${isShared ? "green" : "blue"}`}
                onClick={() => {
                  setIsShared(!isShared);
                  console.log("Clicking", id);
                }}
              >
                <FaRetweet style={{ marginRight: "10px" }} /> {currentReactions.share.value}
              </button>
              <button
                className="reaction-button red"
                onClick={() => {
                  setIsLiked(!isLiked);
                  console.log("3");
                }}
              >
                {isLiked ? <FaHeart style={{ marginRight: "10px" }} /> : <FaRegHeart style={{ marginRight: "10px" }} />}{" "}
                {currentReactions.like.value}
              </button>
              <button
                className="reaction-button blue"
                onClick={() => {
                  deleteThread(id);
                  console.log("4");
                }}
              >
                <FaRegChartBar style={{ marginRight: "10px" }} /> {reactions.view}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
