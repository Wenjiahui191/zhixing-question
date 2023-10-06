import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '@comp/questionComponents'
import { nanoid } from 'nanoid'
import { arrayMove } from '@dnd-kit/sortable'
import { produce } from 'immer'
import { getNextComponentId, insertComponentToList } from './utils'
// 问卷单个题目的信息类型
export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  isHidden: boolean
  isLocked: boolean
  props: ComponentPropsType
}

// 存储的问卷题目列表类型
export type ComponentStateType = {
  selectedId: string
  componentList: Array<ComponentInfoType>
  copiedComponent: ComponentInfoType | null
}

const INIT_STATE: ComponentStateType = {
  selectedId: '',
  componentList: [],
  copiedComponent: null,
}

export const componentSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    resetComponents: (state: ComponentStateType, action: PayloadAction<ComponentStateType>) => {
      state = action.payload
    },
    // 重置componentList
    resetComponentList: (
      state: ComponentStateType,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { componentList } = state
      const { newIndex, oldIndex } = action.payload
      const newComponentList = arrayMove(componentList, oldIndex, newIndex)
      state.componentList = newComponentList
    },
    //   切换选中
    changeSelectedId: (state: ComponentStateType, action: PayloadAction<string>) => {
      state.selectedId = action.payload
    },
    // 添加组件到画布
    addComponent: (state: ComponentStateType, action: PayloadAction<ComponentInfoType>) => {
      const component = action.payload
      const { selectedId, componentList } = state
      const index = componentList.findIndex(c => c.fe_id === selectedId)

      state.selectedId = component.fe_id
      if (index < 0) {
        componentList.push(component)
      } else {
        componentList.splice(index + 1, 0, component)
      }
    },
    // 编辑组件属性
    changeCompProps: (
      state: ComponentStateType,
      action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
    ) => {
      const { fe_id, newProps } = action.payload
      const { componentList } = state

      const currentComp = componentList.find(c => c.fe_id === fe_id)

      if (!currentComp) return
      currentComp.props = newProps
    },
    //删除组件
    deleteComponent: (state: ComponentStateType) => {
      const { componentList, selectedId: removeId } = state
      const index = componentList.findIndex(c => c.fe_id === removeId)

      state.selectedId = getNextComponentId(removeId, componentList)

      if (index >= 0) {
        state.componentList.splice(index, 1)
      }
    },
    // 隐藏/显示组件
    hideComponent: (
      state: ComponentStateType,
      action: PayloadAction<{ fe_id: string; isHidden: boolean }>
    ) => {
      const { componentList, selectedId } = state
      const { fe_id = selectedId, isHidden } = action.payload
      const currentComp = componentList.find(c => c.fe_id === fe_id)

      /*如果isHidden为true，则寻找下一个选择项，为false则选择这条*/
      if (isHidden) {
        state.selectedId = getNextComponentId(
          selectedId,
          componentList.filter(c => !c.isHidden)
        )
      } else {
        state.selectedId = fe_id
      }

      if (currentComp) {
        currentComp.isHidden = isHidden
      }
    },
    // 锁定/解锁组件
    toggleComponentLock: (state: ComponentStateType, action: PayloadAction<{ fe_id: string }>) => {
      const { componentList, selectedId } = state
      const { fe_id = selectedId } = action.payload
      const currentComp = componentList.find(c => c.fe_id === fe_id)

      if (currentComp) {
        currentComp.isLocked = !currentComp.isLocked
      }
    },
    // 复制当前的组件
    copyComponent: (state: ComponentStateType) => {
      const { selectedId, componentList = [] } = state
      const currentComp = componentList.find(c => c.fe_id === selectedId)

      if (currentComp) {
        const copiedComp = JSON.parse(JSON.stringify(currentComp))
        state.copiedComponent = copiedComp
      }
    },
    // 粘贴组件
    pasteComponent: (state: ComponentStateType) => {
      const { copiedComponent, componentList = [], selectedId } = state
      if (copiedComponent === null) return
      copiedComponent.fe_id = nanoid()
      state.selectedId = copiedComponent.fe_id
      insertComponentToList(selectedId, componentList, copiedComponent)
    },
    // 向上选择组件
    choPreComponent: (state: ComponentStateType) => {
      const { selectedId, componentList } = state
      const selectIndex = componentList.findIndex(c => c.fe_id === selectedId)

      if (selectIndex <= 0) return
      state.selectedId = componentList[selectIndex - 1].fe_id
    },
    // 向下选择组件
    choNextComponent: (state: ComponentStateType) => {
      const { selectedId, componentList } = state
      const selectIndex = componentList.findIndex(c => c.fe_id === selectedId)

      if (selectIndex < 0 || selectIndex + 1 === componentList.length) return
      state.selectedId = componentList[selectIndex + 1].fe_id
    },
    // 修改组件title
    changeCoponentTitle: (
      state: ComponentStateType,
      action: PayloadAction<{ fe_id: string; newTitle: string }>
    ) => {
      const { componentList = [] } = state
      const { fe_id, newTitle } = action.payload
      const curComp = componentList.find(c => c.fe_id === fe_id)
      if (!curComp) return
      curComp.title = newTitle
    },
  },
})

export const {
  resetComponents,
  resetComponentList,
  changeSelectedId,
  addComponent,
  changeCompProps,
  deleteComponent,
  hideComponent,
  toggleComponentLock,
  copyComponent,
  pasteComponent,
  choPreComponent,
  choNextComponent,
  changeCoponentTitle,
} = componentSlice.actions

export default componentSlice.reducer
