// import React from 'react'
import { AddIcon } from "../index";
import { Button } from "@mui/material";
import "./Header.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex fixed top-0 z-20 justify-between align-middle border-b-2 mb-1 border-slate-600 pb-2  header bg-black">
      <div className=" text-3xl text-orange-500 font-bold m-2 ml-5  ">
        <NavLink to={"/"} style={{ cursor: "pointer" }}>
          Movie
          <span className="text-3xl font-bold  text-white">XZ</span>
        </NavLink>
      </div>
      <div className=" m-3  font-bold text-3xl cursor-pointer hover:text-orange-500  mr-10 bg-orange-500 ">
        <NavLink to="/addmovie">
          <Button style={{ textTransform: "capitalize", color: "#fff" }}>
            Add Movie
            <AddIcon className="addicon" color="" style={{ color: "#fff" }} />
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
