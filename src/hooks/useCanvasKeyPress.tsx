import {
  choNextComponent,
  choPreComponent,
  copyComponent,
  deleteComponent,
  pasteComponent,
} from '@/store/componentsReducer'
import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import { ActionCreators } from 'redux-undo'

function isActive() {
  const activeDom = document.activeElement
  if (activeDom === document.body) return false
  if (activeDom?.matches('div[role="button"]')) return false
  return true
}

export default function useCanvasKeyPress() {
  const dispatch = useDispatch()
  // 删除
  useKeyPress(['delete', 'backspace'], () => {
    if (isActive()) return
    dispatch(deleteComponent())
  })
  // 复制
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (isActive()) return
    dispatch(copyComponent())
  })
  // 粘贴
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (isActive()) return
    dispatch(pasteComponent())
  })
  // 向上选择
  useKeyPress('uparrow', () => {
    if (isActive()) return
    dispatch(choPreComponent())
  })
  // 向下选择
  useKeyPress('downarrow', () => {
    if (isActive()) return
    dispatch(choNextComponent())
  })

  // 撤销
  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      if (isActive()) return
      dispatch(ActionCreators.undo())
    },
    {
      exactMatch: true,
    }
  )

  // 重做
  useKeyPress(
    ['ctrl.shift.z', 'meta.shift.z'],
    () => {
      if (isActive()) return
      dispatch(ActionCreators.redo())
    },
    {
      exactMatch: true,
    }
  )
}
