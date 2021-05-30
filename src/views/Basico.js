import React from "react";
import MyAppBar from "../components/AppBar/AppBar";
import BasicoCards from "../components/BasicoCards/BasicoCards";

function Basico() {
  return (
    <div>
      <MyAppBar description="Básico" />

      <BasicoCards />
    </div>
  );
}

export default Basico;
