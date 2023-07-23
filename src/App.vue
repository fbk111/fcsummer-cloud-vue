<template>
  <div id="app">
    <el-container>
      <el-header>1111111111</el-header>
      <el-main>
        <submitFile />
      </el-main>
      <el-footer></el-footer>
      <el-aside>11111111111111</el-aside>
    </el-container>
  </div>
</template>

<script>
import submitFile from "./components/submitFile.vue";
export default {
  name: "App",
  components: {
    submitFile,
  },
};
</script>

<style scoped>
</style>
