<template>
  <el-dialog
    title="修改用户信息"
    :visible="visible"
    class="eidt-user-info custom-dialog"
    width="600px"
    :append-to-body="true"
    @close="closeDialog"
    @open="callOpen">
    <div class='app-container'>
      <el-form
        ref='informationForm'
        :rules='informationFormRules'
        :model='user'
        label-width='80px'
      >
        <el-form-item label='用户名称'>
          <el-input :disabled='true' v-model='user.userName' />
        </el-form-item>
        <el-form-item label='用户昵称' prop="nickName">
          <el-input v-model='user.nickName' />
        </el-form-item>
        <el-form-item label='手机号码' prop='phonenumber'>
          <el-input v-model='user.phonenumber' />
        </el-form-item>
        <el-form-item label='邮箱' prop='email'>
          <el-input v-model='user.email' />
        </el-form-item>
        <el-form-item label='所属部门'>
          <el-input :disabled='true' v-model='detGroup' />
        </el-form-item>
        <el-form-item label='所属角色' prop='roleGroup'>
          <el-input :disabled='true' v-model='roleGroup' />
        </el-form-item>
        <el-form-item label='性别'>
          <el-radio-group v-model="user.sex">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <div slot='footer' class='dialog-footer'>
        <el-button type='primary' @click='updateInformation()'>保存</el-button>
        <el-button type='info' @click='closeDialog'>取消</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { getUserProfile, updateUserProfile } from '@/api/system/user';

export default {
  nickName: 'ModifyInformation',
  props: {
    visible: {
      default: false,
      type: Boolean
    }
  },
  data() {
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入邮箱'));
      } else {
        const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!reg.test(value)) {
          callback(new Error('请输入有效的邮箱'));
        }
        callback();
      }
    };

    const checkPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号码'));
      } else {
        const reg = /^1[3456789]\d{9}$/;
        if (!reg.test(value)) {
          callback(new Error('请输入有效的手机号'));
        }
        callback();
      }
    };

    return {
      informationFormRules: {
        nickName: [
          { required: true, message: '用户昵称不能为空', trigger: 'blur' }
        ],
        phonenumber: [{ required: true, validator: checkPhone, trigger: 'blur' }],
        email: [{ required: true, validator: checkEmail, trigger: 'blur' }]
      },
      user: {
        userName: null,
        nickName: null,
        phonenumber: null,
        email: null
      },
      detGroup: '',
      postGroup: '',
      roleGroup: '',
      dialogInfoVisible: false
    };
  },

  created() { },
  methods: {
    callOpen() {
      this.getInformation();
      this.$nextTick(() => {
        this.$refs.informationForm.clearValidate()
      })
    },
    getInformation() {
      getUserProfile().then((response) => {
        this.user = response.data
        this.postGroup = response.postGroup
        this.roleGroup = response.roleGroup
        this.detGroup = `${this.user.dept.deptName} / ${this.postGroup}`
      });
    },
    updateInformation() {
      this.$refs.informationForm.validate((valid) => {
        if (valid) {
          updateUserProfile(this.user).then((response) => {
            if (response.code === 200) {
              this.$message.success('修改成功');
              this.closeDialog()
            } else {
              this.$message.error(response.msg);
            }
          });
        }
      });
    },
    closeDialog() {
      this.dialogInfoVisible = false;
      this.$emit('sendDialogClose', this.dialogInfoVisible);
    }
  }
};
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
.dialog-footer {
  text-align: right;
  padding: 0 20px 20px;
}
</style>
