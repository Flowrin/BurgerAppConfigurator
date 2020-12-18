import React, { Component } from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
  }
  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price}
        />
      ));
    }
    return <div>{orders}</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders,
    loading: state.orders.loadig,
    token: state.auth.token,
  };
};
const mapDispatchToProps = (dispatch) => ({
  onFetchOrders: (token) => dispatch(actions.fetchOrders(token)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
