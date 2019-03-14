import React from 'react';
import Aux from '../../hoc/Aux'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.css';

const layout = (props) => {
  return (
    // return json components
    // wrap whole inside div OR use Aux OR use React.Fragment OR use []
    // I prefer higher order component(hoc) - Aux
    <Aux>
      <Toolbar/>
      <main className={classes.Content}>
        {props.children}
      </main>
    </Aux>
  )
};

export default layout;