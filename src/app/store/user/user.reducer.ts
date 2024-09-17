import { createReducer, on } from "@ngrx/store";
import { userActions } from "./user.actions";
import { IUserResponse } from "../../core/service/user/interfaces/user";

enum userStatus {
  loading = 'loading',
  pending = 'pending',
  error = 'error',
  success = 'success',
}

export interface userState {
  user: IUserResponse,
  status: userStatus
}

const initialState: userState = {
  user: {
    name: '',
    email: ''
  },
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
      user: {
        name: user.name,
        email: user.email,
      },
      status: userStatus.success
    }
  }),

)