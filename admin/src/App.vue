<template>
  <keep-alive>
    <router-view/>
  </keep-alive>
</template>

<script>

export default {
  name: "app",
};
</script>

<style>
  html,body{
    padding: 0;
    margin: 0;
  }
  a{
    text-decoration: none;
  }
</style>
