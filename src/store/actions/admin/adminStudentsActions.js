/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import httpHeaderConfig from '../../httpHeaderConfig';
import {
  STUDENTS_ERROR,
  STUDENTS_LOADED,
  STUDENTS_LOADING,
  NEW_STUDENT_FAIL,
  NEW_STUDENT_LOADING,
  NEW_STUDENT_SUCCESS,
  RESET_STUDENT_STATE,
} from '../../actionTypes/adminActionTypes';
import {
  API_ADMIN_STUDENTS_URL,
  API_ADMIN_NEW_STUDENT_URL,
} from '../../apiConfig';

/* Load students */
export const fetchStudents = () => (dispatch, getState) => {
  dispatch({ type: STUDENTS_LOADING });
  axios
    .get(API_ADMIN_STUDENTS_URL, httpHeaderConfig(getState))
    .then(res => {
      dispatch({
        type: STUDENTS_LOADED,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: STUDENTS_ERROR,
      });
    });
};

/* Add student */
export const addStudent =
  (email, studentId, department) => (dispatch, getState) => {
    dispatch({ type: NEW_STUDENT_LOADING });
    const formData = new FormData();
    formData.append('email', email);
    formData.append('student_id', studentId);
    formData.append('department', department);
    axios
      .post(API_ADMIN_NEW_STUDENT_URL, formData, httpHeaderConfig(getState))
      .then(res => {
        dispatch({
          type: NEW_STUDENT_SUCCESS,
          payload: res.data,
        });
      })
      .catch(err => {
        dispatch({
          type: NEW_STUDENT_FAIL,
        });
      });
  };

/* Reset State */
export const resetAdminStudentState = () => (dispatch, getState) => {
  dispatch({ type: RESET_STUDENT_STATE });
};
