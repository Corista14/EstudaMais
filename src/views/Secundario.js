import React from "react";
import MyAppBar from "../components/AppBar/AppBar";
import SecundarioCards from "../components/SecundarioCards/SecundarioCards";

function Secundario() {
  return (
    <div>
      <MyAppBar description="Secundário" />

      <SecundarioCards />
    </div>
  );
}

export default Secundario;
