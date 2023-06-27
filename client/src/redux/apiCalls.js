import axios from "axios";

import { loginStart, loginFailure, loginSuccess } from "./userRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());

  try {
    console.log(user);
    const res = await axios.post("http://localhost:80/admin/login", user);
    console.log("response", res.data);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
