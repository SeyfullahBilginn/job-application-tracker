/* eslint-disable react/button-has-type */
import React from "react";
import "./GeneralPopup.css";

export default function GeneralPopup({ close, success }) {
  return (
    <div className="general_popup">
      <div className="popup_inner">
        <p>sfdgfdg</p>
        <button onClick={() => close()}>close</button>
        <button onClick={() => success()}>delete</button>
      </div>
    </div>
  );
}
