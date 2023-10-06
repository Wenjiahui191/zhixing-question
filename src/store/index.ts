import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './userReducer'
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'
import componentsReducer, { ComponentStateType } from './componentsReducer'
import pageInfoReducer, { PageStateType } from './pageReducer'

export type StateType = {
  user: UserStateType
  components: StateWithHistory<ComponentStateType>
  pageInfo: PageStateType
}

const store = configureStore<StateType>({
  reducer: {
    user: userReducer,
    components: undoable(componentsReducer, {
      limit: 20,
      syncFilter: true,
      filter: excludeAction([
        'components/changeSelectedId',
        'components/resetComponents',
        'components/choPreComponent',
        'components/choNextComponent',
      ]),
    }),
    pageInfo: pageInfoReducer,
  },
})

export default store
