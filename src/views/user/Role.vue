<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-form :inline="true">
        <el-form-item>
          <el-button
            type="success"
            icon="el-icon-plus"
            @click="dialogFormVisible = true"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
      <el-table :data="roleList" border style="width: 100%;" max-height="400px">
        <el-table-column prop="roleId" label="ID" width="250">
        </el-table-column>
        <el-table-column prop="roleName" label="权限" width="250">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          width="250"
        ></el-table-column>
        <el-table-column label="操作" width="355" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="updateRole(scope.row.roleId)"
            ></el-button>

            <el-popconfirm
              confirm-button-text="好的"
              cancel-button-text="不用了"
              icon="el-icon-info"
              icon-color="red"
              title="这个权限确定删除吗？"
              @onConfirm="deleteRole()"
            >
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                slot="reference"
              ></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="新增权限" :visible.sync="dialogFormVisible">
        <el-form :model="role">
          <el-form-item label="权限名称">
            <el-input v-model="role.roleName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="role.description" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { findRole } from '../../api/role'
import { findRoleById } from '../../api/role'
export default {
  name: 'Roles',
  data() {
    return {
      roleList: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      role: {
        roleName: '',
        description: ''
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { data } = await findRole()
      if (data.code == 401) {
        this.$router.push('/login')
        return this.$message.error(data.message)
      } else if (data.code != 200) {
        return this.$message.error(data.message)
      }
      this.roleList = data.data.role
      //   console.log(this.roleList)
    },
    deleteRole() {
      this.$message.success('删除成功')
      console.log('删除成功')
    },
    async updateRole(roleId) {
      console.log(roleId)
      this.dialogFormVisible = true
      const { data } = await findRoleById(roleId)
      if (data.code == 401) {
        this.$router.push('/login')
        return this.$message.error(data.message)
      } else if (data.code != 200) {
        return this.$message.error(data.message)
      }
      this.role.roleName = data.data.role.roleName
      this.role.description = data.data.role.description
      console.log(this.role.roleName)
      console.log(this.role.description)
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
