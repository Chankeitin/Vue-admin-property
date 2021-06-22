<template>
  <div>
    <template v-for="item in this.menuList">
      <el-submenu
        v-if="item.childMenus!=null"
        :disabled="item.disabled"
        :index="item.id + ''"
        :key="item.id + ''"
      >
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.menuName }}</span>
        </template>
        <menu-tree :menuList="item.childMenus"></menu-tree>
      </el-submenu>
      <el-menu-item v-else
          :disabled="item.disabled"
          :index="item.url + ''"
          :route="item.url + ''"
          :key="item.id + ''"
          @click="savePath(item.url)"
        >
        
          <i :class="item.icon"></i>
          <span>{{ item.menuName }}</span>
        </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: 'MenuTree',
  props: ['menuList'],
  methods: {
    //保存激活路径
    savePath(path){
      window.sessionStorage.setItem('activePath',path);
      // 调用home.vue的activePath
      this.activePath = path;
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu--collapse span,
.el-menu--collapse .el-submenu__icon-arrow{
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}

</style>
