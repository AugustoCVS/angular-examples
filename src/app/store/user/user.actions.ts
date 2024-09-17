import { createAction, props } from "@ngrx/store";
import { IUserResponse } from "../../core/service/user/interfaces/user";

const loadUserInfo = createAction('[User] Load user info', props<{ userId: string }>())
const loadUserInfoSuccess = createAction('[User] Load user info success', props<{ user: IUserResponse }>())

export const userActions = {
  loadUserInfo,
  loadUserInfoSuccess,
}