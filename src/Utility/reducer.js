import { Type } from "./action.type";

// Safe helper to read storage
const getSavedBasket = () => {
  try {
    const saved = localStorage.getItem("basket");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("LocalStorage read error:", error);
    return [];
  }
};

// Safe helper to save storage
const saveBasket = (basket) => {
  try {
    localStorage.setItem("basket", JSON.stringify(basket));
  } catch (error) {
    console.error("LocalStorage write error:", error);
  }
};

export const initialState = {
  basket: getSavedBasket(),
  user: null
};

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET: {
      const existingItem = state.basket.find(
        (item) => String(item.id) === String(action.item.id)
      );

      let updatedBasket = [];

      if (!existingItem) {
        updatedBasket = [...state.basket, { ...action.item, amount: 1 }];
      } else {
        updatedBasket = state.basket.map((item) =>
          String(item.id) === String(action.item.id)
            ? { ...item, amount: (item.amount || 1) + 1 }
            : item
        );
      }

      saveBasket(updatedBasket); // Safely save

      return {
        ...state,
        basket: updatedBasket
      };
    }

    case Type.REMOVE_FROM_BASKET: {
      const index = state.basket.findIndex(
        (item) => String(item.id) === String(action.id)
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        if (newBasket[index].amount > 1) {
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1
          };
        } else {
          newBasket.splice(index, 1);
        }
      }

      saveBasket(newBasket); // Safely save

      return {
        ...state,
        basket: newBasket
      };
    }
    case Type.EMPTY_BASKET:
      return{...state,basket:[]}
    case Type.SET_USER:
      return{
        ...state,user:action.user
      }


    default:
      return state;
  }
};