<template>
  <div class="datePicker">
    <h3>Value: {{date}}</h3>
    <date-picker @update="date=$event"></date-picker>
  </div>
</template>

<script type="text/ecmascript-6">
import DatePicker from "../components/DatePicker";
import { ref } from "vue";

export default {
  name: "DatePicker",
  components: { DatePicker },
  setup() {
    const date = ref(null);
    return {
      date
    };
  }
};
</script>

<style>
</style>