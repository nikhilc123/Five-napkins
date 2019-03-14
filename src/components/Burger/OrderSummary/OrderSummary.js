import React from 'react';
import Aux from '../../../hoc/Aux';

import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  // transform the object into array of keys
  const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
      return(
        <li>
          <span style={{textTransform: 'capitalize'}}>
            key={igKey}: {props.ingredients[igKey]}
          </span>
        </li>
      )
  });

  return(
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with following ingredients: </p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue to Checkout</p>
      <p><strong>Your total price: {props.price.toFixed(2)}</strong></p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
    </Aux>

  );
};

export default orderSummary;