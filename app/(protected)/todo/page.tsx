"use client";
import React from "react";

function Boards() {
  const fetchData = async () => {
    const res = await fetch(`/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  return <div>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
      <h1>Boards</h1>
  </div>;
}

export default Boards;
