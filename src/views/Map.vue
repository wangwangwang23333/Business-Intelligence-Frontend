<template>
  <div class="home" ref="home">

    <div
        style="
        background-image: linear-gradient(to bottom,#2c342c 0%, #2c342c 90%, rgba(0,0,0,0) 90% , rgba(0,0,0,0) 100%)"
    >
      <div style="
          color: #fcfcfc;
          padding-top: 5px;
          background-repeat: no-repeat;
          background-position: top;
          background-size: auto;
          "
           :style="{'background-image': 'url(' + require('@/assets/home/line-above.svg') + ') '}"
      >
        <!--      介绍文字-->
<!--        <div style="font-size: 2.5em; font-weight: 1; padding-top: 7rem">-->
<!--          More intuitive representation-->
<!--        </div>-->

        <!--      大标题-->
        <div style="display: inline-flex; font-size: 4em; padding-top: 3em">
          <img
              src="@/assets/BI-logo.png"
              style="display:inline-block;width: 1em; height: 1em; margin-right: .5em; padding-top: 15px"
              class="dynamic-animation">
          <span
              style=" font-weight: bold;"
              class="dynamic-animation">Smart Search</span>
        </div>

        <!--        说明-->
        <div
            style=" font-size: medium;   padding-bottom: 1rem;
            padding-top: 6em;">
          In this section you can search for information <br>
          about papers and collaborations of different authors.
        </div>

        <!--      按钮-->
        <div style="padding-top: 3rem; padding-bottom: 8em;">
          <el-button style="color: #030303; font-weight: normal;"
                     @click="gotoStart"
          > Get Started!
          </el-button>
        </div>


      </div>
    </div>

 
    <!--    过渡banner-->
    <div class="banner" ref="start">
      <span style="font-size: 1.5em;font-weight: bold;margin-bottom: 3em;">
        Get Started
      </span>

    </div>

    <!--    功能板块-->
    <div style="margin-bottom: 2em;margin-top: 2%">
      <el-form
          :model="ruleFormAuthorDepart"
          :rules="rulesAuthorDepart"
          ref="ruleFormAuthorDepart"
          class="demo-ruleForm"
          >
  <!--      &lt;!&ndash;搜索框&ndash;&gt;-->
        <el-row>
          <el-col :span="12">
            <span style="width: 30%;float: left;margin-top: 1%">choose Area:</span>
            <el-form-item prop="chosedArea">
              <el-autocomplete
                class="input-with-select"
                style="width: 60%;margin-left: 5%"
                v-model="ruleFormAuthorDepart.chosedArea"
                :fetch-suggestions="autoSearchArea"
                :highlight-first-item="true"
                placeholder="Research Topic"
            >
            </el-autocomplete>
            </el-form-item>
          </el-col>
          <!--选择筛选条件-->
          <el-col :span = '12'>
            <span style="width: 30%;float:left;margin-top: 1%">choose indicators:</span>
            <el-form-item prop="indicator">
              <el-select
                v-model="ruleFormAuthorDepart.indicator"
                placeholder="Please choose indicators"
                style="width: 60%;margin-left: 10%">
              <el-option
                  v-for="item in indicatorOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  style="width: 100%">
              </el-option>
            </el-select>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="8">
            <p style="width: 30%;float: left">author limits:</p>
            <el-form-item prop="authorLimit">
              <el-input-number
                style="width: 40%;margin-top: 2%"
                v-model="ruleFormAuthorDepart.authorLimit"
                :min="1" :max="10"
                label="author limits">
            </el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <p style="width: 40%;float: left">department limits:</p>
            <el-form-item prop="departmentLimit">
              <el-input-number
                style="width: 40%;margin-top: 2%"
                v-model="ruleFormAuthorDepart.departmentLimit"
                :min="1" :max="10"
                label="author limits">
            </el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span = "8">
            <el-button
                style="margin-top: 2%;margin-left: 5%"
                @click="searchTopAuthDepart">Search</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>


    

    <div style="padding: 4rem 0 4rem 0; background: #2b332b; color: #fcfcfc">
      <div style="display: inline-flex">
        <!--评论区-->
        <div style="margin-left: 1rem; width: 40%">
          <div style="text-align: left; padding-bottom: 2rem; font-weight: normal; font-size: large">
            Please leave your comments here.
          </div>
          <el-row>
            <el-col :span="11">
              <el-input
                  placeholder="First Name"
                  prefix-icon="el-icon-user-solid"
                  v-model="firstname">
              </el-input>
            </el-col>
            <el-col :span="2">
              &nbsp;
            </el-col>
            <el-col :span="11">
              <el-input
                  placeholder="Last Name"
                  prefix-icon="el-icon-user-solid"
                  v-model="lastname">
              </el-input>
            </el-col>
          </el-row>
          <el-row style="margin-top: 2rem;">
            <el-col :span="24">
              <el-input
                  type="textarea"
                  rows=5
                  placeholder="Message"
                  prefix-icon="el-icon-user-solid"
                  maxlength="256"
                  show-word-limit
                  v-model="content">
              </el-input>
            </el-col>
          </el-row>
          <el-button style="margin: 2rem 0 0 0; color: #030303; font-weight: normal;" plain @click="addComment()">
            SUBMIT
          </el-button>
        </div>

        <div style="width: 20%"></div>

        <!--            contact-->
        <div style="width: 40%; text-align: left;">
          <div style="font-size: small">
            <b style="font-size: x-large; font-weight: 10">Contacts</b>
            <p>If you have any feedback, please contact us.</p>

            <b>EMAIL</b>
            <div>19921305202@163.com</div>
            <br>

            <b>ADDRESS</b>
            <div>Tongji University, No.4800 caoan Road, Jiading District, Shanghai</div>
            <br>
          </div>
        </div>
      </div>
    </div>


</div>

</template>

<script>
import {sendComment} from '@/api/board';
import '@/assets/*.js'
import * as echarts from 'echarts';
import ResultMap from "@/components/ResultMap";
import {findAreaSuggestion} from "@/api/finder";

const indicatorOptions = [{
      value: 'pi',
      label: 'pi'
    }, {
      value: 'hi',
      label: 'hi'
    }, {
      value: 'upi',
      label: 'upi'
    }]


export default {
  name: 'Map',
  components: {


  },
  created() {

  },
  data() {
    return {
      dialogVisible: false,
      firstname: '',
      lastname: '',
      content: '',
      indicatorOptions,
      ruleFormAuthorDepart:{
        // 输入的关键领域
        chosedArea: '',
        //筛选条件
        indicator: '',
        //作者的数量
        authorLimit: 1,
        departmentLimit: 1,
      },
      rulesAuthorDepart: {
        chosedArea: [
          { required: true, message: 'Please choose Area!', trigger: 'blur' },
        ],
        indicator:[
          { required: true, message: 'Please choose indicator!', trigger: 'blur' },
        ]
      }
    }
  },
  mounted(){
    this.$refs["home"].scrollIntoView(true);
    this.getEchartData()
  },
  methods: {
    getEchartData() {
      const chart = this.$refs.chart
      if (chart) {
        const myChart = echarts.init(chart,'purple-passion')
        const option = {
          title: {
            text: 'Basic Radar Chart'
          },
          legend: {
            data: ['Allocated Budget', 'Actual Spending']
          },
          radar: {
            // shape: 'circle',
            indicator: [
              { name: 'Sales', max: 6500 },
              { name: 'Administration', max: 16000 },
              { name: 'Information Technology', max: 30000 },
              { name: 'Customer Support', max: 38000 },
              { name: 'Development', max: 52000 },
              { name: 'Marketing', max: 25000 }
            ]
          },
          series: [
            {
              name: 'Budget vs spending',
              type: 'radar',
              data: [
                {
                  value: [4200, 3000, 20000, 35000, 50000, 18000],
                  name: 'Allocated Budget'
                },
                {
                  value: [5000, 14000, 28000, 26000, 42000, 21000],
                  name: 'Actual Spending'
                }
              ]
            }
          ]
        };

        myChart.setOption(option)
        window.addEventListener("resize", function() {
          myChart.resize()
        })
      }
      this.$on('hook:destroyed',()=>{
        window.removeEventListener("resize", function() {
          myChart.resize();
        });
      })
    },
    //搜索领域
    autoSearchArea(key, cb){
      if(key === '')
          key = 'A'
      // 领域的远程搜索
      findAreaSuggestion(key).then(response => {
        this.remoteAreaList = response.data;
        cb(response.data.map((item)=>{
          return {"value": item};
        }));
      }).catch(()=>{
        this.$message.error("There's something wrong with your network.");
      })
    },
    //搜索关键作者和部门
    searchTopAuthDepart(){
      this.$refs['ruleFormAuthorDepart'].validate((valid) => {
        if (valid) {
          console.log(this.ruleFormAuthorDepart)

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //发送留言
    addComment() {
      //判断是否输入了FirstName
      if (this.firstname.length === 0) {
        this.$message({
          message: 'Please input your first name!',
          type: 'warning'
        });
        return;
      }
      if (this.firstname.length > 10) {
        this.$message({
          message: 'Your first name should not be longer than 10 words!',
          type: 'warning'
        });
        return;
      }
      if (this.lastname.length == 0) {
        this.$message({
          message: 'Please input your last name!',
          type: 'warning'
        });
        return;
      }
      if (this.lastname.length > 10) {
        this.$message({
          message: 'Your last name should not be longer than 10 words!',
          type: 'warning'
        });
        return;
      }
      if (this.content == 0) {
        this.$message({
          message: 'The content should not be empty!',
          type: 'warning'
        });
        return;
      }
      //发送api请求
      Date.prototype.Format = function (fmt) { // author: meizz
        var o = {
          "M+": this.getMonth() + 1, // 月份
          "d+": this.getDate(), // 日
          "h+": this.getHours(), // 小时
          "m+": this.getMinutes(), // 分
          "s+": this.getSeconds(), // 秒
          "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
          "S": this.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
      }
      let datetime = new Date().Format("yyyy-MM-dd hh:mm")

      let param = {
        firstName: this.firstname,
        lastName: this.lastname,
        commentTime: datetime,
        commentContent: this.content
      }

      //发送api请求
      sendComment(param).then(response => {
        response;
        //提醒添加成功
        this.$message({
          message: 'You have successfully commented!!',
          type: 'success'
        });

        //清空内容
        this.firstname = ''
        this.lastname = ''
        this.content = ''

       
      }).catch(() => {
        this.$message.error("There's something wrong with your network.");
      })
    },
    gotoStart() {
      this.$refs["start"].scrollIntoView(true);
    },

  },
  computed: {
    curPageContents: function () {
      return this.publishedCurrentPage != this.commentNum / 5 ?
          this.comments.slice(5 * this.publishedCurrentPage - 5, 5 * this.publishedCurrentPage) :
          this.comments.slice(5 * this.publishedCurrentPage - 5, this.commentNum)
    }
  }
}
</script>

<style scoped>
@import "../assets/css/font.css";


.el-icon-star-on:before {
  font-size: 1.5em !important;
}

.home {
  font-family: Futura;
}

.bigFontSize {
  font-size: 10px;
  color: #999;
  padding: 6px 6px;
  margin: 1px;
  word-wrap: break-word;
  word-break: normal;
}

.NameFontSize {
  font-size: 22px;
  padding: 1px 6px;
  font-weight: bold;
  text-align: left;
  display: block;
  margin-top: 10px;
  margin-right: 10px;
  flex: 1;
}

.commentSize {
  font-size: 18px;
  color: rgb(2, 0, 0);
  padding: 6px 6px;
  display: block;
  margin: 1px;
  text-align: left;
  word-wrap: break-word;
  word-break: normal;
}

#commentNumText {
  display: inline-block;
  font-size: 1.2em;
}

#myIcon {
  display: inline-block;
  margin-right: 10px;
  color: #0f68ba;
  font-size: 1.2em;
}

.banner {
  background-image: linear-gradient(45deg, #64cccc 0%, #64cccc 25%, #137bfc 25%);
  color: #fcfcfc;
  font-weight: normal;
  padding: 1rem 0 1rem 0;
}

.sectors {
  background: #2c342c;
  color: #fcfcfc;
  padding-bottom: 4rem;
}

.sectors .card {
  margin: 5rem 0 0 8rem;
  display: inline-flex;
}

.card .title {
  font-size: 2em;
  font-weight: bold;
}

.card .title:hover {
  color: #63cbcb;
  cursor: pointer;
}

.card .separator {
  width: 2em;
  height: 2em;
}

.card-left {
  padding-top: 2rem;
  text-align: left;
  width: 50%;
}

.card-right {
  width: 60%;
}

.card-right img {
  max-width: 60%;
}

.highlight-region {
  padding: 5rem 0 7rem 10rem;
  background-repeat: no-repeat;
  background-position: top;
  background-size: auto;
}

.odd-highlight {
  text-align: left;
  margin: 1rem;
  padding: 5px 1rem 1.5rem 1rem;
  background-image: linear-gradient(135deg, #147bfc 0%, #147bfc 3%, #2b332b8c 3%);
  color: #fcfcfc;
  backdrop-filter: blur(15px);
}

.even-highlight {
  text-align: left;
  margin: 1rem;
  padding: 5px 1rem 1.5rem 1rem;
  background-image: linear-gradient(135deg, #2b332b 0%, #2b332b 3%, #147bfc4a 3%);
  color: #2c3e50;
  backdrop-filter: blur(15px);
  font-weight: 5;
}


.comment-board {
  column-count: 3;
  background: white;
  padding: 5rem 2rem 5rem 2rem;
  display: flex;
}

.comment {
  text-align: left;
  margin: 0 2rem 0 2rem;
}

.logo-bar {
  display: inline-flex;
  margin: 1rem 0 1rem 0;
}

.logo-bar img {
  height: 2rem;
  padding: 0 2rem 0 2rem;
}

.el-button:hover {
  background: #1c7cfc;
  color: #fcfcfc;
  border-color: #2c342c;
}

.dynamic-animation{
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property:  transform;
}
.dynamic-animation:hover,.dynamic-animation:focus,.dynamic-animation:active {
  position: relative;
  transform: scale(1.1);
}
::v-deep .el-input__inner {
  width: 100%!important;
}

::v-deep .el-input {
  width: 100%!important;
}

::v-deep .my-select{
  display: block!important;;
  width: 100%!important;
}

</style>