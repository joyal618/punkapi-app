import * as React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from "../table";
import DrawerRouterContainer from "./DrawerRouterContainer";
import "./styles.css";

const Layout: React.FC = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <DrawerRouterContainer>
          <Routes>
            <Route path="/" element={<Table />} />
            <Route path="/home" element={<Table />} />
          </Routes>
        </DrawerRouterContainer>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default Layout;
