import { useSelector } from 'react-redux'
import { StateType } from '@/store'
import { ComponentStateType } from '@/store/componentsReducer'

export default function useGetComponentsList() {
  const {
    componentList = [],
    selectedId = '',
    copiedComponent,
  } = useSelector<StateType>(state => state.components.present) as ComponentStateType

  const selectedComponent = componentList.find(c => c.fe_id === selectedId)

  return { componentList, selectedId, selectedComponent, copiedComponent }
}
