<template>
  <div class="info-form">
    <el-form :model="ruleForm"
      ref="ruleForm"
      style="margin-bottom: 10px;">
      <el-row :gutter="20" class="hide-useless-requiedIcon">
        <el-col :span="3">
          <el-select v-model="ruleForm.infoCode" placeholder="信息代码">
            <el-option
              v-for="item in options"
              :key="item.messageCode"
              :label="item.messageCode +'\xa0\xa0\xa0' + item.messageName"
              :value="item.messageCode">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select v-model="ruleForm.infoStatus" placeholder="信息状态">
            <el-option
              v-for="item in statuslist"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-date-picker
            v-model="ruleForm.date1"
            type="date"
            placeholder="选择日期"
            :picker-options="datePickerStart"
            @change="changePickerEnd">
          </el-date-picker>
        </el-col>
        <el-col :span="3">
          <el-time-picker
            v-model="ruleForm.time1"
            format="HH:mm"
            placeholder="任意时间点"
            :picker-options="timePickerStart"
            @focus="afternowHM"
            @change="changeEndTimeRange">
          </el-time-picker>
        </el-col>
        <div class="fl mt10">
        ~
        </div>
        <el-col :span="3">
          <el-date-picker
            v-model="ruleForm.date2"
            type="date"
            placeholder="选择日期"
            :picker-options="datePickerEnd">
          </el-date-picker>
        </el-col>
        <el-col :span="3">
          <el-time-picker
            v-model="ruleForm.time2"
            format="HH:mm"
            placeholder="任意时间点"
            @focus="handleEndTime"
            :picker-options="timePickerEnd">
          </el-time-picker>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" size="small"
            @click="submitForm('ruleForm')"
            icon="el-icon-search">
            查询
          </el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      v-loading="toploading"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%;">
      <el-table-column
        prop="id"
        label="序号"
        min-width="10%">
      </el-table-column>
      <el-table-column
        prop="messageCode"
        label="信息代码"
        min-width="10%">
      </el-table-column>
      <el-table-column
        prop="content"
        label="信息内容"
        min-width="35%">
      </el-table-column>
      <el-table-column
        prop="beginsTime"
        label="开始时间"
        min-width="10%">
        <template slot-scope="scope">
          <div v-html="timeFilter(scope.row.beginsTime)"></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="engTime"
        label="结束时间"
        min-width="10%">
        <template slot-scope="scope">
          <div v-html="timeFilter(scope.row.engTime)"></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        min-width="10%">
        <template slot-scope="scope">
          <div v-html="statusFilter(scope.row.status)"></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="areas"
        label="地区"
        min-width="15%">
      </el-table-column>
    </el-table>
    <div style="overflow: hidden">
      <pagination style="float: right;margin-top: 10px;"
        v-show='total>0'
        :total='total'
        :page.sync='currentPage'
        limit.sync='5'
        @pagination='getList'/>
    </div>
    <div class="info-detail">
      <div class="step step-first">
        <div class="step-title">
          <span>1</span>初审信息列表
        </div>
        <div v-show="step == 1" class="step-content" v-loading="loading">
          <el-table
            v-show="step == 1"
            :data="detailData"
            style="width: 100%">
            <el-table-column
              prop="messageCode"
              label="信息代码"
              min-width="10%">
            </el-table-column>
            <el-table-column
              prop="content"
              label="信息内容"
              min-width="40%">
            </el-table-column>
            <el-table-column
              prop="beginsTime"
              label="开始时间"
              min-width="10%">
              <template slot-scope="scope">
                <div v-html="timeFilter(scope.row.beginsTime)"></div>
              </template>
            </el-table-column>
            <el-table-column
              prop="engTime"
              label="结束时间"
              min-width="10%">
              <template slot-scope="scope">
                <div v-html="timeFilter(scope.row.engTime)"></div>
              </template>
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              min-width="10%">
              <template slot-scope="scope">
                <div v-html="statusFilter(scope.row.status)"></div>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              min-width="15%">
              <template slot-scope="scope">
                <el-button @click="openAuditDia(1, scope.row)" type="text" size="small">
                  提交终审
                </el-button>
                <el-button @click="rejectAudit(scope.row)" type="text" size="small">驳回</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="step-table">
              <div class="step-table-content">
                <div class="step-table-content-title">审核结果</div>
                <div class="step-table-content-list">
                  <el-row :gutter="20" v-for="(item, key) in auditorReply" :key="key"
                  :style="{'margin-bottom':key == auditorReply.length - 1 ? '0' : '20px'}">
                    <el-col :span="6" class="text">审核人：
                      <span style="color: #99A9BF;font-weight: 600;">{{item.name}}</span>
                    </el-col>
                    <el-col :span="6" class="text">电话：
                      <span style="color: #99A9BF">{{item.phone}}</span>
                    </el-col>
                    <el-col :span="6" class="text"> 意见：
                      <span style="color: #99A9BF">{{item.content}}</span>
                    </el-col>
                    <el-col :span="6" class="text">时间：
                      <span style="color: #99A9BF">{{item.createTime}}</span>
                    </el-col>
                  </el-row>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div class="step step-second">
        <div class="step-title">
          <span>2</span>终审信息列表
        </div>
        <div v-show="step == 2" class="step-content" v-loading="loading">
          <el-table
            v-show="step == 2"
            :data="detailData"
            style="width: 100%">
            <el-table-column
              prop="messageCode"
              label="信息代码"
              min-width="10%">
            </el-table-column>
            <el-table-column
              prop="content"
              label="信息内容"
              min-width="40%">
            </el-table-column>
            <el-table-column
              prop="beginsTime"
              label="开始时间"
              min-width="10%">
              <template slot-scope="scope">
                <div v-html="timeFilter(scope.row.beginsTime)"></div>
              </template>
            </el-table-column>
            <el-table-column
              prop="engTime"
              label="结束时间"
              min-width="10%">
              <template slot-scope="scope">
                <div v-html="timeFilter(scope.row.engTime)"></div>
              </template>
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              min-width="10%">
              <template slot-scope="scope">
                <div v-html="statusFilter(scope.row.status)"></div>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              min-width="15%">
              <template slot-scope="scope">
                <el-button @click="updateInfo(scope.row, 4)" type="text" size="small">
                  审核通过
                </el-button>
                <el-button @click="updateInfo(scope.row, 2)" type="text" size="small">
                  驳回
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="step-table">
            <div class="step-table-content">
              <div class="step-table-content-title">审核结果</div>
              <div class="step-table-content-list">
                <el-row :gutter="20" v-for="(item, key) in auditorReply" :key="key"
                :style="{'margin-bottom':key == auditorReply.length - 1 ? '0' : '20px'}">
                  <el-col :span="6" class="text">审核人：
                    <span style="color: #99A9BF;font-weight: 600;">{{item.name}}</span>
                  </el-col>
                  <el-col :span="6" class="text">电话：
                    <span style="color: #99A9BF">{{item.phone}}</span>
                  </el-col>
                  <el-col :span="6" class="text"> 意见：
                    <span style="color: #99A9BF">{{item.content}}</span>
                  </el-col>
                  <el-col :span="6" class="text">时间：
                    <span style="color: #99A9BF">{{item.createTime}}</span>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="step step-third">
        <div class="step-title">
          <span>3</span>确认发布
        </div>
        <div v-show="step == 3" class="step-content" v-loading="loading">
          <el-table
            :data="detailData"
            style="width: 100%">
            <el-table-column
              prop="messageCode"
              label="信息代码"
              min-width="10%">
            </el-table-column>
            <el-table-column
              prop="content"
              label="信息内容"
              min-width="40%">
            </el-table-column>
            <el-table-column
              prop="beginsTime"
              label="开始时间"
              min-width="10%">
              <template slot-scope="scope">
                <div v-html="timeFilter(scope.row.beginsTime)"></div>
              </template>
            </el-table-column>
            <el-table-column
              prop="engTime"
              label="结束时间"
              min-width="10%">
              <template slot-scope="scope">
                <div v-html="timeFilter(scope.row.engTime)"></div>
              </template>
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              min-width="10%">
              <template slot-scope="scope">
                <div v-html="statusFilter(scope.row.status)"></div>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              min-width="15%">
              <template slot-scope="scope">
                <el-button @click="updateInfo(scope.row, 1)" type="text" size="small"
                v-if="scope.row.status == 3">发布</el-button>
                <el-button @click="updateInfo(scope.row, 3)" type="text" size="small"
                v-if="scope.row.status == 4">撤销</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="step-table">
            <div class="step-table-content">
              <div class="step-table-content-title">审核结果</div>
              <div class="step-table-content-list">
                <el-row :gutter="20" v-for="(item, key) in auditorReply" :key="key"
                :style="{'margin-bottom':key == auditorReply.length - 1 ? '0' : '20px'}">
                  <el-col :span="6" class="text">审核人：
                    <span style="color: #99A9BF;font-weight: 600;">{{item.name}}</span>
                  </el-col>
                  <el-col :span="6" class="text">电话：
                    <span style="color: #99A9BF">{{item.phone}}</span>
                  </el-col>
                  <el-col :span="6" class="text"> 意见：
                    <span style="color: #99A9BF">{{item.content}}</span>
                  </el-col>
                  <el-col :span="6" class="text">时间：
                    <span style="color: #99A9BF">{{item.createTime}}</span>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 提交审核对话框 -->
    <el-dialog width='500px' custom-class="custom-dialog"
      title='审核人'
      :visible.sync='dialogshowAudit'>
      <el-scrollbar style="height: 150px;margin-bottom: 20px;">
        <el-checkbox-group v-model="auditorChecked" @change="handleCheckedAuditors">
          <el-checkbox style="line-height: 50px;width: 25%"
            v-for="(item, key) in auditorList"
            :label="item"
            :key="key" name="auditor">
            {{item.name}}
          </el-checkbox>
        </el-checkbox-group>
      </el-scrollbar>
      <div slot='footer' class='dialog-footer'>
        <el-checkbox
          style="float: left"
          :indeterminate="isIndeterminate"
          v-model="checkAllAuditor"
          @change="handleCheckAllAuditor">
          全选
        </el-checkbox>
        <el-button type='primary'
          @click='updateStatus'
          :disabled="isSubmiting">
          提 交
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listAuditAll } from '@/api/deploy/auditor'
import * as httpRequest from '@/api/infoManage/infoList'
import Pagination from '@/components/Pagination/index'

export default {
  name: 'InfoAudit',
  components: {
    pagination: Pagination
  },
  data() {
    return {
      ruleForm: {
        infoCode: '',
        date1: '',
        time1: '',
        date2: '',
        time2: '',
        infoStatus: '',
      },
      // 当前步骤
      step: 0,
      options: [],
      statuslist: [
        {
          value: 0,
          label: '未审核'
        }, {
          value: 1,
          label: '待审核'
        }, {
          value: 2,
          label: '初审通过'
        }, {
          value: 3,
          label: '终审通过'
        }, {
          value: 4,
          label: '未下发'
        }, {
          value: 5,
          label: '已下发'
        }, {
          value: 6,
          label: '审核驳回'
        }, {
          value: 7,
          label: '已撤销'
        }
      ],
      tableData: [],
      detailData: [],
      total: 0,
      currentPage: 1,
      toploading: false,
      loading: false,
      // 审核人
      auditorList: [],
      auditorReply: [],
      dialogshowAudit: false,
      auditorChecked: [],
      checkAllAuditor: false,
      isIndeterminate: false,
      handleInfo: {},
      isSubmiting: false,
      datePickerStart: {
        disabledDate(time) {
          return time.getTime() < (Date.now() - 24 * 60 * 60 * 1000)
        },
      },
      timePickerStart: '',
      datePickerEnd: {
        disabledDate(time) {
          return time.getTime() < (Date.now() - 24 * 60 * 60 * 1000)
        },
      },
      timePickerEnd: '',
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // 信息代码列表
      httpRequest.getCodeList().then((res) => {
        this.options = res.data
      })
      // 信息列表
      this.getList(1)
    },
    getList(page) {
      this.toploading = true
      const param = {
        pageNum: page || this.currentPage,
        pageSize: 5,
        messageCode: this.ruleForm.infoCode,
        status: this.ruleForm.infoStatus,
        beginTime: this.timeTranslator(this.ruleForm.date1, this.ruleForm.time1),
        endTime: this.timeTranslator(this.ruleForm.date2, this.ruleForm.time2),
      }
      httpRequest.listmsg(param).then((res) => {
        if (res.code === 200) {
          this.total = res.total
          this.tableData = res.rows
          this.toploading = false
        }
      })
    },
    submitForm() {
      this.getList(1)
    },
    // 点击数据行
    handleCurrentChange(val) {
      this.loading = true
      this.step = val.status > 3 ? 3 : val.status
      this.detailData = []
      this.detailData.push(val)
      this.auditSearch(val)
    },
    // 查询审核结果意见
    auditSearch(task) {
      const param = {
        taskId: task.id,
        role: Math.min(2, task.status) - 1
      }
      httpRequest.auditSearch(param).then((res) => {
        if (res.code === 200) {
          this.auditorReply = res.data
          this.loading = false
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 提交终审
    openAuditDia(role, data) {
      this.handleInfo = data
      this.handleInfo.role = role
      this.dialogshowAudit = true
      this.getAuditors(role)
    },
    // 选择审核人
    handleCheckAllAuditor(val) {
      this.auditorChecked = val ? this.auditorList : []
      this.isIndeterminate = false
    },
    handleCheckedAuditors(value) {
      const checkedCount = value.length
      this.checkAllAuditor = checkedCount === this.auditorList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.auditorList.length
    },
    // 查询审核人列表
    getAuditors(role) {
      const param = { role }
      listAuditAll(param).then((res) => {
        if (res.code === 200) {
          this.auditorList = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    updateStatus() {
      this.isSubmiting = true
      const param = []
      this.auditorChecked.forEach((item) => {
        param.push({
          taskId: this.handleInfo.id,
          name: item.name,
          phone: item.phone,
          role: this.handleInfo.role,
          taskContent: this.handleInfo.content
        })
      })
      httpRequest.infoReply(param).then((res) => {
        console.log(res)
        if (res.code === 200) {
          this.$message.success('提交成功')
          this.dialogshowAudit = false
          this.isSubmiting = false
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 发布、通过、撤销、驳回
    updateInfo(data, optType) {
      let str = ''
      let status = ''
      console.log(data)
      if (optType === 1) {
        str = '发布'
        status = 4
      } else if (optType === 2) {
        str = '驳回'
        status = 0
      } else if (optType === 3) {
        str = '撤销'
        status = 0
      } else {
        str = '审核通过'
        status = 3
      }
      const param = {
        id: data.id,
        status,
        optType: optType === 4 ? 1 : optType,
        beginsTime: optType === 3 ? data.beginsTime : ''
      }
      this.$confirm(`确定${str}该条信息?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        httpRequest.updateInfo(param).then((res) => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: `${str}成功`
            })
            this.step = 0
            this.detailData = []
            this.getList(this.currentPage)
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
      })
    },
    statusFilter(val) {
      const str = ((a) => {
        switch (a) {
          case 0:
            return '未审核'
          case 1:
            return '待审核'
          case 2:
            return '初审通过'
          case 3:
            return '终审通过'
          case 4:
            return '未下发'
          case 5:
            return '已下发'
          case 6:
            return '审核驳回'
          case 7:
            return '已撤销'
          default:
            return '异常'
        }
      })(val)
      const color = ((b) => {
        switch (b) {
          case 0:
            return '#ff0000'
          case 1:
            return '#ff0000'
          case 2:
            return '#00d92e'
          case 3:
            return '#00d92e'
          case 4:
            return '#f69600'
          case 5:
            return '#00d92e'
          case 6:
            return '#ff0000'
          case 7:
            return '#a2a2a2'
          default:
            return '#a2a2a2'
        }
      })(val)
      return `<span style="color:${color}">${str}</span>`
    },
    timeFilter(str) {
      const date = new Date(str)
      const y = date.getFullYear()
      const m = (date.getMonth() + 1) < 10 ? `0${(date.getMonth() + 1)}` : (date.getMonth() + 1)
      const d = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
      const h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
      const i = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
      return `<span>${y}-${m}-${d}<br>${h}:${i}:00</span>`
    },
    timeTranslator(date, time) {
      if (date && time === '') {
        const st = '23:59:59'
        const newDate = new Date(date)
        const day = newDate.toLocaleDateString()
        return `${day} ${st}`
      }
      if (date && time) {
        const newDate = new Date(date)
        const day = newDate.toLocaleDateString()
        const newTime = new Date(time)
        const st = `${newTime.getHours()}:${newTime.getMinutes()}:00`
        return `${day} ${st}`
      }
      return ''
    },
    afternowHM() {
      let selectableRange = ''
      const myDate = new Date()
      const hour = myDate.getHours() < 10 ? `0${myDate.getHours()}` : myDate.getHours()
      const min = myDate.getMinutes() < 10 ? `0${myDate.getMinutes()}` : myDate.getMinutes()
      if (this.ruleForm.date1 > new Date()) {
        selectableRange = '00:00:00 - 23:59:59'
      } else {
        selectableRange = `${hour}:${min}:00 - 23:59:59`
      }
      this.timePickerStart = { selectableRange }
    },
    handleEndTime() {
      try {
        if (this.ruleForm.date2.getTime() - this.ruleForm.date1.getTime() > 8.64e7) {
          this.timePickerEnd = { selectableRange: '00:00:00 - 23:59:59' }
        }
        return true
      } catch (error) {
        return false
      }
    },
    changePickerEnd() {
      if (this.ruleForm.date1 > this.ruleForm.date2) {
        this.ruleForm.date2 = ''
        this.ruleForm.time2 = ''
      }
      this.datePickerEnd = {
        disabledDate: (time) => {
          const a = this.ruleForm.date1
          return time.getTime() < new Date(a).getTime()
        }
      }
    },
    changeEndTimeRange() {
      let selectableRange = ''
      const endTime = new Date(this.ruleForm.time1.getTime() + 1000 * 60 * 60 * 6)
      const hour = endTime.getHours() < 10 ? `0${endTime.getHours()}` : endTime.getHours()
      const min = endTime.getMinutes() < 10 ? `0${endTime.getMinutes()}` : endTime.getMinutes()
      selectableRange = `${hour}:${min}:00 - 23:59:59`
      this.timePickerEnd = { selectableRange }
      if (endTime.getHours() >= 0 && endTime.getHours() < 5) {
        this.datePickerEnd = {
          disabledDate: (time) => {
            const a = this.ruleForm.date1
            return time.getTime() < new Date(a).getTime() + 8.64e7
          }
        }
      } else {
        this.datePickerEnd = {
          disabledDate: (time) => {
            const a = this.ruleForm.date1
            return time.getTime() < new Date(a).getTime()
          }
        }
      }
      this.ruleForm.date2 = ''
      this.ruleForm.time2 = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .info-form{
    .el-form-item__label{
      float: inherit;
      line-height: 30px;
      color: $formLabel;
      font-weight: 400;
    }
    .hide-useless-requiedIcon{
      .el-col:nth-child(even){
        .el-form-item__label{
          &::before{
            display: none
          }
        }
      }
    }
    .area-select{
      .el-form-item__content{
        padding: 10px 20px;
        border: 1px solid #d3d3d3;
        .el-checkbox__inner{
          width: 20px;
          height: 20px;
        }
        .el-checkbox__input.is-checked .el-checkbox__inner,
        .el-checkbox__input.is-indeterminate .el-checkbox__inner{
          background-color: #fff;
          border-color: #409EFF;
        }
        .el-checkbox__inner::after{
          border:2px solid #409EFF;
          border-left: 0;
          border-top: 0px;
          height: 13px;
          width: 5px;
          left: 6px;
          top: 0px;
        }
        .el-checkbox__input.is-indeterminate .el-checkbox__inner::before{
          background-color: #409EFF;
        }
        .el-checkbox__input.is-checked+.el-checkbox__label{
          color: #353535;
        }
        .el-checkbox__input.is-indeterminate .el-checkbox__inner::before{
          height: 17px;
          top: 1px;
        }
      }
    }
    .el-textarea__inner{
      padding: 5px 10px;
      min-height: 32px;
      height: 32px;
    }
    .el-textarea{
      .el-input__count{
        color: red;
        font-size: 14px;
        bottom:10px;
        &::before{
          content:'（你已经录入了 ';
          color: $formLabel;
        }
        &::after{
          content:' 字）';
          color: $formLabel;
        }
      }
    }
    .buttons{
      margin-top: 10px;
      margin-bottom: 20px;
      text-align: center;
      .el-button{
        padding: 12px 35px;
      }
    }
  }
  .pagination{
    float: right;
    margin-top: 10px;
  }
  .info-detail{
    border-top: 1px solid #e9e9e9;
    margin-top: 10px;
    .step{
      padding: 10px 0;
      border-bottom: 1px solid #e9e9e9;
      .step-title{
        color: #206C8E;
        font-size: 18px;
        font-weight: 700;
        span{
          background: #206C8E;
          color: $fontWhite;
          padding: 0 10px;
          margin-right: 5px;
        }
      }
      .step-content{
        margin-top: 10px;
      }
      .step-table{
        width: 100%;
        border: 1px solid #EBEEF5;
        border-top: none;
        overflow: hidden;
        padding: 30px 0;
        .step-table-content{
          width: 102%;
          overflow: hidden;
          font-size: 14px;
          .step-table-content-title{
            width: 11%;
            float: left;
            text-align: center;
          }
          .step-table-content-list{
            width: 89%;
            float: left;
            max-height:82px;
            font-size: 12px;
            overflow-y: auto;
            overflow-x:hidden;
            .text{
              span{
                font-size: 14px;
                font-weight: 700;
              }
            }
          }
        }
      }
    }
  }
</style>
<style lang="scss" scoped>
  /deep/ .el-table .cell{
    text-align: center
  }
  /deep/ .el-table td, .el-table th {
    padding: 4px 0;
  }
  /deep/ .el-input__icon:before {
    position: relative;
    top: -3px;
  }
</style>
