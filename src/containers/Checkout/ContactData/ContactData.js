import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  };
  orderHandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Flow',
        address: {
          street: 'plm',
          zipCode: '11234',
          country: 'DK',
        },
        email: 'test@test.com',
      },
      delivewryMethod: 'fastest',
    };
    axios
      .post('/orders.json', order)
      .then((res) => {
        this.setState({ loading: false });
        this.props.history.push('/')
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  };
  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={classes.Input}
          type="text"
          name="email"
          placeholder="Your Email"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Your Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postal"
          placeholder="Your PostalCode"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          Order
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}
export default ContactData;
