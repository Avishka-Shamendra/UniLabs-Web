import LabAssistant from '../../../models/labAssistant';
import {
  LAB_ASSISTANTS_ERROR,
  LAB_ASSISTANTS_LOADED,
  LAB_ASSISTANTS_LOADING,
  NEW_LAB_ASSISTANT_FAIL,
  NEW_LAB_ASSISTANT_LOADING,
  NEW_LAB_ASSISTANT_SUCCESS,
  RESET_LAB_ASSISTANT_STATE,
} from '../../actionTypes/adminActionTypes';

const initialState = {
  labAssistants: [],
  isLabAssistantsLoading: false,
  isLabAssistantsError: false,
  newLabAssistantLoading: false,
  newLabAssistantError: false,
  newLabAssistantSuccess: false,
  reloadLabAssistants: false,
};

const adminLabAssistantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_LAB_ASSISTANT_STATE:
      return initialState;
    case LAB_ASSISTANTS_LOADING:
      return {
        ...state,
        isLabAssistantsLoading: true,
        isLabAssistantsError: false,
        reloadLabAssistant: false,
      };
    case LAB_ASSISTANTS_LOADED:
      return {
        ...state,
        isLabAssistantsLoading: false,
        labAssistants: action.payload.map(obj => new LabAssistant(obj)),
        isLabAssistantsError: false,
      };
    case LAB_ASSISTANTS_ERROR:
      return {
        ...state,
        isLabAssistantsLoading: false,
        labAssistants: [],
        isLabAssistantsError: true,
      };
    case NEW_LAB_ASSISTANT_LOADING:
      return {
        ...state,
        newLabAssistantLoading: true,
        isLabAssistantsError: false,
        newLabAssistantError: false,
        newLabAssistantSuccess: false,
        reloadLabAssistants: false,
      };
    case NEW_LAB_ASSISTANT_SUCCESS:
      return {
        ...state,
        newLabAssistantLoading: false,
        newLabAssistantSuccess: true,
        reloadLabAssistants: true,
      };
    case NEW_LAB_ASSISTANT_FAIL:
      return {
        ...state,
        newLabAssistantLoading: false,
        newLabAssistantError: true,
      };

    default:
      return state;
  }
};
export default adminLabAssistantsReducer;
