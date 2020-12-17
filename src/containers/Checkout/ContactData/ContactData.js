import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

import { connect } from 'react-redux';
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elType: 'input',
        elConfig: { type: 'text', placeholder: 'Your Name' },
        value: 'Flow',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elType: 'input',
        elConfig: { type: 'text', placeholder: 'Street' },
        value: 'Copenhagen Tivoli',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elType: 'input',
        elConfig: { type: 'text', placeholder: 'Zip Code' },
        value: '23000',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elType: 'input',
        elConfig: { type: 'text', placeholder: 'Country' },
        value: 'Denmark',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elType: 'input',
        elConfig: { type: 'text', placeholder: 'Your Email' },
        value: 'flowrin@gmail.com',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      delivewryMethod: {
        elType: 'select',
        elConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        validation: {},
        value: 'fastest',
        valid: true,
      },
    },
    formIsValid: true,
  };
  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== ' ' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.minLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };
  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElIdentifier in this.state.orderForm) {
      formData[formElIdentifier] = this.state.orderForm[formElIdentifier].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
    };

    this.props.onOrderBurger(order);
  };
  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };

    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
   
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: true }); ///change here
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formEl) => (
          <Input
            key={formEl.id}
            elType={formEl.config.elType}
            elConfig={formEl.config.elConfig}
            value={formEl.config.value}
            invalid={!formEl.config.valid}
            shouldValidate={formEl.config.validation}
            touched={formEl.config.touched}
            changed={(event) => this.inputChangedHandler(event, formEl.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
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

const mapStateToProps = (state) => ({
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  loading: state.orders.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
