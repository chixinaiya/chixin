<template>
  <div class="my-image">
    <!-- 图片按钮 -->
    <div class="img_btn" @click="openDialog()">
      <img :src="value||imageBtnUrl" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="list">
          <div v-loading="loading">
            <!-- 按钮 -->
            <el-radio-group @change="changeCollect" v-model="reqParams.collect" size="small">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
            <!-- 列表 -->
            <div class="img-list">
              <div
                @click="selectedImage(item.url)"
                :class="{selected:selectedImageUrl===item.url}"
                class="img-item"
                v-for="item in images"
                :key="item.id"
              >
                <img :src="item.url" alt />
              </div>
            </div>
            <!-- 分页 -->
            <el-pagination
              background
              layout="prev, pager, next"
              hide-on-single-page
              :page-size="reqParams.per_page"
              :current-page="reqParams.page"
              :total="total"
              @current-change="pager"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <!-- 上传组件 -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            name="image"
            :headers="uploadHeaders"
            :show-file-list="false"
            :on-success="handleSuccess"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import auth from "@/utils/auth";
import defaultImage from "@/assets/default.png";
export default {
  name: "my-image",
  props: ["value"],
  data() {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      dialogVisible: false,
      activeName: "list",
      // 当前选中的素材图片地址
      selectedImageUrl: null,
      // 上传请求头
      uploadHeaders: {
        Authorization: `Bearer ${auth.getUser().token}`
      },
      // 上传的图片
      uploadImageUrl: null,
      // 图片按钮 图片地址
      imageBtnUrl: defaultImage,
      images: [],
      total: 0,
      loading: false
    };
  },
  methods: {
    //确认图片
    confirmImage() {
      if (this.activeName === "list") {
        if (!this.selectedImageUrl)
          return this.$message.warning("请选中一张素材图片");
        //this.imageBtnUrl=this.selectedImageUrl
        this.$emit("input", this.selectedImageUrl);
      } else {
        if (this.uploadImageUrl)
          return this.$message.warning("请上传一张素材图片");
        //this.imageBtnUrl=this.uploadImageUrl
        this.$emit("input", this.uploadImageUrl);
      }
      //关闭对话框
      this.dialogVisible = false;
    },
    //上传成功
    handleSuccess(res) {
      this.$message.success("上传成功");
      this.uploadImageUrl = res.data.url;
    },
    //选中图片
    selectedImage(url) {
      this.selectedImageUrl = url;
    },
    //图片按钮
    openDialog() {
      this.dialogVisible = true;
      //打开对话框获取素材数据
      this.getImages();
      this.activeName = "list";
      this.selectedImageUrl = null;
      this.uploadImageUrl = null;
    },
    //切换全部与收藏
    changeCollect() {
      this.reqParams.page = 1;
      this.getImages();
    },
    //切换分页
    pager(newPage) {
      this.reqParams.page = newPage;
      this.getImages();
    },
    async getImages() {
      //开始加载
      this.loading = true;
      //请求获取数据
      const res = await this.$http.get("user/images", {
        params: this.reqParams
      });
      //加载完成
      this.loading = false;
      //列表数据
      this.images = res.data.data.results;
      // 总条数
      this.total = res.data.data.total_count;
    }
  }
};
</script>

<style scoped lang='less'>
//  素材列表
.img-list {
  padding-top: 20px;
  .img-item {
    width: 150px;
    height: 120px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 20px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    &.selected::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3) url(../assets/selected.png) no-repeat
        center / 50px auto;
    }
  }
}
.my-image {
  display: inline-block;
  margin-right: 20px;
  .img_btn {
    width: 150px;
    height: 150px;
    border: 1px dashed #ddd;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
</style>