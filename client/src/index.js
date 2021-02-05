import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';



//import drizzle functions and contract artifact
import { Drizzle } from "drizzle"
import {generateStore} from "@drizzle/store"

import Weather from "./contracts/Weather.json";

//let drizzle know what contracts we want
const options = {  contracts: [Weather]};
//setup the drizzle store and drizzle
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);





// pass in the drizzle instance
ReactDOM.render(<App drizzle={drizzle} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
