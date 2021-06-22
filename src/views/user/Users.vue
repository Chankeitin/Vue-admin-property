<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-form :inline="true" :model="userVO" class="demo-form-inline">
        <el-form-item label="用户名" label-width="70px">
          <el-input
            v-model="userVO.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限" label-width="70px">
          <el-select v-model="userVO.roleId" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            >
              <span style="float: left">{{ item.roleName }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.description
              }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="昵称" label-width="70px">
          <el-input
            v-model="userVO.nickName"
            placeholder="请输入昵称"
          ></el-input>
        </el-form-item>

        <el-form-item style="margin-left: 10px">
          <el-button icon="el-icon-refresh" @click="resetUserVO"
            >重置</el-button
          >
          <el-button type="primary" icon="el-icon-search" @click="getUserList()"
            >查询</el-button
          >
          <el-button type="success" icon="el-icon-plus" @click="show"
            >添加</el-button
          >
          <el-button type="warning" icon="el-icon-download">导出</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="userList" border style="width: 100%;" max-height="400px">
        <el-table-column prop="username" label="用户名" width="100">
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" width="120">
        </el-table-column>
        <el-table-column prop="auth" label="权限" width="90"></el-table-column>
        <el-table-column prop="avatar" label="头像" width="90">
          <template slot-scope="scope">
            <el-avatar :src="scope.row.avatar"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="ipAddress" label="登陆ip"></el-table-column>
        <el-table-column prop="ipPosition" label="登陆地址"></el-table-column>
        <el-table-column prop="deleted" label="禁用">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.deleted"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="false"
              :inactive-value="true"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column
          prop="lastLoginTime"
          label="上次登陆时间"
        ></el-table-column>
        <el-table-column label="操作" width="180">
          <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
          ></el-button>
          <el-button
            type="warning"
            size="mini"
            icon="el-icon-s-tools"
          ></el-button>
        </el-table-column>
      </el-table>
      <el-pagination
        style="padding-top: 15px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[6, 10, 20, 30]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <UserAdd
        :addOrUpdateVisible="addOrUpdateVisible"
        :roleList="roleList"
        @changeShow="showAddOrUpdate"
        ref="addOrUpdateRef"
      ></UserAdd>
    </el-card>
  </div>
</template>

<script>
import { findUserList } from '../../api/user'
import { findRole } from '../../api/role'

import UserAdd from './UserAdd'

export default {
  name: 'Users',
  data() {
    return {
      userVO: {
        username: '',
        nickname: '',
        roleId: ''
      },
      // 控制新增编辑弹窗的显示与隐藏
      addOrUpdateVisible: false,
      userList: [],
      //每页的条数
      size: 6,
      //总条数
      total: 100,
      roleList: [],
      current: 1
    }
  },
  created() {
    this.getUserList()
    this.getRoleList()
  },
  components: {
    UserAdd
  },
  methods: {
    handleSizeChange(val) {
      this.size = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      this.current = val
      this.getUserList()
    },
    async getUserList() {
      const { data } = await findUserList(this.current, this.size, this.userVO)
      if (data.code == 401) {
        this.$router.push('/login')
        return this.$message.error(data.message)
      } else if (data.code != 200) {
        return this.$message.error(data.message)
      }
      this.userList = data.data.records
      this.total = data.data.total
      console.log(data.data)
      console.log(data.data.records)
    },
    async getRoleList() {
      const { data } = await findRole()
      if (data.code == 401) {
        this.$router.push('/login')
        return this.$message.error(data.message)
      } else if (data.code != 200) {
        return this.$message.error(data.message)
      }
      this.roleList = data.data.role
    },
    resetUserVO() {
      this.userVO.username = ''
      this.userVO.nickname = ''
      this.userVO.roleId = ''
      this.getUserList()
    },
    // 按钮点击事件 显示新增编辑弹窗组件
    show() {
      this.addOrUpdateVisible = true
    },
    // 监听 子组件弹窗关闭后触发，有子组件调用
    showAddOrUpdate(data) {
      if (data === 'false') {
        this.addOrUpdateVisible = false
      } else {
        this.addOrUpdateVisible = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  padding-left: 10px;
  padding-bottom: 10px;
  font-size: 12px;
}
</style>
