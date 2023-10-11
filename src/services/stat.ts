import axios, { ResDataType } from './axios'

// 获取统计列表
export async function getStatListService(
  id: string,
  opt: {
    page: number
    pageSize: number
  }
): Promise<ResDataType> {
  const url = `/api/stat/${id}`
  const data = (await axios.get(url, { params: opt })) as ResDataType
  return data
}

// 根据问卷id和组件id获取组件统计数据
export async function getComponentStatService(
  questionId: string,
  componentId: string
): Promise<ResDataType> {
  const url = `/api/stat/${questionId}/${componentId}`
  const data = (await axios.get(url)) as ResDataType
  return data
}
