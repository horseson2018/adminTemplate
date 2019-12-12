<template>
<el-dialog
  title="修改密码"
  :visible="visible"
  class="edit-password custom-dialog"
  width="600px"
  @close="sendDialogPassword"
  @open="callOpen"
  :append-to-body="true">
    <div class='app-container'>
      <el-form
        ref='changePasswordForm'
        :rules='changePasswordFormRules'
        :model='temp'
        label-width='80px'
      >
        <input type='password' name='password' style='position: absolute;left: -10000px;' />
        <el-form-item label='原密码' prop='oldPassword'>
          <el-input v-model='temp.oldPassword' type='password' autocomplete='off' />
        </el-form-item>
        <el-form-item label='新密码' prop='newPassword'>
          <el-input v-model='temp.newPassword' type='password' autocomplete='off' />
        </el-form-item>
        <el-form-item label='再次输入' prop='passwordRepeat'>
          <el-input v-model='temp.passwordRepeat' type='password' autocomplete='off' />
        </el-form-item>
      </el-form>
      <div slot='footer' class='dialog-footer'>
        <el-button type='primary' @click='changePassword()'>保存</el-button>
        <el-button type='info' @click='sendDialogPassword'>取消</el-button>
      </div>
    </div>
  </el-dialog >
</template>

<script>
import { updateUserPwd } from '@/api/system/user';
import { validPassword } from '@/utils/validate';

export default {
  name: 'ModifyPassword',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const checkOldPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入原密码'));
      } else {
        callback();
      }
    };

    const checkNewPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入新密码'));
      } else {
        if (this.temp.passwordRepeat !== '') {
          if (!validPassword(value)) {
            callback(new Error('密码至少8位，要求必须大小写字母、数字！'));
          } else {
            this.$refs.changePasswordForm.validateField('passwordRepeat');
          }
          if (value === this.temp.oldPassword) {
            callback(new Error('新密码与原密码不能相同'));
          }
        }
        callback();
      }
    };
    const checkPasswordRepeat = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入确认密码'));
      } else if (value !== this.temp.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      changePasswordFormRules: {
        oldPassword: [{ validator: checkOldPassword, trigger: 'blur' }],
        newPassword: [{ validator: checkNewPassword, trigger: 'blur' }],
        passwordRepeat: [{ validator: checkPasswordRepeat, trigger: 'blur' }]
      },
      temp: {
        oldPassword: null,
        newPassword: null,
        passwordRepeat: null,
      },
      dialogPasswordVisible: false,
      oldReadonly: true,
      newReadonly: true,
      repetReadonly: true
    };
  },

  created() {},

  methods: {
    callOpen() {
      this.$nextTick(() => {
        this.$refs.changePasswordForm.clearValidate()
      })
    },
    resetTemp() {
      this.temp.oldPassword = null;
      this.temp.newPassword = null;
      this.temp.passwordRepeat = null;
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        window.location.reload();
      });
    },
    changePassword() {
      this.$refs.changePasswordForm.validate((valid) => {
        if (valid) {
          updateUserPwd(this.temp.oldPassword, this.temp.newPassword).then(
            (response) => {
              if (response.code === 200) {
                this.$message.success('修改成功');
                this.sendDialogPassword()
              } else {
                this.$message.error(response.msg);
              }
            }
          );
        }
      });
    },
    sendDialogPassword() {
      this.dialogPasswordVisible = false;
      this.$emit('sendDialogPassword', this.dialogPasswordVisible);
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
