<template xmlns:el-table="http://www.w3.org/1999/html">
    <div>
        <div v-if="!hasLogin">
            <div class="login">
                <el-container>
                  <el-header></el-header>
                  <div style="height: 40px"></div>
                  <el-main>
                    <el-card class="box-card">
                      <div style="height: 20px"></div>
                      <div style="margin-bottom: 30px; font-weight: bold">管理员登录</div>
                      <el-form label-width="60px">
                        <el-form-item label="用户名">
                          <el-input v-model="username"></el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                          <el-input v-model="password" show-password></el-input>
                        </el-form-item>
                      </el-form>
                      <div style="height: 10px"></div>
                      <el-button
                        type="primary"
                        round
                        style="width: 35%; margin-bottom: 10px"
                        @click="clilogin"
                        >登录</el-button
                      >
                    </el-card>
                    <div style="height: 168px"></div>
                  </el-main>
                </el-container>
              </div>
        </div>
        <div v-if="hasLogin">
            <el-row>
                <el-col :span="5">
                    <el-menu :default-active="selectItem" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="handleSelect">
                        <el-menu-item index="1">
                            <i class="el-icon-s-comment"></i>
                            <span slot="title">评论管理</span>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <i class="el-icon-data-analysis"></i>
                            <span slot="title">数据更新</span>
                        </el-menu-item>
                        <el-menu-item index="3" disabled>
                            <i class="el-icon-setting"></i>
                            <span slot="title">待开发</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :span="19">
                    <!--用户评论管理-->
                    <div v-if="selectItem==='1'">
                        <div>
                            <div  v-for="(comment, index) in
                                (publishedCurrentPage!=commentNum/5?
                                comments.slice(5*publishedCurrentPage-5,5*publishedCurrentPage):
                                comments.slice(5*publishedCurrentPage-5,commentNum)
                                )" :key="index">
                                <el-card class="box-card" style="width: 800px;height: 100%;margin:0 auto">
                                    <span class="bigFontSize" style="font-size: 15px;float: left;color: #7b7b7b">
                                        <i class="el-icon-time"></i>
                                        Time：{{comment.commentTime}}</span>
                                    <span style="float: right;">
                                        <el-button type="danger" icon="el-icon-delete"
                                        @click="deleteSelectedComment(index)" 
                                        circle></el-button></span>
                                    <br><br>
                        
                                    <span class="NameFontSize" style="font-size: 20px;float:left;padding-left: 2%">
                                        {{comment.firstName}}&nbsp;&nbsp;
                                        {{comment.lastName}}</span>
                                    <el-divider></el-divider>
                                    <span class="commentSize" style="font-family: 'goodFont';float: left">
                                        {{comment.commentContent}}</span>
                                    <br>
                                
                                </el-card>
                                <br>
                            </div>
                        
                            <el-pagination v-if="commentNum>=4" layout="prev, pager, next" :page-size="5" :total="commentNum"
                                @current-change="current_change" style="float: bottom ;padding-bottom: 1%" background>
                        
                        
                            </el-pagination>
                        </div>
                    </div>
                  <!--数据更新-->
                  <div v-if="selectItem === '2'">
                    <el-row :gutter="24">
                      <el-col :span="12">
                        <el-upload
                            ref = "upload"
                            drag
                            name = "excel"
                            action="https://101.34.214.247:6001/api/Upload"
                            :on-error = "uploadFalse"
                            :on-success = "uploadSuccess"
                            :limit = "1"
                            accept = ".csv"
                            :before-upload = "beforeUpload"
                            :auto-upload = "false"
                            :file-list = "fileList"
                            :on-change = "handleChange"
                            :before-remove = "handleRemove"
                            style="width: 80%;margin-left: 20%"
                        >
                          <i class="el-icon-upload"></i>
                          <div
                              class="el-upload__text">
                            将文件拖到此处，或<em>点击上传</em>
                          </div>
                          <div slot="tip" class="el-upload__tip">每次只能上传一个csv格式的Excel文件且大小不能超过100MB!</div>
                        </el-upload>
                      </el-col>
                      <el-col :span = "12">

                        <p style="margin-left: 10%">请选择您要更新的表：</p>
                        <el-row style="width: 100%">
                          <el-select
                              v-model="currentChosedTableName"
                              placeholder="请选择"
                              style="width: 50%"
                              >
                            <el-option
                                v-for="(item,index) in tableList"
                                :key = "index"
                                :label = "item"
                                :value = "item"
                                style="width: 100%;">
                            </el-option>
                          </el-select>
                        </el-row>
                        <el-row>
                          <el-tag
                                type="info"
                                style="margin-left: 2%"
                                v-for="(item,index) in tableRule[currentChosedTableName]"
                                :key = "index">
                              {{item}}
                          </el-tag>
                        </el-row>
                        <el-button @click="readCsvFile">上传</el-button>
                      </el-col>
                    </el-row>
                    <!--展示要上传的csv内的数据-->
                    <el-table
                        :data = "tableData"
                        style="margin: auto;width: 90%"
                        height="400"
                        border>
                      <el-table-column
                          v-for="(item,index) in tableHead" :key="index"
                          fixed
                          :prop="tableHead[index]"
                          :label="tableHead[index]"
                          :width="830/tableHead.length">
                      </el-table-column>
                    </el-table>

                  </div>

                </el-col>
            </el-row>
        </div>
    </div>

</template>

<script>
import { getComment,deleteComment } from '@/api/board';
import * as XLSX from "xlsx";
import {uploadCsv} from "@/api/upload";
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};


const tableList = ["Aminer_Author"]
const tableRule = {
  Aminer_Author:["index","name","pc","cn","hi","pi","upi"]
}


export default{

    name:'admin',
    data(){
        return{
            hasLogin:false,
            username:'',
            password:'',
            selectItem:'1',
            comments:[],
            commentNum:0,
            publishedCurrentPage:1,
          //  要进行更新的文件
            file: null,
          //  接收上传组件的文件列表
            fileList : [],
          // csv对象数组
          tableData:[],
          // csv表头数据
          tableHead:[],
          // 可更新的表名
          tableList,
          //对应的表头规则
          tableRule,
          currentChosedTableName: 'Aminer_Author',
        }
    },
    created(){
        getComment().then(response=>{
            this.comments=eval(response.data);
            //按时间倒序排列
            this.commentNum=this.comments.length
            this.couponList=response.data.couponList; 
            console.log(this.comments)
        }).catch(()=>{
            this.$message.error("There's something wrong with your network.");
        })


    },
    methods:{
        //删除评论
        deleteSelectedComment(id){
            console.log(id)
            //弹出确认框
            this.$confirm('确认删除此评论吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteComment(this.comments[id].commentId).then(response=>{
                    response
                    
                    //从comments中删除下标为id
                    this.comments.remove(id,id+1)
                    //调api
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });

                }).catch(()=>{
                    this.$message.error("网络异常");
                })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        clilogin(){
            if(this.username!='aminer' || this.password!='12345678'){
                this.$message({
                    message: '错误的账号或密码',
                    type: 'warning'
                });
                return;
            }
            //成功登录
            this.$message({
                message: '成功登陆！',
                type: 'success'
            });
            this.hasLogin=true;
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        current_change(publishedCurrentPage){
            this.publishedCurrentPage=publishedCurrentPage
        },
        handleSelect(key){
          this.selectItem = key;
        },
        //检验表头的合法性
        checkValidateHead(tableHead){
          let flag = true
          tableHead.forEach((item,index)=>{
            if(index >= this.tableRule[this.currentChosedTableName].length || item !== this.tableRule[this.currentChosedTableName][index])
              flag = false
          })
          return flag
        },
        readCsvFile(){
          // 从文件读取
          console.log(this.fileList)
          if(this.fileList.length === 0){
            this.$message.error("您还没有选择上传的csv文件！")
            return
          }
          //检验表头是否合法
          if(!this.checkValidateHead(this.tableHead)){
            this.$message.error("您选择的文件不符合要求的表头格式，请重新选择上传！")
            return
          }
          this.fileList[0].file = this.fileList[0].raw
          let param = new FormData()
          param.append('file', this.fileList[0].raw)
          param.append('name',this.fileList[0].name)
          uploadCsv(param).then((res)=>{
            console.log(res)
            this.$message.success('数据更新成功！')
          }).catch((error)=>{
            console.log(error)
            this.$message.error('数据更新失败！')
          })
          console.log(this.fileList)
        },
      //上传文件之前对钩子
        beforeUpload(file){
          const FILE_NAME = file.name
          let subStr = FILE_NAME.substring(FILE_NAME.lastIndexOf('.'))
          if(subStr !== '.csv'){
            this.$message.warning('数据更新仅支持csv文件！')
            return false
          }
          //判断10M以内的文件
          const isLt1M = file.size / 1024 / 1024 <= 100
          if(isLt1M) {
            this.file = file
            return true
          }
          this.$message.warning('请上传不超过100M的文件.')

        },
      // 选取文件后，讲file转换成json
        handleChange(file,fileList){
          this.fileList = fileList
          console.log(file)
          var excelData = []
          const fileReader = new FileReader()
          //读取文件
          fileReader.readAsText(file.raw,'utf-8')
          //文件读取成功时触发事件
          fileReader.onload=ev=> {
              //读取的文件
              let data = ev.target.result

              data = data.substring(0,Math.min(data.length,100000));
              //以二进制流方式读取得到整份excel表格
              const workbook = XLSX.read(data, {type: 'binary'})
              // 循环遍历excel的sheet
              console.log(workbook)
              Object.keys(workbook.Sheets).forEach((sheet, index) => {
                console.info(workbook.Sheets[sheet]['!ref'])
                excelData.push(
                    //将excel 转换成json对象放入数组中
                    ...XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
                )
              })
              this.data = excelData
              console.log(excelData.length)
              // 获取表头数据,使用第一行数据来获取
            this.tableHead = []
              if(excelData.length > 0) {
                const tableItem = excelData[0]
                for(let key of Object.keys(tableItem)){
                  this.tableHead.push(key)
                }
              }
              console.log(111)
              this.tableData = excelData

          }
          },
      //上传文件失败
      uploadFalse(err,file,fileList){
          this.$message.error("上传文件失败，请重试！")
      },
      //成功上传文件
      uploadSuccess(response,file,fileList){
          this.$message.success("成功更新数据！")
      },
      handleRemove(file,fileList){
          this.fileList = []
          this.tableHead = []
          this.tableData = []
      }

    }
}
</script>

<style scoped>
    body {
      margin: 0px;
    }
    .login {
      background-image: url(https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/b190fa0e5850486d.jpg);
      background-size: cover;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      text-align: center;
      margin: 0 auto;
    }
    .text {
      font-size: 14px;
    }
    .item {
      padding: 18px 0;
    }
    .box-card {
      width: 350px;
      height: 300px;
      margin: 0 auto;
    }
    .el-button {
      margin: 0 auto;
      text-align: center;
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