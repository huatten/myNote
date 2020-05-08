<template>
  <div class="DatePicker">
    <div class="select">
      <select @change="editValue('year', $event)" ref="year">
        <option
          v-for="(item) in numberofYears"
          :key="item"
          :value="startYear+(item-1)"
        >{{startYear+(item-1)}}</option>
      </select>
    </div>
    <div class="select">
      <select @change="editValue('month', $event)" ref="month">
        <option v-for="(month, index) in months" :key="month" :value="index">{{month}}</option>
      </select>
    </div>
    <div class="select">
      <select @change="editValue('year', $event)" ref="date">
        <option v-for="item in daysInMonth" :key="item" :value="item">{{ item }}</option>
      </select>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import moment from "moment";
import { ref, onMounted } from "vue";

export default {
  name: "DatePicker",
  setup(props, context) {
    const months = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ];
    const startYear = 2020;
    const numberofYears = 20;
    const dateValue = moment();
    const daysInMonth = ref(dateValue.daysInMonth());
    const month = ref(null);
    const date = ref(null);
    const year = ref(null);
    const updateElements = () => {
      month.value.value = dateValue.month();
      date.value.value = dateValue.date();
      year.value.value = dateValue.format("YYYY");
    };
    const editValue = (unit, ev) => {
      dateValue.set(unit, ev.target.value);
      daysInMonth.value = dateValue.daysInMonth();
      updateElements();
      context.emit("update", dateValue.format('MMMM Do YYYY, h:mm:ss a'));
    };
    onMounted(() => {
      updateElements();
    });
    return {
      months,
      startYear,
      numberofYears,
      daysInMonth,
      editValue,
      year,
      month,
      date
    };
  }
};
</script>

<style>
.select {
  background-color: #eee;
  float: left;
  margin-right: 10px;
  position: relative;
}
</style>