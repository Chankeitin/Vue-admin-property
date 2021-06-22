<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div class="left_box">
        <img src="https://www.logosc.cn/logomrdata/2018/01/12/ecc52d40-7042-4ecf-bd90-509d6aed7495.png" alt="" />
        <span>{{ headname }} </span>
      </div>
      <div class="right_box">
        <el-tag effect="dark">{{ username }}</el-tag>
        <el-tag effect="dark">权限: {{ userRole }}</el-tag>
        <el-dropdown>
          <img :src="avatarUrl" alt="" />

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="iconfont icon-zhuye"
              >系统首页</el-dropdown-item
            >
            <el-dropdown-item icon="el-icon-ship">交流讨论</el-dropdown-item>
            <el-dropdown-item
              icon="iconfont icon-logindenglu"
              @click.native="logout"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '60px' : '200px'">
        <!-- 展开/收起 -->
        <div class="toggle_box" @click="toggleCollapse">|||</div>
        <el-menu
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          :default-active="activePath"
          :unique-opened="true"
          collapse-transition
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
          <MenuTree :menuList="this.MenuList"></MenuTree>
        </el-menu>
      </el-aside>
      <!-- 右侧主体 -->
      <el-main>
        <!-- 路由视图 -->
        <router-view>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { logoutUser } from '../api/login'
import { getMenuList } from '../api/menu'
import MenuTree from '../components/MenuTree.vue'
export default {
  created() {
    this.getUserRole(),
    this.getMenuList()
  },
  data() {
    return {
      headname: '物业app后台管理系统',
      avatarUrl: '',
      userRole: [],
      username: '',
      isCollapse: false,
      activePath: '',
      MenuList: []
        
    }
  },
  components: {
    MenuTree
  },
  methods: {
    async logout() {
      const { data } = await logoutUser()
      this.$message.success(data.message)
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    getUserRole() {
      this.userRole = window.sessionStorage.getItem('authority')
      this.username = window.sessionStorage.getItem('username')
      this.avatarUrl = window.sessionStorage.getItem('avatar')
      //console.log(this.userRole)
    },
    backToHome() {
      this.$router.push('/home')
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    async getMenuList(){
      const {data} = await getMenuList()
      this.MenuList = data.data.menuList
    }
  }
}
</script>
<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
}
/* 左侧logo样式 */
.left_box {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 50px;
    margin: 5px 10px;
  }
  span {
    margin-left: 10px;
  }
}
/* 头部右侧头像样式 */
.right_box {
  display: flex;
  align-items: center;
  .el-tag {
    margin: 10px 10px;
  }
  /* 下拉菜单样式 */
  .el-dropdown > img {
    width: 50px;
    height:50px;
    margin-left: 10px;
    border-radius: 50%;
    margin-right: 10px;
    background-color: #fff;
  }
}
/* 侧边栏 */
.el-aside {
  background-color: #333744;
  transition: width 0.28s;
  -moz-transition: width 0.28s;
  -webkit-transition: width 0.28s;
  -o-transition: width 0.28s;
  /* 展开/收起 */
  .toggle_box {
    background-color: #51535a;
    font-size: 15px;
    font-weight: blod;
    line-height: 24px;
    color: #fff;
    letter-spacing: 0.2em;
    text-align: center;
    cursor: pointer;
  }
}
/* 内容主题 */
.el-main {
  background-color: #eaedf1;
}
/* 下拉列表样式 */
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-menu:not(.el-menu--collapse) {
  width: 200px; //宽度设置
}
</style>
