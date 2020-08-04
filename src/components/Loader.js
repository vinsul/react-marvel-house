import React from "react";
import { SolarSystemLoading } from "react-loadingg";

const Loader = () => {
  return (
    <SolarSystemLoading
      className="download-message"
      color="yellow"
      size="large"
    />
  );
};

export default Loader;
