import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            menuList: [{name:'Tea ', price:3.40, qty:0},
                {name:'Coffee ', price:4.15, qty:0},
                {name:'Cappuccino ', price:4.20, qty:0},
                {name:'Hot Chocolate ', price:4.90, qty:0},
                {name:'Fruit Juice ', price:2.90, qty:0},
                {name:'Milkshake ', price:3.50, qty:0},
                {name:'Smoothie ', price:2.70, qty:0}
            ],
            orderList :[],
            total: 0,
        }

    }
    addOrder(order){
        const newOrder = this.state.orderList.slice();
        let newTotal = this.state.total;
        if(order.qty === 0) {
            order.qty++;

            newOrder.push(order);
        } else {
            order.qty++;
        }
        newTotal = newTotal + order.price;
        console.log(newTotal);
        this.setState({orderList: newOrder, total: Number(newTotal.toFixed(2))})
    }
    removeOrder(item){
                //alert("hei Remove")
            const newOrder = this.state.orderList.slice();
            let newTotal = this.state.total;
            let i;
        if(item.qty > 1){
            item.qty --;
            console.log(item.qty);
        } else{
            for( i=0; i< newOrder.length; i++){
                if(item.name === newOrder[i].name){
                    // console.log(newOrder);
                    item.qty = 0;
                    break;

                }
            }
            newOrder.splice(i,1);
        }

            newTotal = newTotal - item.price;
        console.log('minus:' + newTotal)
              // newOrder.splice(item.name,1);
                this.setState({orderList: newOrder, total: Number(newTotal.toFixed(2))})
        }
  render() {
    return (<div className="container-fluid">
            <div className="justify header"><h2 className="headText">Niki's Cafe</h2></div> <br />
            <div className="row">
                <div className="col-6">
                    <div className="row">
                    <div className="col-1"></div> <br />
                    <div className="col-10"><LeftSide menu={this.state.menuList} onClick={(order)=> this.addOrder(order)}/></div>
                    <div className="col-1"></div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="row">
                    <div className="col-1"></div> <br />
                    <div className="col-10"><RightSide order={this.state.orderList} remove={(item)=> this.removeOrder(item)} total={this.state.total}/></div>
                    <div className="col-1"></div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export class LeftSide extends Component{


    render(){
        return( <div className="leftSide">

                    <h3 className="leftSideHeader"> <b> Menu </b> </h3>
                <div className="row menuList">
                    <div className="col-2"></div>
                    <div className="col-8">
                <table className="table table-dark" align="center">
                        <thead align="center"><tr><th colSpan="3" style={{ color: 'red'}}>Drinks</th></tr></thead>
                        <tbody>
                        {this.props.menu.map((order) => <tr key={order.name}><td key={order.name}>{order.name}</td><td key={order.price}>${order.price}</td><td><button className="btn btn-outline-danger btn-sm" onClick={()=>this.props.onClick(order)}>+</button></td></tr>)}
                        </tbody>
                </table>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>

        );
    }
}

export class RightSide extends Component{
    constructor(props){
        super(props);
        this.state={
            menuList: null
        };
    }
    render(){
        return( <div className="rightSide">

                <h3 className="rightSideHeader"> <b>Order Summery</b></h3>
            <div className="row menuList">
                <div className="col-2"></div>
                <div className="col-8">
                    <table className="table table-dark" align="center">
                        <thead align="center"><tr><th colSpan="4" style={{ color: 'red'}}>Bill</th></tr></thead>
                        <tbody>
                                <tr><td>Item</td><td>Qty</td><td>Amount</td></tr>
                                {this.props.order.map((item)=><tr key={item.name}><td key={item.name}>{item.name}</td><td key={item.qty}>{item.qty}</td><td key={item.price}>${item.price}</td><td><button className="btn btn-outline-danger btn-sm" onClick={()=>this.props.remove(item)}>-</button></td></tr>)}
                                <tr><td colSpan="2" align="center">Total : </td><td>${this.props.total}</td></tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-2"></div>
            </div>
            </div>

        );
    }
}

export default App;
