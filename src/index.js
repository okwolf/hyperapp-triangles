import { app, h } from "hyperapp"
import html from "./html"
const { main, div } = html(h)

const UpdateHover = (state, hover) => ({
  ...state,
  hover
})

const Dot = ({ x, y, size, path, text, hover }) => {
  const s = size * 1.3
  return div(
    {
      class: { dot: true, hover: hover === path },
      style: {
        width: `${s}px`,
        height: `${s}px`,
        left: `${x}px`,
        top: `${y}px`,
        borderRadius: `${s / 2}px`,
        lineHeight: `${s}px`
      },
      onmouseover: [UpdateHover, path],
      onmouseout: UpdateHover
    },
    text
  )
}

const SierpinskiTriangle = ({
  x = 0,
  y = 0,
  size = 1000,
  targetSize = 25,
  path = "",
  text,
  hover
}) => {
  if (size <= targetSize) {
    return Dot({
      x: x - targetSize / 2,
      y: y - targetSize / 2,
      size: targetSize,
      path,
      text,
      hover
    })
  }
  var slowDown = false
  if (slowDown) {
    var e = performance.now() + 0.8
    while (performance.now() < e) {
      // Artificially long execution time.
    }
  }
  var nextSize = size / 2
  return div(
    SierpinskiTriangle({
      x,
      y: y - nextSize / 2,
      size: nextSize,
      path: `${path}.top`,
      text,
      hover
    }),
    SierpinskiTriangle({
      x: x - nextSize,
      y: y + nextSize / 2,
      size: nextSize,
      path: `${path}.left`,
      text,
      hover
    }),
    SierpinskiTriangle({
      x: x + nextSize,
      y: y + nextSize / 2,
      size: nextSize,
      path: `${path}.right`,
      text,
      hover
    })
  )
}

app({
  init: () => [
    { elapsed: 0 },
    [
      dispatch => {
        const tick = elapsed => {
          dispatch(state => ({ ...state, elapsed }))
          requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    ]
  ],
  view: ({ elapsed, hover }) => {
    const t = (elapsed / 1000) % 10
    const scale = 1 + (t > 5 ? 10 - t : t) / 10
    return main(
      {
        style: {
          transform: `scaleX(${scale / 2.1}) scaleY(0.7) translateZ(0.1px)`
        }
      },
      SierpinskiTriangle({ text: Math.ceil(t), hover })
    )
  },
  node: document.body
})
