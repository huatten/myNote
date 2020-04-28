<template>
  <div class="demo demo10">
    <h2>Teleport</h2>
    <h4>Portal 是特殊的组件，用来在当前组件之外渲染某些内容。对于每个 Portal，我们需要为其指定目标位置，在该目标位置将渲染 Portals 内容</h4>
    <h3>user name: {{username}}</h3>
    <button @click="isPopUpOpen = true">Remove user</button>
    <Teleport to="#popup-target">
      <transition name="modal">
        <div class="popup" v-show="isPopUpOpen">
          <div class="popup-wrap">
            <div class="popup-contain">
              <p>Are you sure ?</p>
              <button @click="removeUser">Yes</button>
              <button @click="isPopUpOpen = false">No</button>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script type="text/ecmascript-6">
import { ref } from "vue";
export default {
  setup() {
    const isPopUpOpen = ref(false);
    const username = ref("Portal");
    const removeUser = () => {
      isPopUpOpen.value = false;
      username.value = "";
    };
    return { username, isPopUpOpen, removeUser };
  }
};
</script>

<style>
.popup {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.popup-wrap {
  display: table-cell;
  vertical-align: middle;
}
.popup-contain {
  width: 300px;
  margin: 0px auto;
  text-align: center;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}
.popup-contain p {
  padding: 20px 0;
}

.popup-contain button {
  margin: 0 10px;
  padding: 8px 20px;
}
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>