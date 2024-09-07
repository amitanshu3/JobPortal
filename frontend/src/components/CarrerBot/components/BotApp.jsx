import React from "react";
import "./App.css";
import Sidebar from "./sidebar/Sidebar";
import Main from "./main/Main";
import Navbar from "@/components/shared/Navbar";

const BotApp = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-[0px] p-0">
        <Sidebar></Sidebar>
        <Main></Main>
      </div>
    </>
  );
};
//hello

export default BotApp;
