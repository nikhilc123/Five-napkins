import React, { Component } from 'react';
import Aux from '../Aux/Aux'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false})
  };

  sideDrawerToggleHandler = () => {
    // ShowSideDrawer: !this.state.ShowSideDrawer -- bad practice - do not change the state inside setState
    // Results in unexpected behavior due to asynchronous behavior
    this.setState((prevState) => {
                return { showSideDrawer: !prevState.showSideDrawer }
          })
    };

  render(){
    return (
      // return json components
      // wrap whole inside div OR use Aux OR use React.Fragment OR use []
      // I prefer higher order component(hoc) - Aux

      <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
};

export default Layout;