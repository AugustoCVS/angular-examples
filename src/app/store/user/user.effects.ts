import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap } from "rxjs";
import { UserService } from "../../core/service/user/user.service";
import { userActions } from "./user.actions";

export const getUserInfoEffect = ({ userId }: { userId: string }) => createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$
      .pipe(
        ofType(userActions.loadUserInfo),
        switchMap(() => userService.getUserInfoById({ userId })
          .pipe(
            map((user) => userActions.loadUserInfoSuccess({ user }),
            )
          )
        )
      )
  }, { functional: true }
)
