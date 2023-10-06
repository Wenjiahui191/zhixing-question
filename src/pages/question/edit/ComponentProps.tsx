import { ComponentPropsType, getComponentConf } from '@/components/questionComponents'
import useGetComponentsList from '@/hooks/useGetComponentsList'
import { ComponentInfoType, changeCompProps } from '@/store/componentsReducer'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'

function NoCho() {
  return <div>未选中组件</div>
}

const ComponentProps: FC = () => {
  const dispatch = useDispatch()
  const { componentList, selectedId } = useGetComponentsList()
  if (!selectedId) return <NoCho />

  const currentComponent = componentList.find(c => c.fe_id === selectedId) as ComponentInfoType
  if (!componentList) return <NoCho />

  const { type, props, isLocked } = currentComponent
  const ComponentConf = getComponentConf(type)
  if (!ComponentConf) return

  const { PropsComponent } = ComponentConf

  function handleChangeProps(newProps: ComponentPropsType) {
    dispatch(changeCompProps({ fe_id: selectedId, newProps }))
  }

  return <PropsComponent {...props} onChange={handleChangeProps} disabled={isLocked} />
}

export default ComponentProps
