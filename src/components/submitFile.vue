<template>
  <div>
    <el-upload
      @submit="submitFiles"
      class="upload-demo"
      drag
      action=""
      multiple
    >
      <i class="el-icon-upload"></i>
    </el-upload>

    <div
      class="el-upload el-upload--text"
      @drop.prevent
      @drop="handleDropFiles"
      @click="handleClickFiles"
    >
      <div class="el-upload-dragger">
        <i class="el-icon-upload"></i>
      </div>
      <input
        ref="fileUpload"
        @change="progressFiles"
        type="file"
        name="files"
        multiple="multiple"
        class="el-upload__input"
        webkitdirectory
      />
    </div>
  </div>
</template>

<script>
import { uploadFile } from "../request/request";
export default {
  methods: {
    handleDropFiles(event) {
      event.preventDefault();
      console.log(event);
      const files = event.dataTransfer.files;
    },
    handleClickFiles() {
      console.log("demo", this.$refs.fileUpload);
      this.$refs.fileUpload.click();
    },
    submitFiles(data) {
      console.log(data);
    },
    async progressFiles(event) {
      // console.log(event);
      let files = event.target.files;
      let formData = new FormData();
      await this.traverseFiles(files, formData);
      // console.log(formData);
      uploadFile(formData);
    },
    async traverseFiles(files, formData, path = "") {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.isDirectory) {
          const directoryReader = file.createReader();
          const entries = await this.readDirectoryEntries(directoryReader);
          await this.traverseFiles(entries, formData, path + file.name + "/");
        } else {
          formData.append("files", file, path + file.name);
        }
      }
    },
    async readDirectoryEntries(directoryReader) {
      return new Promise((resolve, reject) => {
        directoryReader.readEntries(
          (entries) => {
            resolve(entries);
          },
          (error) => {
            reject(error);
          }
        );
      });
    },
  },
};
</script>

<style scoped>
.is-dragover {
  background-color: rgba(32, 159, 255, 0.06);
  border: 2px dashed #409eff;
}
.el-upload {
  display: inline-block;
  text-align: center;
  cursor: pointer;
  outline: 0;
}
.el-upload__input {
  display: none;
}
.el-upload-dragger {
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  box-sizing: border-box;
  width: 360px;
  height: 180px;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
input[type="file" i] {
  appearance: none;
  background-color: initial;
  cursor: default;
  align-items: baseline;
  color: inherit;
  text-overflow: ellipsis;
  white-space-collapse: preserve;
  text-wrap: nowrap;
  text-align: start !important;
  padding: initial;
  border: initial;
  overflow: hidden !important;
}
input:not([type="range"]):not([type="color"]) {
  writing-mode: horizontal-tb !important;
}
</style>