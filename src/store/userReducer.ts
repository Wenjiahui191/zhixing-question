import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type UserStateType = {
  username: string
  nickname: string
}

const INIT_STATE: UserStateType = {
  username: '',
  nickname: '',
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` 将从 `initialState` 参数推断 state 类型
  initialState: INIT_STATE,
  reducers: {
    loginReducer(state: UserStateType, action: PayloadAction<UserStateType>) {
      return action.payload
    },
    logoutReducer() {
      return INIT_STATE
    },
  },
})

export const { loginReducer, logoutReducer } = userSlice.actions

export default userSlice.reducer
