import { RefObject, useEffect } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimationOptions {
  duration?: number;
  ease?: string;
  opacity?: number;
  scale?: number;
  marginTop?: number;
  marginRight?: number;
  marginLeft?: number;
}

const displayElementWhenPageLoads = (
  div: RefObject<HTMLDivElement | HTMLButtonElement | HTMLImageElement| HTMLSpanElement >,
  seconds: number,
  timeout: number
) => {
  let Div = div.current;
  let Sec = seconds;

  if (Div) {
    setTimeout(() => {
      gsap.to(Div, Sec, { opacity: 1, ease: 'Power2.out' });
    }, timeout);
  }
};

export default displayElementWhenPageLoads;

export const useScrollTriggerAnimation = (elementRef: RefObject<HTMLDivElement | HTMLButtonElement | HTMLImageElement | HTMLSpanElement>, options = {}) => {
  const animationIn = gsap.timeline({
    defaults: { duration: 1, ease: "power3.out", ...options } // Set defaults with options
  });

  animationIn.from(elementRef.current, { marginLeft: '0%' }) // Start from default state
    .to(elementRef.current, { marginLeft:  '0%',opacity:1, scrub: 1 }) // Animate margin: ;

  const animationOut = gsap.timeline({
    defaults: { duration: 1, ease: "power3.out", ...options } // Set defaults with options
  });

  animationOut.from(elementRef.current, { marginLeft: '0%' }) // Start from animated state
    .to(elementRef.current, { marginLeft: '100%', scrub: 1 }) // Animate margin back

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: elementRef.current,
      start: "bottom 50%",
      end: "bottom 40%",
      toggleActions: "play pause pause reset",
      onEnter: () => animationIn.play(),
      onLeave: () => animationOut.play(),
      onLeaveBack: () => animationOut.play(),
      onEnterBack: () => animationIn.play(),
    });

    return () => trigger.kill(); // Cleanup ScrollTrigger on unmount
  }, [elementRef, options]);
};

