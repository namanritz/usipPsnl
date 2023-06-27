import React from "react";

function InputField(props) {
  let handleChange, id, defaultValue;
  if (props.onChange) {
    handleChange = props.onChange;
  } else {
    handleChange = () => {};
  }
  if (props.id) {
    id = props.id;
  }
  if (props.defaultValue) {
    defaultValue = props.defaultValue;
  }
  return (
    <div className="flex flex-col my-4">
      <label className="mb-2 text-lg text-gray-500" htmlFor={id}>
        {props.label}
      </label>
      <input
        className="text-lg p-2 focus:outline-none text-gray-500 rounded-lg"
        type={props.type}
        required={props.required}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        id={id}
        defaultValue={defaultValue}
      ></input>
    </div>
  );
}

export default InputField;
