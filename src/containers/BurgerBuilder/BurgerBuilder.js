import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

// GLOBAL CONST
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.8
};

class BurgerBuilder extends Component {

  // Implement stateful component using two ways:
  // 1.
  // constructor(props){
  //   super(props)
  //   this.state
  // }

  // 2.
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  };

  updatePurchaseState = (ingredients) => {
    // add all the ingredients values
    const sum = Object.keys(ingredients)
      .map(igKey => {
        // values of cheese, meat, etc
        return ingredients[igKey];
    }).reduce((sum, el) =>{
      return sum + el;
      }, 0);
    //set the purchasable to true if sum > 0
    this.setState({purchasable: sum > 0})

  };
  addIngredientHandler = (type) => {
    // know the old count of each type
    const oldCount = this.state.ingredients[type];
    // update the count to + 1 every time you add
    const updatedCount = oldCount + 1;
    // copy of original state
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({
      totalPrice: newPrice, ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients)
  };

  removeIngredientHandler = (type) => {
    // know the old count of each type
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0){
      return
    }
    // update the count to + 1 every time you add
    const updatedCount = oldCount - 1;
    // copy of original state
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({
      totalPrice: newPrice, ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients)

  };

  purchaseHandler = () => {
    this.setState({purchasing: true})
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  };

  purchaseContinueHandler = () => {
    alert("You continue!");
  };

  render(){
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo){
      // disabledInfo[key] is the value of salad, meat, etc
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    return(
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice.toFixed(2)}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}/>
      </Aux>
    )
  }
}

export default BurgerBuilder;