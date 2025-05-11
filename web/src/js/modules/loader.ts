import { hey } from "../hey"
import gsap from "../gsap"

export class Loader {
  element: HTMLDivElement
  circle: SVGElement
  #onLoad = hey.on("START", () => this.animateIn())

  constructor(element: HTMLDivElement) {
    // console.log("loader", element)
    this.element = element
    this.circle = window.app.loader.circle
    this.svg = this.circle.parentElement
    this.squares = [...this.element.querySelectorAll("[data-square]")]
  }

  animateIn = () => {
    window.app.loader.timeouts.forEach(timeout => clearTimeout(timeout))

    this.circle.style.transitionDuration = ".4s"
    this.circle.style.transitionDelay = "0s"
    this.circle.style.strokeDashoffset = "0px"

    gsap.to(this.svg, {
      scale: 0,
      duration: 0.8,
      delay: 0.6,
      ease: "power2.inOut",
    })

    gsap.to(this.squares, {
      scale: 0,
      duration: 1.3,
      delay: 0.3,
      ease: "power2.inOut",
    })

    gsap.to(this.element, {
      autoAlpha: 0,
      duration: 0.2,
      delay: 0.8,
      ease: "expo.out",
      onComplete: () => {
        this.element.remove()
      },
    })
  }
}
