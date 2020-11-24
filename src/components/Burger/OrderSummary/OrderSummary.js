import React from 'react';
import Aux from '../../../hoc/Auxiliary';

import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey, i) => {
    return (
      <li key={i}>
        <span style={{ textTransform: 'capitalize' }}> {igKey} </span>:{' '}
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>Your Burger with the folowing ingredients: </p>
      <ul>{ingredientSummary} </ul>
  <p><strong>Total Price: ${props.price}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
      <Button btnType="Success"clicked={props.purchaseContinue}>CONTINUE</Button>
    </Aux>
  );
};
export default orderSummary;
