import React from 'react'
import logo from './logo.svg'
import './App.css'
import {
  animated,
  useSpring,
  AnimateExit,
} from '@spring-keyframes/react-emotion'
import { motion } from 'framer-motion'
const list = [1]

function App() {
  const [visible, setVisible] = React.useState(true)
  const [warp, setWarp] = React.useState(false)
  // const { ref } = useSpring({
  //   initial: { scale: 0, rotate: -45 },
  //   animate: { scale: 1, rotate: 0 },
  //   transition: { stiffness: 200, damping: 4, mass: 1 },
  // })

  return (
    <div className="App">
      <header className="App-header">
        {/* <div ref={ref}> wowowowowow</div> */}
        <animated.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 0.8, opacity: 1 }}
          transition={{
            stiffness: 400,
            damping: 10,
            mass: 1,
          }}
          whileTap={{ scaleX: 2, opacity: 1 }}>
          <div style={{ background: 'red', height: 200, width: 200 }}> </div>
        </animated.div>
        {/* <animated.div
          initial={{ scale: 0.1, opacity: 0.1, rotate: 0.1 }}
          whileHover={{ scale: 1.5, opacity: 1, rotate: 90 }}
          whileTap={{ scale: 2, opacity: 1, rotate: 45 }}
          animate={{ scale: 1, opacity: 1, rotate: 45 }}>
          <img src={logo} className="App-logo" alt="logo" />
        </animated.div>
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: 0 }}
          animate={{ scale: 1, opacity: 1, rotate: 45 }}
          whileTap={{ scale: 2, opacity: 1, rotate: 45 }}
          whileHover={{ scale: 1.5, opacity: 1, rotate: 90 }}>
          <img src={logo} className="App-logo" alt="logo" />
        </motion.div> */}
        {/* <animated.div
          initial={{
            scale: 0,
            rotate: -50,
            opacity: 0,
            color: 'red',
          }}
          animate={{ scale: 1, rotate: 5, opacity: 1, color: 'blue' }}
          whileTap={{
            scale: 2,
            rotate: -10,
            opacity: 1,
            color: 'blue',
          }}
          whileHover={{
            scale: 1.5,
            rotate: 10,
            opacity: 0.4,
            color: 'red',
          }}
          transition={{
            stiffness: 200,
            damping: 4,
            mass: 1,
          }}>
          WOW
        </animated.div>
        <animated.div
          initial={{ scale: 0, opacity: 0 }}
          transition={{
            stiffness: 200,
            damping: 4,
            mass: 1,
          }}
          animate={{ scale: 1, opacity: 1 }}>
          <div style={{ position: 'relative' }}>
            <animated.div
              initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
              transition={{
                stiffness: 200,
                damping: 4,
                mass: 1,
              }}
              animate={{ scale: 1, opacity: 1, x: 0, y: 90 }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="122.263"
                style={{
                  mixBlendMode: 'color-dodge',
                  position: 'absolute',
                  left: 30,
                  top: 100,
                }}
                height="177.854">
                <g>
                  <defs>
                    <linearGradient
                      id="idSWQcsECzWg1956077578"
                      gradientTransform="rotate(-58, 0.5, 0.5)">
                      <stop
                        offset="0"
                        stop-color="rgba(255, 25, 92, 1.00)"
                        stop-opacity="1"></stop>
                      <stop
                        offset="1"
                        stop-color="rgba(254, 71, 62, 1.00)"
                        stop-opacity="1"></stop>
                    </linearGradient>
                  </defs>
                  <path
                    d="M 23.073 33.081 C 16.774 69.652 6.607 127.583 0.171 166.775 C -0.36 170.677 0.171 174.726 4.282 176.787 C 8.392 178.848 14.055 177.743 16.027 175.02 C 43.585 133.198 93.682 57.97 120.555 15.412 C 122.76 11.797 122.904 7.461 120.555 3.633 C 118.206 -0.195 112.899 -0.158 111.159 0.099 C 91.157 4.171 61.853 10.708 40.691 15.412 C 38.11 16.082 33.791 17.621 29.533 21.302 C 25.276 24.983 23.378 31.602 23.073 33.081 Z"
                    fill="url(#idSWQcsECzWg1956077578)"></path>
                </g>
              </svg>
            </animated.div>
            <animated.div
              initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
              transition={{
                stiffness: 200,
                damping: 4,
                mass: 1,
              }}
              animate={{ scale: 1, opacity: 1, x: 0, y: 90 }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="122.263"
                style={{ mixBlendMode: 'normal' }}
                height="177.854">
                <g>
                  <defs>
                    <linearGradient
                      id="idRNSXsTle7g1796389668"
                      gradientTransform="rotate(123, 0.5, 0.5)">
                      <stop
                        offset="0"
                        stop-color="rgba(0, 78, 255, 1.00)"
                        stop-opacity="1"></stop>
                      <stop
                        offset="1"
                        stop-color="rgba(1, 211, 255, 1.00)"
                        stop-opacity="1"></stop>
                    </linearGradient>
                  </defs>
                  <path
                    d="M 23.073 33.081 C 16.774 69.652 6.607 127.583 0.171 166.775 C -0.36 170.677 0.171 174.726 4.282 176.787 C 8.392 178.848 14.055 177.743 16.027 175.02 C 43.585 133.198 93.682 57.97 120.555 15.412 C 122.76 11.797 122.904 7.461 120.555 3.633 C 118.206 -0.195 112.899 -0.158 111.159 0.099 C 91.157 4.171 61.853 10.708 40.691 15.412 C 38.11 16.082 33.791 17.621 29.533 21.302 C 25.276 24.983 23.378 31.602 23.073 33.081 Z"
                    transform="rotate(180 61.132 88.927)"
                    fill="url(#idRNSXsTle7g1796389668)"></path>
                </g>
              </svg>
            </animated.div>
          </div>
        </animated.div> */}
        {/* <animated.div
          initial={{
            scale: 0,
            rotate: -50,
            opacity: 0,
          }}
          animate={{ scale: 1, rotate: 5, opacity: 1 }}
          whileTap={{
            scale: 2,
            rotate: -10,
            opacity: 1,
          }}
          whileHover={{
            scale: 1.5,
            rotate: 10,
            opacity: 0.4,
          }}
          transition={{
            stiffness: 200,
            damping: 4,
            mass: 1,
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="209" height="312">
            <g transform="translate(15.04 15.16) rotate(-11 94.298 133.959)">
              <g>
                <defs>
                  <linearGradient
                    id="idHfqgY2lShg-1824132296"
                    gradientTransform="rotate(135, 0.5, 0.5)">
                    <stop
                      offset="0"
                      stopColor="hsl(200, 100%, 63%)"
                      stopOpacity="1"></stop>
                    <stop
                      offset="1"
                      stopColor="hsl(223, 100%, 48%)"
                      stopOpacity="1"></stop>
                  </linearGradient>
                </defs>
                <path
                  d="M 162.483 1.078 C 158.858 -0.797 154.131 0.037 152.483 1.578 C 112.358 39.078 14.711 138.35 1.983 151.078 C -0.023 153.163 -0.475 156.762 0.483 159.578 C 1.44 162.394 4.537 165.078 8.983 165.078 C 31.569 165.078 64.809 165.078 90.483 165.078 C 97.398 165.078 104.608 164.203 111.483 159.578 C 118.358 154.953 117.356 152.806 119.983 145.578 C 120.887 143.088 163.983 9.078 163.983 9.078 C 163.983 9.078 166.108 2.953 162.483 1.078 Z"
                  fill="url(#idHfqgY2lShg-1824132296)"></path>
              </g>
              <g>
                <defs>
                  <linearGradient
                    id="idV5r3Zcpazg-1468443830"
                    gradientTransform="rotate(135, 0.5, 0.5)">
                    <stop
                      offset="0"
                      stopColor="hsl(349, 100%, 63%)"
                      stopOpacity="1"></stop>
                    <stop
                      offset="1"
                      stopColor="hsl(3, 94%, 68%)"
                      stopOpacity="1"></stop>
                  </linearGradient>
                </defs>
                <path
                  d="M 162.483 1.078 C 158.858 -0.797 154.131 0.037 152.483 1.578 C 112.358 39.078 14.711 138.35 1.983 151.078 C -0.023 153.163 -0.475 156.762 0.483 159.578 C 1.44 162.394 4.537 165.078 8.983 165.078 C 31.569 165.078 64.809 165.078 90.483 165.078 C 97.398 165.078 104.608 164.203 111.483 159.578 C 118.358 154.953 117.356 152.806 119.983 145.578 C 120.887 143.088 163.983 9.078 163.983 9.078 C 163.983 9.078 166.108 2.953 162.483 1.078 Z"
                  transform="translate(23.995 102.84) rotate(180 82.301 82.539)"
                  fill="url(#idV5r3Zcpazg-1468443830)"></path>
              </g>
              <g>
                <defs>
                  <linearGradient
                    id="idVXy6aq0XBg1934149842"
                    gradientTransform="rotate(228, 0.5, 0.5)">
                    <stop
                      offset="0"
                      stopColor="rgba(255, 255, 255, 0.81)"
                      stopOpacity="0.81"></stop>
                    <stop
                      offset="1"
                      stopColor="hsl(211, 100%, 79%)"
                      stopOpacity="1"></stop>
                  </linearGradient>
                </defs>
                <path
                  d="M 68.65 122.34 C 71.276 115.112 70.275 112.965 77.15 108.34 C 84.025 103.715 91.235 102.84 98.15 102.84 C 109.125 102.84 121.482 102.84 133.799 102.84 C 126.321 126.046 120.311 144.661 119.979 145.574 C 117.353 152.802 118.354 154.949 111.479 159.574 C 104.604 164.199 97.394 165.074 90.479 165.074 C 79.504 165.074 67.147 165.074 54.83 165.074 C 62.308 141.869 68.318 123.254 68.65 122.34 Z"
                  fill="url(#idVXy6aq0XBg1934149842)"></path>
              </g>
            </g>
          </svg>
        </animated.div>
        <div style={{ marginBottom: 100 }}></div>
        <button onClick={() => setWarp(!warp)}> toggle </button>
        <div style={{ marginBottom: 100 }}></div>

        <animated.div
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ rotate: warp ? 45 : 0, opacity: 1 }}
          transition={{
            stiffness: 200,
            damping: 4,
            mass: 1,
          }}>
          <img src={logo} className="App-logo" alt="logo" />
        </animated.div>
        <div style={{ marginBottom: 100 }}></div>
        <button onClick={() => setVisible(!visible)}> toggle </button>
        <div style={{ marginBottom: 100 }}></div>
        <AnimateExit>
          {list.map(
            i =>
              visible && (
                <animated.li
                  key={i}
                  initial={{ x: 0.1 }}
                  animate={{ x: 400 }}
                  exit={{ x: 0.1 }}
                  transition={{
                    stiffness: 200,
                    damping: 4,
                    mass: 1,
                  }}>
                  Edit <code>src/App.js</code> and save to reload.
                </animated.li>
              )
          )}
        </AnimateExit> */}
      </header>
    </div>
  )
}

export default App
