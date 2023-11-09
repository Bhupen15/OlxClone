import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import PostReducer from './PostSlice'
import WishlistReducer from './WishlistSlice'

import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";



const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  
  };
  const rootreducer = combineReducers({
    post: PostReducer, 
    wishlist: WishlistReducer,
   
  });


  
export const store  = configureStore({
    reducer: persistReducer(persistConfig, rootreducer),
  //    middleware: [
  //   ...getDefaultMiddleware({
  //     serializableCheck: false, 
  //   }),
  // ],
    
});  

  export const persistor = persistStore(store);