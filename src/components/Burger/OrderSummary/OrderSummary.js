import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  componentWillUpdate() {
    console.log(['OrderSummary']);
  }
  render() {

    // transform the object into array of keys
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(igKey => {
        return (
          <li>
            <span style={{textTransform: 'capitalize'}}>
            key={igKey}: {this.props.ingredients[igKey]}
          </span>
          </li>
        )
      });
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with following ingredients: </p>
        <ul>
          {ingredientSummary}
        </ul>
        <p>Continue to Checkout</p>
        <p><strong>Your total price: {this.props.price.toFixed(2)}</strong></p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </Aux>
    )

  };
};

export default OrderSummary;