<template>
  <el-container class="container-home">
    <el-aside class="my-aside" :width="isOpen?'200px':'64px'">
      <!-- logo区域 -->
      <div class="logo" :class="{minLogo:!isOpen}"></div>
      <!-- 导航菜单 -->
      <el-menu
        :default-active="$route.path"
        background-color="#002233"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right:none"
        :collapse="!isOpen"
        :collapse-transition="false"
        router
      >
       <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">內容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="my-header">
        <span @click="toggleMenu" class="icon el-icon-s-fold"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <!-- 右边下拉菜单 -->
        <el-dropdown class="my-dropdown" @command="handleClick"> 
          <span class="el-dropdown-link">
            <img class="head" :src="photo" alt />
            <strong class="name">{{name}}</strong>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <!-- 二级路由显示位置 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import auth from '@/utils/auth'
export default {
  name: "app-home",
  data () {
    return {
      isOpen:true,
      name:'',
      photo:''

    }
  },
  created () {
    const user=auth.getUser()
    this.name=user.name
    this.photo=user.photo
  },
  methods:{
    toggleMenu () {
      this.isOpen=!this.isOpen
    },
     handleClick (command){
    if(command==='setting'){
      this.$router.push('/setting')
    }

    if(command==='logout'){
      auth.delUser()
      this.$router.push('/login')
    }
  }
  }
 
};
</script>

<style lang="less">
.container-home {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .my-aside {
    background-color: #002233;
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url(../../assets/logo_admin.png) no-repeat center /
        140px auto;
    }
    .minLogo{
      background-image: url(../../assets/logo_admin_01.png);
      background-size: 36px auto;
    }
  }
  .my-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .icon {
      font-size: 24px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
      padding-left: 10px;
    }
    .my-dropdown {
      float: right;
      .head {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
      .name {
        padding-left: 5px;
        vertical-align: middle;
      }
    }
  }
}
</style>