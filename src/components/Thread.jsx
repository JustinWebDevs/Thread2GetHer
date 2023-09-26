import React from "react";

export default function Thread(props) {
  const size = 100;

  const { title, content, image } = props;
  return (
    <button
      className="w-full"
      onClick={() => {
        console.log("FULL");
      }}
    >
      <hr className="hr" />
      <div className="flex flex-row thread-outer-container">
        <img
          className="avatar"
          style={{
            maxHeight: `${size}px`,
            maxWidth: `${size}px`,
          }}
          src={
            image ||
            `https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=`
          }
        />
        <div className="flex flex-col w-full">
          <div className="flex flex-col thread-container">
            <h2 className="text-title-thread">{title || "Title"}</h2>
            <p>
              {content ||
                `
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
                eaque corporis quis atque praesentium sapiente consequatur fuga!
                Error et doloremque minus magnam eius! Nihil molestiae consectetur
                in non, voluptate dolor!`}
            </p>
          </div>
          <div className="flex flex-row justify-between reaction-container">
            <button
              className="reaction-button"
              onClick={() => {
                console.log("1");
              }}
            >
              1
            </button>
            <button
              className="reaction-button"
              onClick={() => {
                console.log("2");
              }}
            >
              2
            </button>
            <button
              className="reaction-button"
              onClick={() => {
                console.log("3");
              }}
            >
              3
            </button>
            <button
              className="reaction-button"
              onClick={() => {
                console.log("4");
              }}
            >
              4
            </button>
          </div>
        </div>
      </div>
    </button>
  );
}
