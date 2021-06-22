<template>
  <div>
    <el-dialog
      v-bind="$attrs"
      v-on="$listeners"
      :visible.sync="showDialog"
      @open="onOpen"
      @close="onClose"
      title="添加用户"
    >
      <el-row :gutter="15">
        <el-form
          ref="elForm"
          :model="formData"
          :rules="rules"
          size="medium"
          label-width="80px"
        >
          <el-col :span="24">
            <!-- 用户头像 -->
            <el-form-item label="用户头像">
              <!-- 头衔缩略图 -->
              <pan-thumb :image="image" />
              <!-- 文件上传按钮 -->
              <el-button
                type="primary"
                icon="el-icon-upload"
                @click="imagecropperShow = true"
                >更换头像
              </el-button>

              <!--
                v-show：是否显示上传组件
                :key：类似于id，如果一个页面多个图片上传控件，可以做区分
                :url：后台上传的url地址
                @close：关闭上传组件
                @crop-upload-success：上传成功后的回调 -->
              <image-cropper
                v-show="imagecropperShow"
                :width="300"
                :height="300"
                :key="imagecropperKey"
                :url="'/ossservice/upload/uploadImgFile'"
                field="file"
                @close="closeImage"
                @crop-upload-success="cropSuccess"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户名" prop="username">
              <el-input
                v-model="formData.username"
                placeholder="请输入用户名"
                clearable
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
              <el-input
                v-model="formData.nickname"
                placeholder="请输入昵称"
                clearable
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="权限" prop="authId">
              <el-select
                v-model="formData.authId"
                placeholder="请选择权限"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in roleList"
                  :key="index"
                  :label="item.roleName"
                  :value="item.roleId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="formData.password"
                placeholder="请输入密码"
                clearable
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ImageCropper from '../../components/ImageCropper'
import PanThumb from '../../components/PanThumb'

export default {
  name: 'UserAdd',
  components: { ImageCropper, PanThumb },
  // 接受父组件传递的值
  props: {
    addOrUpdateVisible: {
      type: Boolean,
      default: false
    },
    roleList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      formData: {
        field101: null,
        username: undefined,
        authId: undefined,
        nickname: undefined,
        password: undefined
      },
      // 控制弹出框显示隐藏
      showDialog: false,
      imagecropperShow: false, // 是否显示上传组件
      imagecropperKey: 0, // 上传组件id
      image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191',
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        authId: [
          {
            required: true,
            message: '请选择权限',
            trigger: 'change'
          }
        ],
        nickname: [
          {
            required: true,
            message: '请输入昵称',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      },
      field101Action: 'https://jsonplaceholder.typicode.com/posts/',
      field101fileList: []
    }
  },
  computed: {},
  watch: {
    // 监听 addOrUpdateVisible 改变
    addOrUpdateVisible(oldVal, newVal) {
      this.showDialog = this.addOrUpdateVisible
    }
  },
  created() {},
  mounted() {},
  methods: {
    onOpen() {},
    onClose() {
      this.$refs['elForm'].resetFields()
      this.$emit('changeShow', 'false')
    },
    close() {
      this.$emit('changeShow', 'false')
    },
    handelConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        console.log(this.formData)
      })
    },
    field101BeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 2
      if (!isRightSize) {
        this.$message.error('文件大小超过 2MB')
      }
      let isAccept = new RegExp('image/*').test(file.type)
      if (!isAccept) {
        this.$message.error('应该选择image/*类型的文件')
      }
      return isRightSize && isAccept
    },
    // 上传成功后的回调函数
    cropSuccess(data) {
      console.log(data)
      this.imagecropperShow = false
      this.image = data.url
      // 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1
    },

    // 关闭上传组件
    closeImage() {
      this.imagecropperShow = false
      // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1
    }
  }
}
</script>
<style>
.el-upload__tip {
  line-height: 1.2;
}
</style>
