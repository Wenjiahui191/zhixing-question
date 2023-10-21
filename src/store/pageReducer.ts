import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type PageStateType = {
  title: string
  desc?: string
  js?: string
  css?: string
  isPublished?: boolean
}

const INIT_STATE: PageStateType = {
  title: '',
  desc: '',
  js: '',
  css: '',
}

export const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE,
  reducers: {
    // 设置页面信息
    resetPageInfo: (state: PageStateType, action: PayloadAction<PageStateType>) => {
      return action.payload
    },
    // 修改标题
    changePageTitle: (state: PageStateType, action: PayloadAction<string>) => {
      state.title = action.payload
    },
  },
})

export const { resetPageInfo, changePageTitle } = pageInfoSlice.actions

export default pageInfoSlice.reducer
