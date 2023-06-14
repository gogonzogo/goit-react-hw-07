import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contactsReducer from './contactsSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['contacts'],
  transforms: [
    createTransform(
      (inboundState, key) => {
        if (key === 'contacts') {
          return { items: inboundState.items };
        }
        return inboundState;
      },
      (outboundState, key) => {
        if (key === 'contacts') {
          return { items: outboundState.items, isLoading: false, error: null };
        }
        return outboundState;
      }
    ),
  ],
};

const persistedReducer = persistReducer(persistConfig, contactsReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
