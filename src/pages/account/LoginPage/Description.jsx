import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useTransition, animated } from '@react-spring/web'

import styles from './styles.module.css'

function Description() {
  const ref = useRef([])
  const [items, set] = useState([])
  const transitions = useTransition(items, {
    from: {
      opacity: 0,
      height: 0,
      innerHeight: 0,
      transform: 'perspective(600px) rotateX(0deg)',
      color: '#8fa5b6',
    },
    enter: [
      { opacity: 1, height: 80, innerHeight: 80 },
      { transform: 'perspective(600px) rotateX(180deg)', color: '#28d79f' },
      { transform: 'perspective(600px) rotateX(0deg)' },
    ],
    leave: [{ color: '#c23369' }, { innerHeight: 0 }, { opacity: 0, height: 0 }],
    update: { color: '#28b4d7' },
  })

  const reset = useCallback(() => {
    ref.current.forEach(clearTimeout)
    ref.current = []
    set([])
    ref.current.push(setTimeout(() => set(['Liquest', 'aivle', '아름답다']), 500))
    ref.current.push(setTimeout(() => set(['Liquest', '아름답다']), 3500))
    ref.current.push(setTimeout(() => set(['Liquest', '토리', '아름답다']), 6500))
  }, [])

  useEffect(() => {
    reset()
    return () => ref.current.forEach(clearTimeout)
  }, [])
  return (
    <div className='w-[50%]'>
        <div className={styles.container_login}>
          <div className={styles.main_login}>
            {transitions((animationStyles, item) => (
              <animated.div className={styles.transitionsItem_login} style={animationStyles} onClick={reset}>
                <animated.div style={{ overflow: 'hidden', height: animationStyles.innerHeight }}>{item}</animated.div>
              </animated.div>
            ))}
          </div>
      </div>
    </div>
  )
}

export default Description