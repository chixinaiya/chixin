<template>
  <div class="container-image">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 按钮 -->
      <div class="btn-box">
        <!-- collect 值为true收藏的图片  false全部的图片 -->
        <!-- :label 指定值才是布尔类型  -->
        <el-radio-group @change="changeCollect()" v-model="reqParams.collect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button @click="openDialog()" style="float:right" type="success" size="small">添加素材</el-button>
      </div>
      <!-- 列表 -->
      <div class="img-list">
        <div class="img-item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="option">
            <span
              @click="toggleStatus(item)"
              class="el-icon-star-off"
              :class="{red:item.is_collected}"
            ></span>
            <span @click="delImage(item.id)" class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        :total="total"
        @current-change="pager"
      ></el-pagination>
      <!-- 对话框 -->
      <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          name="image"
          :headers="uploadHeaders"
          :show-file-list="false"
          :on-success="handleSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import auth from '@/utils/auth'
export default {
  name: "app-image",
  data() {
    return {
      //控制对话框显示隐藏
      dialogVisible: false,
      //查询条件
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      //素材列表
      images: [],
      total: 0,
      // 预览图片地址
      imageUrl: null,
      uploadHeaders:{
        Authorization:`Bearer ${auth.getUser().token}`
      }
    };
  },
  created() {
    this.getImages();
  },
  methods: {
    // 上传成功
    handleSuccess (res) {
      //提示 预览
      this.$message.success('上传成功')
      this.imageUrl=res.data.url
      //关闭对话框 渲染页面
      window.setTimeout(()=>{
        this.dialogVisible=false
        this.getImages()
      },3000)
    },
    //打开对话框
    openDialog() {
      // 打开对话框
      this.dialogVisible = true;
      //清空预览图
      this.imageUrl=null
    },
    //删除函数
    delImage(id) {
      // 确认框
      this.$confirm("亲，您是否要删除该图片素材?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // 删除请求
          try {
            await this.$http.delete(`/user/images/${id}`);
            this.$message.success("删除成功");
            this.getImages();
          } catch (e) {
            this.$message.error("删除失败");
          }
        })
        .catch(() => {});
    },
    //切换添加收藏与取消收藏
    async toggleStatus(item) {
      try {
        const res = await this.$http.put(`/user/images/${item.id}`, {
          collect: !item.is_collected
        });
        this.$message.success(
          res.data.data.collect ? "添加收藏成功" : "取消收藏成功"
        );
        item.is_collected = res.data.data.collect;
      } catch (e) {
        this.$message.error("操作失败");
      }
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
      const res = await this.$http.get("user/images", {
        params: this.reqParams
      });
      this.images = res.data.data.results;
      this.total = res.data.data.total_count;
    }
  }
};
</script>

<style scoped lang='less'>
.img-list {
  margin-bottom: 15px;
  .img-item {
    width: 160px;
    height: 160px;
    border: 1px dashed #ddd;
    position: relative;
    margin-top: 20px;
    display: inline-block;
    margin-right: 30px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .option {
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    left: 0;
    bottom: 0;
    text-align: center;
    span {
      color: #fff;
      margin: 0 30px;
    }
    .red {
      color: red;
    }
  }
}
</style>