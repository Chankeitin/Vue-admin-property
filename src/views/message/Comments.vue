<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>消息管理</el-breadcrumb-item>
      <el-breadcrumb-item>评论管理</el-breadcrumb-item>
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
      <el-table
        :data="CommentList"
        border
        style="width: 100%;"
        max-height="600px"
      >
        <el-table-column prop="commentId" label="ID" width="50" align="center">
        </el-table-column>
        <el-table-column
          prop="username"
          label="发布者"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="avatar" label="头像" width="120" align="center">
          <template slot-scope="scope">
            <el-avatar :src="scope.row.avatar"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column
          prop="comments"
          label="评论内容"
          width="295"
        ></el-table-column>
        <el-table-column prop="tagName" label="标签" width="100" align="center">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.tagName }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="commentAddress"
          label="地址"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag type="warning">{{
              scope.row.commentAddress ? '附近' : '本小区'
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="170"
          align="center"
        >
        </el-table-column>

        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="updateRole(scope.row.commentId)"
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

      <el-dialog title="新增帖子" :visible.sync="dialogFormVisible">
        <el-form :model="role">
          <el-form-item label="帖子名称">
            <el-input v-model="role.roleName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="标签">
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
import { getCommentList } from '../../api/comments'

export default {
  name: 'Roles',
  data() {
    return {
      CommentList: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      role: {
        roleName: '',
        description: ''
      }
    }
  },
  created() {
    this.getComment()
  },
  methods: {
    async getComment() {
      const { data } = await getCommentList()
      console.log(data)
      if (data.code == 401) {
        this.$router.push('/login')
        return this.$message.error(data.message)
      } else if (data.code != 200) {
        return this.$message.error(data.message)
      }
      this.CommentList = data.data.CommentList
      console.log(data.data.CommentList)
    },
    deleteRole() {
      this.$message.success('删除成功')
      console.log('删除成功')
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
