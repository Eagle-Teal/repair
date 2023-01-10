import * as types from "./actionType";
import JWTaxios from "../../services/api";

const getGiftsData = (params) => (dispatch) => {
  dispatch({ type: types.GET_GIFT_R });
  return JWTaxios
    .get(
      "https://eagletealapi.adaptable.app/api/gift",{
      headers:{token:`Bearer ${params.token}`}
    }
    )
    .then((res) => {
      dispatch({ type: types.GET_GIFT_S, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: types.GET_GIFT_F });
      return Promise.reject(err);
    });
};

export {  getGiftsData };
