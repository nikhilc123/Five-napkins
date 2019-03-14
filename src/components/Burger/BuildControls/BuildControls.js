import React from 'react';
import classes from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: "Salad", type: "salad"},
  {label: "Cheese", type: "cheese"},
  {label: "Meat", type: "meat"},
  {label: "Bacon", type: "bacon"}
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p><strong>Burger Price: {props.price}</strong></p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        // anonymous function
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        // {salad: true, meat: false, etc....}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable} onClick={props.ordered}>ORDER NOW</button>
  </div>

);

export default buildControls;