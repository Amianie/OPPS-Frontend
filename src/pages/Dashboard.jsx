import React from "react";
import {
  IoLockClosed,
  IoPencil,
  IoLockClosedOutline,
  IoPerson,
} from "react-icons/io5";
import {
  MdLock,
  MdMail,
  MdNumbers,
  MdOutlineEmail,
  MdPhone,
} from "react-icons/md";
import { CiLock, CiPhone } from "react-icons/ci";
import { Link } from "react-router-dom";
import Logo from "../assets/MMU.png";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useSidebar } from "../../hooks/useHandleSideBar";
import Dashboard from "../components/Dashboard";
function UsersDashboard() {
  const { open, handleSideBar, handleSidebarItemClick } = useSidebar();
  return (
    <div>
      <Navbar handleSideBar={handleSideBar} open={open} />
      <Sidebar
        open={open}
        handleSideBar={handleSideBar}
        // onItemClick={handleSidebarItemClick}
      />
      <div className="p-8 h-full justify-start items-start w-full flex text-black md:pl-[250px]  flex-col">
        <h5 className="text-blue-500 text-xl font-bold uppercase  md:left-[250px] mt-20">
          Dashboard
        </h5>
        <Dashboard />
      </div>
    </div>
  );
}

export default UsersDashboard;