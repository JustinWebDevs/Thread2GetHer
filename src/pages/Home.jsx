import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { splitName } from "../utils/splitName";
import { UserContext } from "../context/userContext";

export default function Home() {
  const { user } = useContext(UserContext);

  const { userId } = useParams();
  const { name, lastName } = splitName(userId);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-3">
        {name} {lastName}
      </h1>
      {/* <p>{localStorage.getItem("personalInfo")}</p> */}
      <p>{user.name}</p>
      <p>{user.lastName}</p>
      {/* <p>{user.name}</p> */}
    </div>
  );
}
