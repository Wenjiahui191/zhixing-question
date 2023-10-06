import React, { FC } from 'react'
import {
  copyComponent,
  deleteComponent,
  hideComponent,
  pasteComponent,
  resetComponentList,
  toggleComponentLock,
} from '@/store/componentsReducer'
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  RedoOutlined,
  UndoOutlined,
  UpOutlined,
} from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import { useDispatch } from 'react-redux'
import { ActionCreators } from 'redux-undo'
import useGetComponentsList from '@/hooks/useGetComponentsList'
import { useGetUndoInfo } from '@/hooks/useGetUndoInfo'

const EditToolBar: FC = () => {
  const dispatch = useDispatch()
  const { selectedComponent, componentList, copiedComponent, selectedId } = useGetComponentsList()
  const { isLocked } = selectedComponent || {}
  const length = componentList.length
  const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)
  const isFirst = selectedIndex <= 0
  const isLast = selectedIndex + 1 >= length
  const { pastComponentInfo = [], futureComponentInfo = [] } = useGetUndoInfo()
  const unableUndo = pastComponentInfo.length <= 0
  const unableRedo = futureComponentInfo.length <= 0

  // 删除
  function handleDelete() {
    dispatch(deleteComponent())
  }
  // 隐藏
  function handleHideComp() {
    dispatch(hideComponent({ fe_id: selectedId, isHidden: false }))
  }
  // 锁定
  function handleLocked() {
    dispatch(toggleComponentLock({ fe_id: selectedId }))
  }
  // 复制
  function handleCopy() {
    dispatch(copyComponent())
  }

  //粘贴
  function handlePaste() {
    dispatch(pasteComponent())
  }
  // 上移动
  function handleMoveUp() {
    if (isFirst) return
    dispatch(resetComponentList({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }))
  }
  // 下移
  function handleMoveDown() {
    if (isLast) return
    dispatch(resetComponentList({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }))
  }
  // 撤销
  function handleUndo() {
    dispatch(ActionCreators.undo())
  }
  // 重做
  function handleRedo() {
    dispatch(ActionCreators.redo())
  }

  return (
    <div>
      <Space>
        <Tooltip title="删除">
          <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete}></Button>
        </Tooltip>
        <Tooltip title="隐藏">
          <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHideComp}></Button>
        </Tooltip>
        <Tooltip title="锁定">
          <Button
            type={isLocked ? 'primary' : 'default'}
            shape="circle"
            icon={<LockOutlined />}
            onClick={handleLocked}
          ></Button>
        </Tooltip>
        <Tooltip title="复制">
          <Button shape="circle" icon={<CopyOutlined />} onClick={handleCopy}></Button>
        </Tooltip>
        <Tooltip title="粘贴">
          <Button
            disabled={copiedComponent === null}
            shape="circle"
            icon={<BlockOutlined />}
            onClick={handlePaste}
          ></Button>
        </Tooltip>
        <Tooltip title="上移">
          <Button
            disabled={isFirst}
            shape="circle"
            icon={<UpOutlined />}
            onClick={handleMoveUp}
          ></Button>
        </Tooltip>
        <Tooltip title="下移">
          <Button
            disabled={isLast}
            shape="circle"
            icon={<DownOutlined />}
            onClick={handleMoveDown}
          ></Button>
        </Tooltip>
        <Tooltip title="撤销">
          <Button
            disabled={unableUndo}
            shape="circle"
            icon={<UndoOutlined />}
            onClick={handleUndo}
          ></Button>
        </Tooltip>
        <Tooltip title="重做">
          <Button
            disabled={unableRedo}
            shape="circle"
            icon={<RedoOutlined />}
            onClick={handleRedo}
          ></Button>
        </Tooltip>
      </Space>
    </div>
  )
}

export default EditToolBar
