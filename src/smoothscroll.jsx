"use client";
import { ReactLenis, useLenis } from 'lenis/react'

function Layout() {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  })

  return (
    <ReactLenis root>
      { /* content */ }
    </ReactLenis>
  )
}


function SmoothScrolling({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.005, duration: 2.5, smoothTouch: true }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;