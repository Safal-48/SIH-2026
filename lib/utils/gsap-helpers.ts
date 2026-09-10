import gsap from "gsap";

/**
 * Checks whether user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Creates a smooth stagger reveal for list elements using GSAP
 */
export function gsapStaggerReveal(
  target: string | Element | Element[],
  options?: {
    stagger?: number;
    duration?: number;
    delay?: number;
    yOffset?: number;
  }
) {
  if (prefersReducedMotion() || typeof window === "undefined") return null;

  return gsap.fromTo(
    target,
    {
      opacity: 0,
      y: options?.yOffset ?? 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 0.8,
      stagger: options?.stagger ?? 0.1,
      delay: options?.delay ?? 0,
      ease: "power2.out",
    }
  );
}

/**
 * Creates a counter animation for KPI stats
 */
export function gsapCounter(
  target: HTMLElement,
  endValue: number,
  duration = 1.8
) {
  if (prefersReducedMotion() || typeof window === "undefined") {
    target.innerText = endValue.toLocaleString("en-IN");
    return;
  }

  const obj = { val: 0 };
  gsap.to(obj, {
    val: endValue,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      target.innerText = Math.floor(obj.val).toLocaleString("en-IN");
    },
  });
}
