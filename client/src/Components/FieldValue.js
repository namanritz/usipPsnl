import React from "react";

function FieldValue(props) {
  return (
    <div className="flex gap-2 text-lg flex-wrap">
      <div className="font-semibold">{props.field}</div>
      <div className="font-semibold text-gray-500 flex flex-wrap">
        {props.value}
      </div>
    </div>
  );
}

export default FieldValue;
