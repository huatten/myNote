import useScroll from "./use-scroll";
import { watch } from "vue";
export default function useEndOfPage(fn, distance = 100) {
  const { scrollY } = useScroll();
  watch(scrollY, (newY, oldY) => {
    if (newY < oldY) return;
    const isBottom = document.documentElement.scrollHeight - (window.innerHeight + newY) < distance;
    isBottom && fn();
  });
}