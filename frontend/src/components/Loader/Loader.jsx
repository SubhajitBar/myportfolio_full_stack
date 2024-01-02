import React from "react";
import "./Loader.css";
import { Dna } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loadingPage">
      
      <Dna
        visible={true}
        height="200"
        width="200"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};

export default Loader;
