import { createReducer, on } from "@ngrx/store";
import { userActions } from "./user.actions";

enum userStatus {
  loading = 'loading',
  pending = 'pending',
  error = 'error',
  success = 'success',
}

export interface userState {
  name: string,
  email: string,
  status: userStatus
}

const initialState: userState = {
  name: '',
  email: '',
  status: userStatus.pending
}

export const userReducer = createReducer(
  initialState,
  on(userActions.loadUserInfo, (states) => {
    return {
      ...states,
      status: userStatus.loading
    }
  }),
  on(userActions.loadUserInfoSuccess, (states, { user }) => {
    return {
      ...states,
      name: user.name,
      email: user.email,
      status: userStatus.success
    }
  }),

)