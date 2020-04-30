import { throttle } from 'lodash-es';
import { ref } from "vue";
import useEvent from "./use-event";

export default function useScroll(el) {
  let eventEl
  let scrollEl
  if (el) {
    eventEl = ref(el.value)
    scrollEl = el.value
  } else {
    eventEl = ref(window)
    scrollEl = document.documentElement
  }

  const scrollY = ref(null)
  const scrollX = ref(null)

  const handler = throttle(() => {
    scrollY.value = scrollEl.scrollTop
    scrollX.value = scrollEl.scrollLeft
  }, 100)

  useEvent(eventEl, 'scroll', handler)

  return {
    scrollX,
    scrollY
  }
}