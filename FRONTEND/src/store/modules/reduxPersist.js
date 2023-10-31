import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistReducers = persistReducer(
    {
      key: 'GESTOR-DE-CONTAS',
      storage,
      whitelist: ['auth'],
    },
    reducers
  );

  return persistReducers;
};
