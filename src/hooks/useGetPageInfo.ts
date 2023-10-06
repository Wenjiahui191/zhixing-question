import { StateType } from '@/store'
import { PageStateType } from '@/store/pageReducer'
import { useSelector } from 'react-redux'

export function useGetPageInfo() {
  const pageInfo = useSelector((state: StateType) => state.pageInfo) as PageStateType

  return pageInfo
}
