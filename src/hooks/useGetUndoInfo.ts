import { StateType } from '@/store'
import { ComponentStateType } from '@/store/componentsReducer'
import { useSelector } from 'react-redux'

export function useGetUndoInfo() {
  const pastComponentInfo = useSelector<StateType>(
    state => state.components.past
  ) as ComponentStateType[]
  const futureComponentInfo = useSelector<StateType>(
    state => state.components.future
  ) as ComponentStateType[]

  return {
    pastComponentInfo,
    futureComponentInfo,
  }
}
