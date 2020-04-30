<template>
  <div class="PullupLoad">
    <ul class="waterfall-list">
      <fadeIn-transition appear v-for="gif in gifs" :key="gif.id">
        <li class="waterfall-list-column">
          <div class="waterfall-content-item">
            <img lazyload="true" :src="gif.img_url" :alt="gif.name" />
          </div>
        </li>
      </fadeIn-transition>
    </ul>
    <div class="loading" v-show="loading">
      <Spinner></Spinner>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { ref, reactive, watch, onMounted } from "vue";
import FadeInTransition from "../components/FadeInTransition";
import Spinner from "../components/Spinner";
import useEndOfPage from "../composables/use-endofpage";
import { wait } from "../composables/utils";
import jsonp from "../api/index";
const BASE_URL = "https://interface.sina.cn/tech/gif/album.d.json";
const JSONPCONFIG = { param: "jsoncallback", prefix: "jsonp" };

export default {
  name: "PullupLoad",
  components: { FadeInTransition, Spinner },
  setup() {
    const gifs = reactive([]);
    const page = ref(1);
    const loading = ref(false);
    const error = ref(null);

    function next() {
      if (!loading.value) {
        page.value++;
        fetchData();
      }
    }
    async function fetchData() {
      error.value = null;
      loading.value = true;
      await wait(3000);
      jsonp(BASE_URL, { page: page.value, num: 10 }, JSONPCONFIG)
        .then(res => {
          if (res.status.code === "0") {
            res.data && gifs.push(...res.data);
          }
        })
        .catch(e => {
          error.value = e;
        })
        .finally(() => {
          loading.value = false;
        });
    }
    onMounted(() => fetchData());
    useEndOfPage(next, 150 /* px from bottom */);
    return {
      gifs,
      next,
      loading,
      error
    };
  }
};
</script>

<style>
.PullupLoad {
  max-width: 750px;
  margin: 0 auto;
}
.waterfall-list {
  /*多列的列数*/
  column-count: 2;
  /*列间距 */
  column-gap: 10px;
}

.waterfall-list-column {
  /*避免在主体框中插入任何中断（页面，列或区域） */
  break-inside: avoid;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid gainsboro;
}
.waterfall-list-column img {
  display: block;
  width: 100%;
  height: auto;
}
</style>