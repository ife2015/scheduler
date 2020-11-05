import React from "react";

// imported CSS styling 
import "components/Button.scss";

// imported class function
import classNames from 'classnames/bind';

// button component "cancel" and "confirm"
export default function Button(props) {

   const buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
   });

   return (
      <button
         className={buttonClass}
         onClick={props.onClick}
         disabled={props.disabled}
      >
         {props.children}
      </button>
   );
}
