import React from 'react';
import classes from './DrawerToggle.css';

const drawerToggle = (props) => (
  <div className={classes.DrawerToggle} onClick={props.clicked}>
    {/* three hamburger lines three empty div...check css*/}
    <div></div>
    <div></div>
    <div></div>
  </div>

);

export default drawerToggle;