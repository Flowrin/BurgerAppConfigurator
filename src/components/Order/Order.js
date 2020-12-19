import React from 'react';
import classes from './Order.module.css';
const order = (props) => {
  const ingredients = [];
  for (let ingName in props.ingredients) {
    ingredients.push({ name: ingName, amount: props.ingredients[ingName] });
  }

  const ingOutput = ingredients.map((ing) => {
    return (
      <span
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px',
        }}
        key={ing.name}
      >
        {ing.name} ({ing.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients :{ingOutput}</p>
      <p>
        Price: <strong> USD {props.price}</strong>
      </p>
      <p>Date: {props.date}</p>
    </div>
  );
};

export default order;
