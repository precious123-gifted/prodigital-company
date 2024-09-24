import gsap from "gsap"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export const animatePageIn = () => {
  const bannerOne = document.getElementById("banner-1")
  const bannerTwo = document.getElementById("banner-2")
  const bannerThree = document.getElementById("banner-3")
  const bannerFour = document.getElementById("banner-4")
  const bannerContainer = document.getElementById("banner-container");


  if (bannerOne && bannerTwo && bannerThree && bannerFour) {
    const tl = gsap.timeline()
    window.scrollTo(0, 0);
    tl.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: 0,
    }).to([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: 100,
      stagger: 0.2,
      onComplete: () => {
  gsap.to(bannerContainer, {
            opacity: 0,  
            zIndex: -1, 
            display:'none'
          });
      },
    })
  }
}

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const bannerOne = document.getElementById("banner-1");
  const bannerTwo = document.getElementById("banner-2");
  const bannerThree = document.getElementById("banner-3");
  const bannerFour = document.getElementById("banner-4");
  const bannerContainer = document.getElementById("banner-container");

  sessionStorage.setItem('menu', 'true');


  if (bannerOne && bannerTwo && bannerThree && bannerFour) {
    const tl = gsap.timeline();
    tl.set(bannerContainer, { opacity: 1, zIndex: 20, display: 'flex' });

    tl.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: -100,
    }).to([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: 0,
      stagger: 0.2,
      onComplete: () => {
        router.refresh();
        router.push(href);
      },
    });
  }
};
