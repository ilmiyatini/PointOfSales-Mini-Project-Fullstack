import { faBell, faUser } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Titlebar() {
  return (
    <div className="rounded m-10 mr-4 shadow-md  bg-teal-200">
      <div className="flex justify-between m-2 pointer-cursor">
        <p className="font-medium text-sm md:text-lg p-2">Eatally Food</p>
        <div className="m-2 text-sm">
          <span className="p-2 border-r hover:text-teal-300">
            <FontAwesomeIcon icon={faBell} />
          </span>
          <span className="p-2 hover:bg-teal-200 rounded ml-2">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            User
          </span>
        </div>
      </div>
    </div>
  );
}

export default Titlebar;
