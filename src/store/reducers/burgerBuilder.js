import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  ingredients: null,
  error: false,
  totalPrice: 4,
  building: false,
};
const INGREDIENT_PRICES = {
  salad: 0.5,
  meat: 2,
  bacon: 2.5,
  cheese: 1,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const updatedIng = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
      };
      const updatedIngs = updateObject(state.ingredients, updatedIng);
      const updatedState = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true,
      };
      return updateObject(state, updatedState);

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true,
      };

    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        error: false,
        totalPrice: 4,
        building: false,
      };

    case actionTypes.FETCH_INGREDIENTS_FAIL:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
