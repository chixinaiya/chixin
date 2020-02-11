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
          <el-select v-model="filterData.channel_id" placeholder="请选择">
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
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 结果区域 -->
    <el-card style="margin-top:20px">
      <div slot="header">根据筛选条件共查询到 0 条结果：</div>
      <el-table :data="articles">
        <el-table-column label="封面"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态"></el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
      <el-pagination style="margin-top:20px" background layout="prev, pager, next" :total="1000"></el-pagination>
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
      filterData: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page:1,
        per_page:20
      },
      channelOptions: [],
      dateArr: []
    };
  },
  created() {
    this.getChannelOptions();
    this.getArticles()
  },
  methods: {
    //获取频道数据
    async getChannelOptions() {
      const res = await this.$http.get('channels');
      // console.log(res);

      this.channelOptions=res.data.data.channels
    },
    // 获取文章列表
    async getArticles (){
      const res = await this.$http.get('articles',{params:'this.filterData'})
      console.log(res);
      
      this.articles=res.data.data.results

    }
  }
};
</script>

<style scoped lang='less'></style>