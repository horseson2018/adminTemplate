<template>
  <div class="navbar">
    <div class="left-menu">
      <div class="company-name-logo"></div>
    </div>
    <div class="right-menu">
      <div class="center-menu">
        <router-link title="" :to="{ path: '/infoManage/infoAudit'}" @click.native="affirmRemind">
          <el-badge :value="msgLen" :hidden="msgLen>0?false:true">
            <IconSvg
              :el="false"
              :icon="'gaojingbobao'"
              :class="{'light':msgLen>0}"
              style="font-size: 18px;"/>
          </el-badge>
        </router-link>
      </div>
      <el-dropdown
        trigger="click"
        @command="handleCommand"
      >
        <span class="el-dropdown-link">
          {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="0">用户信息</el-dropdown-item>
          <el-dropdown-item command="1">修改密码</el-dropdown-item>
          <el-dropdown-item command="2">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 修改修改用户信息 -->
    <editUserInfo :visible.sync="dialogInfoVisible" @sendDialogClose="sendDialogClose" />
    <!-- 修改密码 -->
    <editUserPassword
      :visible.sync="dialogPasswordVisible"
      @sendDialogPassword="sendDialogPassword"/>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import editUserInfo from '../../user/modifyInformation'
import editUserPassword from '../../user/modifyPassword'
import IconSvg from './icon'
import { getNotices, updateStatus } from '@/api/infoManage/infoList'

export default {
  components: {
    editUserInfo,
    editUserPassword,
    IconSvg
  },
  data() {
    return {
      dialogInfoVisible: false,
      dialogPasswordVisible: false,
      msgLen: 0,
      msgList: []
    }
  },
  computed: {
    ...mapGetters([
      'userName',
    ])
  },
  mounted() {
    setInterval(() => this.getReminds(), 60000)
    this.getReminds()
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    handleCommand(command) {
      if (command === '2') {
        this.logout();
      } else if (command === '0') {
        this.dialogInfoVisible = true
      } else {
        this.dialogPasswordVisible = true
      }
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        window.location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    sendDialogClose(payload) {
      this.dialogInfoVisible = payload
    },
    sendDialogPassword(payload) {
      this.dialogPasswordVisible = payload
    },
    getReminds() {
      this.msgList = []
      getNotices().then((res) => {
        this.msgLen = res.data.length
        const list = res.data
        list.forEach((value) => {
          this.msgList.push(value.id)
        });
      })
    },
    affirmRemind() {
      if (this.msgList.length > 0) {
        updateStatus(this.msgList.join()).then(() => {})
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.navbar {
  overflow: hidden;
  position: fixed;
  z-index: 1002;
  width: 100%;
  height: 70px;
  background: linear-gradient(to right, #22426c , #206c8e 40%, #15477c);;
  top: 0;
  display: flex;
  justify-content: space-between;
  .left-menu {
    height: 100%;
  }
  .center-menu{
    height: 100%;
    display: inline-block;
    margin-right: 50px;
    position: relative;
    .el-badge__content{
      border:0 !important;
    }
    .el-badge__content.is-fixed{
      top: 25px !important;
    }
    .iconfont {
      color: #777;
      &.light {
        color: #f19968;
      }
    }
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .company-name-logo{
    margin-left: 20px;
    height: 100%;
    width: 283px;
    background: url(./../../../images/logo.png) no-repeat left center;
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    height: 100%;
    line-height: 72px;
    margin-right:20px;
    color:#fff;
    width: 40%;
    text-align: right;
    .el-dropdown{
      display: inline-block;
    }
    .el-dropdown,.el-dropdown-link{
      color:#fff !important;
    }
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }
  }
}
</style>
