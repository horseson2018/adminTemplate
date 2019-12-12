<template>
  <div class='login'>
    <!-- <img src="./../../images/login.png" alt=""> -->
    <el-form ref='loginForm' :model='loginForm' :rules='loginRules' class='login-form'>
      <h3 class='title'>新华快讯后台管理系统</h3>
      <el-form-item prop='username'>
        <el-input v-model='loginForm.username' type='text' auto-complete='off' placeholder='请输入账号'>
        </el-input>
      </el-form-item>
      <el-form-item prop='password'>
        <el-input
          v-model='loginForm.password'
          type='password'
          auto-complete='off'
          placeholder='请输入密码'
          @keyup.enter.native='handleLogin'
        >
        </el-input>
      </el-form-item>
      <el-form-item prop='phone'>
        <el-input v-model='loginForm.phone' type='text' auto-complete='off' placeholder='请输入手机号'>
        </el-input>
      </el-form-item>
      <el-form-item prop='code'>
        <el-input
          v-model='loginForm.code'
          auto-complete='off'
          placeholder='验证码'
          style='width: 63%'
          @keyup.enter.native='handleLogin'
        >
        </el-input>
        <div class='login-code'>
          <el-button
            type='primary'
            :disabled="!this.canClick"
            @click='getCode'>{{codeText}}</el-button>
        </div>
      </el-form-item>
      <el-form-item style='width:100%;'>
        <el-button
          :loading='loading'
          size='medium'
          type='primary'
          style='width:100%;'
          @click.native.prevent='handleLogin'
        >
          <span v-if='!loading'>登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class='el-login-footer'>
      <span>Copyright © 2019-2020 XHKX Rights Reserved.</span>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import { login, getCodeImg } from '@/api/login';
import { decrypt } from '@/utils/jsencrypt';
import { setToken } from '@/utils/auth'
import { validPhoneNum } from '@/utils/validate'
// let self

export default {
  name: 'Login',
  data() {
    const checkUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('账号不能为空'));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('密码不能为空'));
      }
      return callback()
    };
    const validatePhone = (rule, value, callback) => {
      if ((value !== '') && (!validPhoneNum(value))) {
        callback(new Error('手机号不规范'));
      } else {
        callback()
      }
    };
    const checkVerification = (rule, value, callback) => {
      if (!value) {
        callback(new Error('验证码不能为空'));
      } else {
        callback();
      }
    };
    return {
      codeText: '获取验证码',
      canClick: true,
      sixtensec: 60,
      cookiePassword: '',
      loginForm: {
        username: 'admin',
        password: 'admin123',
        phone: '',
        code: '11',
        uuid: ''
      },
      loginRules: {
        username: [
          {
            required: true, validator: checkUsername, trigger: 'blur'
          }
        ],
        password: [
          {
            required: true, validator: validatePassword, trigger: 'blur'
          }
        ],
        phone: [
          {
            required: false, validator: validatePhone, trigger: 'none'
          }
        ],
        code: [
          {
            required: true, validator: checkVerification, trigger: 'change'
          }
        ]
      },
      loading: false,
      redirect: undefined
    };
  },
  methods: {
    getCode() {
      const param = {
        user: this.loginForm.username,
        pass: this.loginForm.password,
        phone: this.loginForm.phone
      }
      getCodeImg(param).then((res) => {
        if (this.loginForm.username.trim() === '') {
          this.$message.error('账号不能为空！')
          return
        }
        if (this.loginForm.password.trim() === '') {
          this.$message.error('密码不能为空！')
          return
        }
        this.loginForm.uuid = res.uuid
        this.canClick = false
        this.sixtensec = 60
        this.codeText = `${this.sixtensec}s后重发`
        const clock = window.setInterval(() => {
          this.sixtensec -= 1
          this.codeText = `${this.sixtensec}s后重发`
          if (this.sixtensec <= 0) {
            this.codeText = '获取验证码'
            this.sixtensec = 60
            this.canClick = true
            window.clearInterval(clock);
          }
        }, 1000)
      })
    },
    getCookie() {
      const username = Cookies.get('username');
      const password = Cookies.get('password');
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          login(this.loginForm).then((res) => {
            setToken(res.token)
            this.$router.push({ path: '/' });
          }).catch(() => {
            this.loading = false
          })
        }
      });
    }
  }
};
</script>

<style rel='stylesheet/scss' lang='scss'>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url('./../../images/login.png');
  background-size: 100% 100%;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
  font-size: 18px;
  font-weight: 700;
}

.login-form {
  border-radius: 6px;
  background: #fff;
  width: 400px;
  padding: 25px;
  margin-left: 50%;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
</style>
