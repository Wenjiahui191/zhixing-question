import { ComponentInfoType } from '.'

export function getNextComponentId(fe_id: string, componentList: ComponentInfoType[]) {
  let nextId = ''
  const index = componentList.findIndex(c => c.fe_id === fe_id)

  if (index < 0) return ''

  if (componentList.length < 2) {
    // 当前只有一个元素
    nextId = ''
    // 有两个或以上的元素
  } else {
    // 有两个或以上的元素
    if (index + 1 === componentList.length) {
      //   在最后一个
      nextId = componentList[index - 1].fe_id
    } else if (index === 0) {
      // 第一个
      nextId = componentList[index + 1].fe_id
    } else {
      nextId = componentList[index + 1].fe_id
    }
  }

  return nextId
}

// 插入组件方法
export function insertComponentToList(
  selectedId: string,
  componentList: ComponentInfoType[],
  copiedComponent: ComponentInfoType
) {
  const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)

  if (selectedIndex < 0) {
    //没有找到当前选中位置
    componentList.push(copiedComponent)
  } else {
    componentList.splice(selectedIndex + 1, 0, copiedComponent)
  }
}
