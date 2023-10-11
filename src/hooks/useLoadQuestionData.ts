import { useRequest } from 'ahooks'
import { getQuestionService } from '@/services/question'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetComponents } from '@/store/componentsReducer'
import { resetPageInfo } from '@/store/pageReducer'

export default function useGetQuestionData() {
  const dispatch = useDispatch()
  const { id = '' } = useParams()

  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) {
        throw new Error('问卷id不能为空')
      }
      const data = await getQuestionService(id)
      return data
    },
    { manual: true }
  )

  useEffect(() => {
    if (!data) return
    const { title = '', desc, js, css, isPublished, componentList = [] } = data
    let selectedId = ''
    if (componentList.length) {
      selectedId = componentList[0].fe_id
    }

    // 保存组件信息到redux
    dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }))
    // 保存页面信息
    dispatch(resetPageInfo({ title, desc, js, css, isPublished }))
  }, [data])

  useEffect(() => {
    run(id)
  }, [id])

  return { loading, error }
}
