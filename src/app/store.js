import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { phonebookReducer } from 'redux/AppSlice';
import { contactsApi } from 'services/contactsApi';

// export const store = configureStore({
//   reducer: {
//     phonebook: phonebookReducer,
//   },
// });

const rootReducer = combineReducers({
  phonebook: phonebookReducer,
  [contactsApi.reducerPath]: contactsApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
  ],
});
