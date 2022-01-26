<template>
  <div id="app">
    <ConfigProvider>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </ConfigProvider>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
}
</style>
