import { useRequest } from 'ahooks'
import { getQuestionListService } from '@services/question'
import { useSearchParams } from 'react-router-dom'
import { LIST_PAGE_SIZE, LIST_SEARCH_PAGE_KEY, LIST_SEARCH_PAGE_SIZE_KEY } from '@/constants'

type OptionType = {
  isStar: boolean
  isDeleted: boolean
}

export default function useGetQuestionListData(opt: Partial<OptionType> = {}) {
  const { isDeleted, isStar } = opt
  const [searchParams] = useSearchParams()

  const { loading, data, error, refresh } = useRequest(
    async () => {
      const keyword = searchParams.get('keyword') || ''
      const page = parseInt(searchParams.get(LIST_SEARCH_PAGE_KEY) || '') || 1
      const pageSize = parseInt(searchParams.get(LIST_SEARCH_PAGE_SIZE_KEY) || '') || LIST_PAGE_SIZE
      const data = await getQuestionListService({ keyword, isDeleted, isStar, page, pageSize })

      return data
    },
    {
      refreshDeps: [searchParams],
    }
  )

  return { loading, data, error, refresh }
}
