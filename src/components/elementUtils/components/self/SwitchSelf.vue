<template>
  <div class="customInputWrapper">
    <input v-bind="$attrs"
      class="switch-btn switch-btn-animbg"
      type="checkbox"
      :checked="checked">
  </div>
</template>

<script>
export default {
  props: {
    bollColor: {
      type: String,
      default: '#1F1F1F'
    },
    checked: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.switch-btn {
  cursor: pointer;
  width: 38px;
  height: 12px;
  position: relative;
  /*border: 1px solid RGBA(113, 96, 82, 1);*/
  /*background-color: RGBA(63, 62, 62, 1);*/
  /*----- 选中前条颜色 -------*/
  background-color: RGBA(234, 236, 240, 1);
  /*box-shadow: RGBA(63, 62, 62, 1) 0 0 0 0 inset;*/
  border-radius: 15px;
  background-clip: content-box;
  display: inline-block;
  -webkit-appearance: none;
  user-select: none;
  outline: none;
}

.switch-btn:focus {
  outline: none;
}

/*小球*/
.switch-btn:before {
  content: '';
  width: 15px;
  height: 15px;
  position: absolute;
  top: -4.6px;
  left: -2px;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
  /*----------- 选中前小球颜色 -----------*/
  /*background-color: RGBA(100, 100, 100, 1);*/
  background-color: #FFFFFF;
  /*box-shadow: 0 -5px 10px #ccc;*/
  border: 2px solid RGBA(31, 31, 31, 1);
}

/*选中后*/
.switch-btn:checked {
  /*border-color: RGBA(113, 96, 82, 1);*/
  /*background-color: #FFFFFF;*/
  /*border-color: RGBA(122, 201, 27, 1);*/
  /*box-shadow: RGBA(113, 96, 82, 1) 0 0 0 16px inset;*/
  /*border: 2px solid RGBA(31, 31, 31, 1);*/
  background-color: RGBA(234, 236, 240, 1);
}

/*选中后小球颜色*/
.switch-btn:checked:before {
  left: 20px;
  /*background-color: RGBA(189, 162, 141, 1);*/
  background-color: #FFFFFF;
  /*box-shadow: 0 -5px 10px #ccc;*/
  border: 2px solid RGBA(31, 31, 31, 1);
}

.switch-btn.switch-btn-animbg {
  transition: background-color ease .4s;
}

.switch-btn.switch-btn-animbg:before {
  transition: left .3s;
}

.switch-btn.switch-btn-animbg:checked {
  box-shadow: RGBA(113, 96, 82, 1) 0 0 0 0 inset;
  /*background-color: RGBA(113, 96, 82, 1);*/
  background-color: RGBA(122, 201, 27, 1);
  transition: border-color .4s, background-color ease .4s;
}

.switch-btn.switch-btn-animbg:checked:before {
  transition: left .3s;
}

.customInputWrapper {
  display: flex;
  align-items: center;
}
</style>
