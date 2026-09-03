import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({
    autoSleep: 60,
    nullTargetWarn: false,
  });
}

export { gsap, ScrollTrigger };
