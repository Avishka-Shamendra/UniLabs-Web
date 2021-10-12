import {
  AUTH_ERROR,
  AUTH_LOADED,
  AUTH_LOADING,
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_FAIL,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  UPDATE_PROFILE_ERROR,
  UPDATE_PROFILE_LOADING,
  UPDATE_PROFILE_SUCCESS,
} from '../actionTypes/authActionTypes';
import User from '../../models/user';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isAuthLoading: false,
  isLoginLoading: false,
  user: null,
  error: null,
  forgotPasswordSuccess: false,
  forgotPasswordError: false,
  isUpdateProfileLoading: false,
  updateProfileSuccess: false,
  updateProfileError: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        isAuthLoading: true,
        forgotPasswordSuccess: false,
        forgotPasswordError: false,
        isUpdateProfileLoading: false,
        updateProfileSuccess: false,
        updateProfileError: false,
      };
    case LOGIN_LOADING:
      return {
        ...state,
        isLoginLoading: true,
      };
    case AUTH_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isAuthLoading: false,
        user: new User(action.payload),
        error: null,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);

      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        user: new User(action.payload),
        isLoginLoading: false,
        error: null,
      };
    case LOGIN_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoginLoading: false,
        error: 'Login Failed',
      };
    case LOGOUT_SUCCESS:
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isAuthLoading: false,
      };
    case LOGOUT_FAIL:
      return { ...state, isAuthLoading: false };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordSuccess: true,
        forgotPasswordError: false,
      };
    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        forgotPasswordSuccess: false,
        forgotPasswordError: true,
      };
    case UPDATE_PROFILE_LOADING: {
      return {
        ...state,
        isUpdateProfileLoading: true,
        updateProfileError: false,
        updateProfileSuccess: false,
      };
    }
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: state.user.update(action.payload),
        isUpdateProfileLoading: false,
        updateProfileSuccess: true,
        updateProfileError: false,
      };
    case UPDATE_PROFILE_ERROR:
      return {
        ...state,
        isUpdateProfileLoading: false,
        updateProfileSuccess: false,
        updateProfileError: true,
      };
    default:
      return state;
  }
};
export default authReducer;
