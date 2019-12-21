import * as CSS from 'csstype'
import { spring } from './spring'
import { interpolate } from './interpolate'
// import BezierEasing from 'bezier-easing'

// import { velocityFromPlaytime } from './velocityFromPlaytime'

export const msPerFrame = 1000 / 60
export const ease = [0.445, 0.05, 0.55, 0.95]
const EASE = `cubic-bezier(${ease.join(', ')})`
// const easeFn = BezierEasing(0.445, 0.05, 0.55, 0.95)

export type Max = [number, number, number]
export type Maxes = Max[]
export type TransformProperty =
  | 'scale'
  | 'x'
  | 'y'
  | 'rotate'
  | 'scaleX'
  | 'scaleY'
export type CSSProperty = keyof CSS.Properties
export type CSSFrame = [CSSProperty, number | string]
export type TransformFrame = [TransformProperty, number]
export type Property = CSSProperty | TransformProperty
export type Frame = { [K in Property]?: number }

type PropertyAmplitude = [Property, Maxes]

const transforms = ['scale', 'x', 'y', 'rotate', 'scaleX', 'scaleY']
const unitless = ['opacity', 'transform', 'color', 'background']
const tweenedProperties: Property[] = [
  'color',
  'backgroundColor',
  'background',
  'borderRadius',
]

type FrameNumber = number | string

type Keyframe = [
  /** Frame */
  FrameNumber,
  /** value */
  CSSFrame[]
]

// function convertMaxesToKeyframes(
//   maxes: Maxes,
//   toFrame: (value: number) => number,
//   from: Frame,
//   to: Frame
// ): Keyframe[] {
//   return maxes.map(([value, index]) => [
//     toFrame(index),
//     toValue(value, from, to),
//   ])
// }

// function toValue(value: number, from: Frame, to: Frame): CSSFrame[] {
//   let style: CSSFrame[] = []
//   let transform: TransformFrame[] = []
//   const keys = Object.keys(from) as Property[]

//   keys.forEach(key => {
//     if (transforms.includes(key)) {
//       transform.push([
//         key,
//         interpolate(1, 0, from[key], to[key])(value),
//       ] as TransformFrame)
//     } else {
//       style.push([
//         key,
//         interpolate(1, 0, from[key], to[key])(value),
//       ] as CSSFrame)
//     }
//   })

//   if (transform.length > 0) {
//     style.push(['transform', createTransformBlock(transform)])
//   }

//   return style
// }

function createTransformBlock(transforms: TransformFrame[]): string {
  const props: Partial<Record<TransformProperty, number>> = {}

  transforms.forEach(([key, value]) => {
    props[key] = value
  })

  const { x, y, scale, rotate, scaleX, scaleY } = props

  const block = []

  // @TODO: Probably better to use a matrix3d here.
  if (x !== undefined || y !== undefined) {
    block.push(`translate3d(${x || 0}px, ${y || 0}px, 0px)`)
  }
  if (rotate !== undefined) {
    block.push(`rotate3d(0, 0, 1, ${rotate}deg)`)
  }
  if (scale !== undefined) {
    block.push(`scale3d(${scale}, ${scale}, 1)`)
  }
  if (scaleX !== undefined || scaleY !== undefined) {
    block.push(
      `scale3d(${scaleX !== undefined ? scaleX : 1}, ${
        scaleY !== undefined ? scaleY : 1
      }, 1)`
    )
  }

  return block.join(' ')
}

// function transformProp(string: string) {
//   string
//     .replace(/([A-Z])([A-Z])/g, '$1-$2')
//     .replace(/([a-z])([A-Z])/g, '$1-$2')
//     .replace(/[\s_]+/g, '-')
//     .toLowerCase()
// }

function createBlock(value: CSSFrame[]) {
  return value
    .map(([prop, val]) => `${prop}: ${val}${unitForProp(prop)}`)
    .join('; ')
}

function unitForProp(prop: Property) {
  return unitless.includes(prop) ? '' : 'px'
}

function convertKeyframesToCSS(keyframes: Keyframe[]): string {
  return keyframes
    .map(([frame, value]) => `${frame}% {${createBlock(value)};}`)
    .join('\n ')
}

export interface Options {
  stiffness?: number
  damping?: number
  mass?: number
  precision?: number
  velocity?: number
  complex?: boolean
}

const defaults = {
  stiffness: 180,
  damping: 12,
  mass: 1,
  precision: 0.01,
  velocity: 0,
  complex: true,
}

function createTweenedKeyframes(from: CSSFrame[], to: CSSFrame[]): Keyframe[] {
  return [[0, from], [100, to]]
}

function breakupFrame(frame: Frame): [CSSFrame[], Frame] {
  let tweened: CSSFrame[] = []
  let sprung: Frame = {}

  const keys = Object.keys(frame) as Property[]

  keys.forEach(key => {
    if (tweenedProperties.includes(key)) {
      // @ts-ignore
      tweened.push([key, frame[key]])
    } else {
      sprung[key] = frame[key]
    }
  })

  return [tweened, sprung]
}

function springEachProp({
  from,
  to,
  options,
}: {
  from: Frame
  to: Frame
  options: Required<Options>
}): [PropertyAmplitude[], number] {
  let finalFrame = 0

  const independentMaxes: [Property, Maxes][] = []
  const keys = Object.keys(to) as Property[]

  keys.forEach(property => {
    const [maxes, lastFrame] = spring({
      from: from[property] as number,
      to: to[property] as number,
      ...options,
    })

    independentMaxes.push([property, maxes])

    // console.log(lastFrame, finalFrame)
    if (lastFrame > finalFrame) {
      finalFrame = lastFrame
    }
  })

  console.log(finalFrame)

  return [independentMaxes, finalFrame]
}

type FrameValues = Record<string, [Property, number][]>

function groupAmplitudesByFrame(
  propertyAmplitudes: PropertyAmplitude[],
  toFrame: (v: number) => number,
  to: Frame
): [FrameValues, FrameValues] {
  const frameVelocities: FrameValues = {}
  const frameValues: FrameValues = {}

  propertyAmplitudes.forEach(([property, maxes]) => {
    for (let index = 0; index < maxes.length; index++) {
      let [value, frame, velocity] = maxes[index]

      frame = toFrame(frame)

      if (frame === 100 && to[property]) {
        value = to[property] as number
      }

      if (frameVelocities[frame]) {
        frameValues[frame].push([property, Math.round(value * 100) / 100])
        frameVelocities[frame].push([property, velocity])
      } else {
        frameValues[frame] = [[property, Math.round(value * 100) / 100]]
        frameVelocities[frame] = [[property, velocity]]
      }
    }
  })
  const toKeys = Object.keys(to) as Property[]
  //@ts-ignore
  frameValues['100'] = toKeys.map(property => [property, to[property]])

  return [frameValues, frameVelocities]
}

function keyframesFromFrameValues(frameValues: FrameValues) {
  //@ts-ignore
  let keyframes: [string, CSSFrame[]] = []
  const frames = Object.keys(frameValues) as string[]

  for (let index = 0; index < Object.keys(frameValues).length; index++) {
    const frame = frames[index]
    let transform: TransformFrame[] = []
    let style: CSSFrame[] = []

    frameValues[frame].forEach(([property, value]) => {
      if (transforms.includes(property)) {
        transform.push([property, value] as TransformFrame)
      } else {
        style.push([property, value] as CSSFrame)
      }
    })

    if (transform.length > 0) {
      style.push(['transform', createTransformBlock(transform)])
    }
    //@ts-ignore
    keyframes.push([frame, style])
  }

  return keyframes
}

export default function main(
  from: Frame,
  to: Frame,
  options?: Options
): [string[], string, string, (frame: number) => number] {
  const optionsWithDefaults = {
    ...defaults,
    ...options,
  }

  const animations: string[] = []

  // const [maxes, lastFrame] = spring(optionsWithDefaults)

  // Interpolate between keyframe values of 0 - 100 and frame indexes of 0 - x where x is the lastFrame.
  // const toFrame = interpolate(0, lastFrame, 0, 100)
  // const toPreciseFrame = interpolate(0, lastFrame, 0, 100, v => v, 1)

  // Separate Tweened and Sprung properties.
  const [tFrom, sFrom] = breakupFrame(from)
  const [tTo, sTo] = breakupFrame(to)

  const [propertyAmplitudes, finalFrame] = springEachProp({
    from: sFrom,
    to: sTo,
    options: optionsWithDefaults,
  })

  console.log(propertyAmplitudes)

  const [frameValues] = groupAmplitudesByFrame(
    propertyAmplitudes,
    interpolate(0, finalFrame, 0, 100),
    to
  )

  // ['rotate', [[value, frame, velocity], ...]][] - PropertyAmplitudes

  // [frame, [['rotate', value], ['scaleX', value]]][] - FramePropertyAmplitudes

  // [frame, string][] - CSSFrames

  // [frame, [['rotate', velocity], ['scaleX', velocity]]][]

  // Generate keyframe, styled value tuples.
  if (Object.keys(sFrom).length || Object.keys(sTo).length) {
    // const springKeyframes = convertMaxesToKeyframes(maxes, toFrame, sFrom, sTo)
    const complexSpringKeyframes = keyframesFromFrameValues(frameValues)
    console.log(complexSpringKeyframes)
    //@ts-ignore
    animations.push(convertKeyframesToCSS(complexSpringKeyframes))
  }
  if (tFrom.length || tTo.length) {
    const tweenedKeyframes = createTweenedKeyframes(tFrom, tTo)
    animations.push(convertKeyframesToCSS(tweenedKeyframes))
  }

  // Calculate duration based on the number of frames.
  const duration = Math.round(msPerFrame * finalFrame * 100) / 100 + 'ms'

  // Create a function to return a frame for a play time.
  // Enables interrupting animations by creating new ones that start from the current velocity and frame.
  // const convertTimeToApproxVelocity = velocityFromPlaytime(
  //   toPreciseFrame,
  //   maxes
  // )
  return [animations, duration, EASE, v => v]
}
