<template>

  <div class="container-article">
    <el-card>
      <div slot="header">
        <!-- 面包屑 -->
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态">
          <el-radio-group v-model="filterData.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
            <el-select @change="changeChannel" v-model="filterData.channel_id" placeholder="请选择" clearable>
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="search()" type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 结果区域 -->
    <el-card style="margin-top:20px">
      <div slot="header">根据筛选条件共查询到{{total}}条结果：</div>
      <el-table :data="articles">
        <el-table-column label="封面">
          <!-- 封面 -->
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:150px;height:100px">
              <div slot="error">
                <img src="../../assets/error.gif" style="width:150px;height:100px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <!-- 状态栏 -->
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <!-- 操作 -->
          <template slot-scope="scope">
            <el-button @click="toEditArticle(scope.row.id)" type="primary" icon="el-icon-edit" circle plain></el-button>
            <el-button @click="delArticle(scope.row.id)" type="danger" icon="el-icon-delete" circle plain></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        @current-change="pager"
        :current-page="filterData.page"
        :page-size="filterData.per_page"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
// import MyBread from '@/components/my-bread'
export default {
  //注意；组件名称不能和原生标签重名
  // components:{MyBread},
  name: "app-article",
  data() {
    return {
      articles: [],
      total: 0,
      filterData: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      channelOptions: [],
      dateArr: []
    };
  },
  created() {
    this.getChannelOptions();
    this.getArticles();
  },
  methods: {
    //删除文章
    delArticle(id){
       this.$confirm('此操作将永久删除该文件, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 删除请求
        try{
          await this.$http.delete(`articles/${id}`)
          this.$message.success('删除成功')
          this.getArticles()
        } catch (e){
          this.$message.error('删除失败')
        }
      
      }).catch(() => {})
    },
    //去编辑文章
    toEditArticle (id){
      this.$router.push(`/publish?id=${id}`)
    },
     // 频道改变后
    changeChannel () {
      if (this.filterData.channel_id === '') {
        this.filterData.channel_id = null
      }
    },
    //筛选事件
    search(){
      this.filterData.page=1
      this.getArticles()
    },
    // 选择日期范围
    changeDate(dateArr) {
      if (dateArr) {
        this.filterData.begin_pubdate = dateArr[0];
        this.filterData.end_pubdate = dateArr[1];
      }else{
        this.filterData.begin_pubdate=null
        this.filterData.end_pubdate=null
      }
    },
    //分页切换
    pager(newPage) {
      //修改参数
      // console.log(newPage);

      this.filterData.page = newPage;
      this.getArticles();
    },
    //获取频道数据
    async getChannelOptions() {
      const res = await this.$http.get("channels");
      // console.log(res);

      this.channelOptions = res.data.data.channels;
    },
    // 获取文章列表
    async getArticles() {
      const res = await this.$http.get("articles", { params: this.filterData });
      // console.log(res);

      this.articles = res.data.data.results;
      // 设置总条数
      this.total = res.data.data.total_count;
    }
  }
};

</script>

<style scoped lang='less'></style>