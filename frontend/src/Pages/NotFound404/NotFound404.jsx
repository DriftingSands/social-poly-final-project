import React from "react";
import DeadParrot from "../../assets/images/DeadParrot.gif";
import Parrot404 from "../../assets/images/Parrot404.gif";

export default function NotFound404() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ textAlign: "center" }}>404 Page not Found</h1>
      <img
        src={DeadParrot}
        alt="404 Parrot"
        style={{ height: "45%", width: "45%" }}
      />
      <h2 style={{ textAlign: "center" }}>
        Sorry, like the Norwegian Blue Parrot, this Page doesn't exist!
      </h2>
      <h2 style={{ textAlign: "center" }}>
        Maybe the Parrot below can help you find the right path?
      </h2>
      <img
        src={Parrot404}
        alt="404 Parrot"
        style={{ height: "45%", width: "45%" }}
      />
    </div>
  );
}
