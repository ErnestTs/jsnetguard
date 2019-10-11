<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  list-style: none;
}
html {
    background: #fff;
}
html,body,#app{
  height: 100%;
}
</style>
