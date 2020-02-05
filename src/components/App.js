import React, { Component } from "react";
import Checkbox from "./Checkbox.js";
import Card from "./Card";

const API_KEY = process.env.API_KEY;
const list = [
  {
    name: "Amazon",
    symbol: "AMZN",
    checked: false,
    stock: [],
  },
  {
    name: "Google",
    symbol: "GOOGL",
    checked: false,
    stock: []
  },
  {
    name: "Twitter",
    symbol: "TWTR",
    checked: false,
    stock: []
  },
  {
    name: "Facebook",
    symbol: "FB",
    checked: false,
    stock: []
  },
  {
    name: "Apple",
    symbol: "AAPL",
    checked: false,
    stock: []
  }
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      list
    };
  }

  hundleCheckbox = e => {
    //copy the state
    const newList = [...this.state.list];
    //finding the index where change happened
    const index = newList.findIndex(item => item.name === e.target.name);
    //update the value of the checked button into the copy list
    newList[index].checked = e.target.checked;
    //setting state to the new list after updates
    this.setState([...newList]);
  };

  hundleShow = () => {
    //copy the state
    const list = [...this.state.list];
    //looping on the list to find what stock we should fetch
    for (let i = 0; i < list.length; i++) {
      if (list[i].checked === true) {
        //making sure the function wont fetch data if it already exist
        if (list[i].stock.length === 0) {
          const api_call = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${list[i].symbol}&apikey=${API_KEY}`;
          //fetching the data from alphavantage api
          fetch(api_call)
            .then(res => res.json())
            .then(data => {
              //api has limit of 5 calls per min. making sure we got the data
              if (data["Global Quote"]) {
                //making new obj for the stock
                let buildStock = {
                  title: list[i].name,
                  body: {
                    symbol: list[i].symbol,
                    open: data["Global Quote"]["02. open"],
                    high: data["Global Quote"]["03. high"],
                    low: data["Global Quote"]["04. low"],
                    price: data["Global Quote"]["05. price"],
                    date: data["Global Quote"]["07. latest trading day"]
                  }
                };
                //adding the new stock to the list
                list[i].stock = [buildStock];
                //setting state of the new list
                this.setState([...list]);
                console.log("adding stocks", this.state.list);
              }
              //we made more then 5 calls to the api need to wait 60 sec
              else {
                alert("Cant load more data from the api need to wait 60 sec");
              }
            })
            .catch(e => console.log(e));
        }
      } else {
        //making sure we clear only the stocks that has info
        if (list[i].stock.length > 0) {
          //clearing stock
          list[i].stock = [];
          //set the new state
          this.setState([...list]);
          console.log("clearing stocks", this.state.list);
        }
      }
    }
  };

  render() {
    const { list } = this.state;
    return (
      <div className="App">
        <header>
          <h2>Stock</h2>
        </header>
        <div id="list" style={{margin:"1rem"}}>
          <h6>Mark the stock you want to see</h6>
          <div className="flex-center">
            {list
              ? list.map((item, index) => (
                  <div key={index} className="checkbox-list flex-center">
                    <Checkbox
                      name={item.name}
                      checked={item.checked}
                      onChange={this.hundleCheckbox}
                    />
                  </div>
                ))
              : null}
          </div>

          <div className="flex-center">
            <button onClick={this.hundleShow}>Show</button>
          </div>
        </div>

        <div className="flex-center">
          {list
            ? list.map(x =>
                x.stock.map((item, index) => (
                  <Card  title={item.title} body={item.body} key={index} />
                ))
              )
            : null}
        </div>
      </div>
    );
  }
}

export default App;
