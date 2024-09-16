import { ActionReducerMap } from "@ngrx/store";
import { IStoreState } from "./store.state";
import { userReducer } from "./user/user.reducer";

export const storeReducers: ActionReducerMap<IStoreState> = {
  user: userReducer
}