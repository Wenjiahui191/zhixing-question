import axios from './axios'
import type { ResDataType } from './axios'

type OptionType = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  page: number
  pageSize: number
}

// 获取单个问卷详情
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = (await axios.get(url)) as ResDataType

  return data
}

// 创建问卷
export async function createQuestionService() {
  const url = `/api/question`
  const data = (await axios.post(url)) as ResDataType

  return data
}

// 获取问卷列表
export async function getQuestionListService(opt: Partial<OptionType> = {}): Promise<ResDataType> {
  const url = `/api/question`
  const data = (await axios.get(url, { params: opt })) as ResDataType

  return data
}

// 更新问卷信息
export async function updateQuestionService(
  id: string,
  opt: { [key: string]: any }
): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = (await axios.patch(url, opt)) as ResDataType
  return data
}

// 复制问卷
export async function duplicationQuestionService(id: string) {
  const url = `/api/question/duplication/${id}`
  const data = (await axios.post(url)) as ResDataType

  return data
}

// 彻底删除问卷
export async function deleteQuestionService(ids: string[]) {
  const url = `/api/question`
  const data = (await axios.delete(url, { data: ids })) as ResDataType

  return data
}
