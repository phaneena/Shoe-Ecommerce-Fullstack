import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
// import { Search } from "../Pages/Search";
const Layout = () => {
  return (
    <div style={styles.layout}>
      <Navbar />
      {/* <Search /> */}
      <div style={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

const styles = {
  layout: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  content: {
    flex: 1,
    paddingBottom: "4rem", // To prevent content being hidden behind footer
  },
};

export default Layout;
