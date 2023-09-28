import { useRequest } from 'ahooks'
import { getQuestionService } from '@/services/question'
import { useParams } from 'react-router-dom'

export default function useGetQuestionData() {
  const { id = '' } = useParams()

  async function load() {
    const data = await getQuestionService(id)
    return data
  }

  const { loading, data, error } = useRequest(load)

  return { loading, data, error }
}
