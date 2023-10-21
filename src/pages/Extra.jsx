import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/connections";
import { useEffect } from "react";

export default function Extra() {
  useEffect(() => {
    (async () => {
      const threads = await getDocs(collection(db, "users"));
      console.log(threads);
    })();
  }, []);

  return <div>AAAA</div>;
}
