import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import axios from '../../axios-orders';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';

import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class BurgerBuilder extends Component {
  state = {
    buyable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  purchaseHandler = () => {
    if (this.props.isAuth) {
      this.setState({ purchasing: true });
    } else {
      const path='/checkout'
      this.props.onSetAuthRedirectPath(path)
      this.props.history.push('/auth');
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push({
      pathname: '/checkout',
    });
  };

  updateBuyingState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }
  // addIngredientHandler = (type) => {
  //   const oldCount = this.props.ings[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.props.ings,
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;

  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updateBuyingState(updatedIngredients);
  // };
  // removeIngredientHandler = (type) => {
  //   const oldCount = this.props.ings[type];
  //   if (oldCount <= 0) {
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.props.ings,
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceAddition;

  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updateBuyingState(updatedIngredients);
  // };

  render() {
    const disableInfo = { ...this.props.ings };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.props.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disableInfo}
            price={this.props.price}
            buyable={this.updateBuyingState(this.props.ings)}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuth}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          ingredients={this.props.ings}
          price={this.props.price}
        />
      );
      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    token: state.auth.token,
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),

    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),

    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath :(path)=> dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
