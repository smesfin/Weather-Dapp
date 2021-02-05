import React, { Component } from 'react';
import Bet from "./Bet";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";


class App extends Component {

  constructor(props){
    super(props)

    this.setState = this.setState.bind(this);
    this.state = { loading: true, drizzleState: null };
  }

  //state = { loading: true, drizzleState: null };

  componentDidMount() {
    const { drizzle } = this.props;

    // subscribe to changes in the store

    this.unsubscribe = drizzle.store.subscribe(() => {

      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }

    });
  }

  compomentWillUnmount() {
  this.unsubscribe();
}



 render() {
    if (this.state.loading ) {
      return <div>Loading Drizzle</div>;
    }
    else {
    return (
      <div className="App">
        <Bet
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
      </div>
    );
  }
  }
}


export default App;
