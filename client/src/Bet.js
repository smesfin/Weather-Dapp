import React from "react";
import Button from 'react-bootstrap/Button';
import { Weather } from './abi/abi'
import Web3 from 'web3'




class Bet extends React.Component {

constructor(props){
  super(props)
  var today = new Date(),
  date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();

  this.makebet = this.makebet.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.state = { stackId: null, currentDate: date, totalPot: null, value: ''};
}

componentDidMount() {
/*  var contractName = "Weather";
  var web3 = new Web3("HTTP://127.0.0.1:8545"); */

      const {drizzle, drizzleState} = this.props;
    /*  drizzle.addContract({
        name: contractName,
        web3Contract: new web3.eth.Contract(
          Weather.options.jsonInterface,
          0x466ffc76bc55709a675d79c691c79d2b4ce02251
        )

      });*/

      const contract = drizzle.contracts.Weather;
      //fetch total pot from smart contract
    /*  const dataKey = contract.methods["checkBalance"].cacheCall();
      this.setState({totalPot: dataKey}); */
  }

  sendTrue() {
    this.makebet(true);
  }

  sendFalse() {
    this.makebet(false);
  }

  handleChange(event) {
  this.setState({value: event.target.value});
  }

  handleSubmit(event) {
  event.preventDefault();
  }


  makebet = choice => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Weather;
    //call bet for current user with amount specified in ETH
    const stackId = contract.methods["bet"].cacheSend(choice,
      {from: drizzleState.accounts[0], value: this.state.value
    });

    this.setState({ stackId });
  };



  getTxStatus = () => {
    // get the transaction states from the drizzle state

    if(this.props.drizzleState == null) return null;
    const { transactions, transactionStack } = this.props.drizzleState;


    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[this.state.stackId];

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;

    // otherwise, return the transaction status
    if (transactions[txHash] && transactions[txHash].status)
      return `Transaction status: ${transactions[txHash].status}`;

    return null;
  };

  render() {
    return (
      <div>
      <h1> Bet on the Weather </h1>
      <p> created by: Sam Mesfin</p>
      <p> *all bets are in ETH</p>
      <h2> Welcome!  </h2>
      <h2> Projected high {this.state.currentDate}: 78&deg;F</h2>
      <h2> Total pot size: {this.state.totalPot}0 ETH </h2>


        <form onSubmit={this.handleSubmit} >
          <label>
            <input type="text" value={this.state.value} onChange={this.handleChange} />

          </label>
          <>
            {' '}<Button onClick={this.sendTrue} variant="success" size="sm" >
              Bet Over
            </Button>{' '}
            <Button onClick={this.sendFalse} variant="danger" size="sm" >
              Bet Under
            </Button>
          </>
        </form>
        <div>{this.getTxStatus()}</div>
      </div>
    );
  }

}

export default Bet;
