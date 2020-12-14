import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
  let inputEl = null;
  const inputClasses = [classes.InputElement];
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }
  switch (props.elType) {
    case 'input':
      inputEl = (
        <input
          className={inputClasses.join(' ')}
          {...props.elConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'textarea':
      inputEl = (
        <textarea
          className={classes.InputElement}
          {...props.elConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'select':
      inputEl = (
        <select
          className={classes.InputElement}
          {...props.elConfig}
          value={props.value}
          onChange={props.changed}
        >
          {props.elConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputEl = (
        <input
          className={classes.InputElement}
          {...props.elConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputEl}
    </div>
  );
};

export default input;
