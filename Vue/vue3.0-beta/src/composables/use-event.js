import { ref, onMounted, onUnmounted } from "vue";
import { unwrap } from "./utils";
export default function useEvent(el = ref(document), name, handler) {
  el = unwrap(el)
  onMounted(() => el && el.addEventListener(name, handler))
  onUnmounted(() => el && el.removeEventListener(name, handler))
}
