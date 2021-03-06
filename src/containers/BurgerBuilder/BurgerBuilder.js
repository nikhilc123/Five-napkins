import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


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
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios.get('https://react-burger-58cf2.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ingredients: response.data})
      })
      .catch(error => {
        this.setState({error: true})
    })
}

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
    this.setState({loading: true});
    const orders = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer:{
        email: 'testuser@gmail.com',
        name: 'Test User'
        },
        address:{
          country: 'USA',
          street: 'Test Street',
          zipCode: '88654'
      },
      delivery: 'Fastest'
    };
    // firebase expects .json extension
    axios.post('/orders.json', orders)
      .then(response => {
        // purchasing false because we want to close the modal
        // once you submit the post request, close the modal
        this.setState({ loading: false, purchasing: false})
      }).catch(error => {
        this.setState({ loading: false, purchasing: false})
    })
  };

  render(){
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo){
      // disabledInfo[key] is the value of salad, meat, etc
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let burger = this.state.error ? <p>Something went wrong!</p> : <Spinner/>;

    let orderSummary = null;

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice.toFixed(2)}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}/>
        </Aux>
      );
        orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      />
    }
    if (this.state.loading){
      orderSummary = <Spinner/>
    }
    return(
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios);