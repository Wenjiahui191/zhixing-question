import Lottie from 'lottie-react'
import React, { FC } from 'react'
import BG1 from '@/images/bg-left.json'
import BG2 from '@/images/bg-right.json'
import styles from './Lottie.module.scss'

const LottieBox: FC = () => {
  return (
    <div>
      <Lottie className={styles['bg-left']} animationData={BG1} loop={true} />
      <Lottie className={styles['bg-right']} animationData={BG2} loop={true} />
    </div>
  )
}

export default LottieBox
