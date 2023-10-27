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
      <hr className="hr" />
      <div className="flex flex-row thread-outer-container" >
        <div
          className="avatar"
          style={{
            maxHeight: `${size}px`,
            maxWidth: `${size}px`,
            backgroundImage: `url(${
              image ||
              "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
            })`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}></div>
        <div className="flex flex-col w-full">
          <div className="flex flex-col thread-container" onClick={() => {expandThread(id)}}>
            <h2>
              <span className="text-title-thread">{`${title}` || "Title"}</span>
              {" · "}
              <span style={{ fontSize: ".75rem", fontWeight: "500" }}>
                {getDate(timeStamp)}
              </span>
            </h2>
            <p>{content || ``}</p>
          </div>
          <div className="flex flex-row justify-between reaction-container">
            <button
              className="reaction-button blue"
              onClick={() => {
                console.log("1");
              }}>
              <FaRegComment style={{ marginRight: "10px" }} />
              {currentReactions.thread}
            </button>
            <button
              className={`reaction-button ${isShared ? "green" : "blue"}`}
              onClick={() => {
                setIsShared(!isShared);
                console.log("Clicking", id);
              }}>
              <FaRetweet style={{ marginRight: "10px" }} />{" "}
              {currentReactions.share.value}
            </button>
            <button
              className="reaction-button red"
              onClick={() => {
                setIsLiked(!isLiked);
                console.log("3");
              }}>
              {isLiked ? (
                <FaHeart style={{ marginRight: "10px" }} />
              ) : (
                <FaRegHeart style={{ marginRight: "10px" }} />
              )}{" "}
              {currentReactions.like.value}
            </button>
            <button
              className="reaction-button blue"
              onClick={() => {
                deleteThread(id);
                console.log("4");
              }}>
              <FaRegChartBar style={{ marginRight: "10px" }} /> {reactions.view}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
