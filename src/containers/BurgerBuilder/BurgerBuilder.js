import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';

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
      meat: 0,
      cheese: 0,
      bacon: 0
    }
  };

  render(){
    return(
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <div>Burger Controls</div>
      </Aux>
    )
  }
}

export default BurgerBuilder;