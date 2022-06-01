<template>
  <div class="home">
    <div
        style="background-image: linear-gradient(to bottom,#2c342c 0%, #2c342c 90%, rgba(0,0,0,0) 90% , rgba(0,0,0,0) 100%)">
      <div style="
          color: #fcfcfc;
          padding-top: 5px;
          background-repeat: no-repeat;
          background-position: top;
          background-size: auto;
          " :style="{'background-image': 'url(' + require('@/assets/home/line-above.svg') + ') '}">
        <!--大标题-->
        <div style="display: inline-flex; font-size: 4em; padding-top: 2.5em">
          <img src="@/assets/BI-logo.png" style=" margin-right: .5em;width: 1.5em;height: 1.5em">
          <span class="dynamic-animation" style=" font-weight: bold;font-family: Bahnschrift;margin-top: .2em">AMiner-Paper Search System</span>
        </div>

        <!--      介绍文字-->
        <div style="font-size: 2.5em; font-weight: 1; padding-top: 1rem"
              class="dynamic-animation">
          Paper knowledge graph analysis  <br>
          and display
        </div>

        <!--      按钮-->
        <div style="padding-top: 3rem; ">
          <el-button style="color: #030303; font-weight: normal;" @click="gotoStart"> Get Started!
          </el-button>
        </div>

        <!--        说明-->
        <div style=" font-size: small; padding-top: .5em; display: inline-block; padding-bottom: 2rem">
          With the help of Aminer Search, we can quickly find the <br>
          collaboration and citation relationships between papers.
        </div>

        <!--      嵌入小方块-->
        <div style="text-align: left; margin-left: 2rem; margin-top: 1rem">
          <div style="
          background: #64cccc;
          text-align: left;
          padding: 2rem 2rem 0.5rem 0.5rem;
          display: inline-block;
          font-weight: bold;
          font-size: small;
          color: #fcfcfc;
          box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
        "
          class="dynamic-animation">
            ILLUSTRATION <br>
            VEDIO
          </div>
        </div>

      </div>
    </div>

    <!--    介绍视频-->
    <div style="margin: 3rem 8vw 4rem 8vw">
      <video-player class="video-player vjs-custom-skin vjs-big-play-centered" ref="videoPlayer" :playsinline="true"
                    :options="playerOptions">
      </video-player>
    </div>


    <!--    过渡banner-->
    <div class="banner" ref="start">
      <span>
        Want to see basic information about tens of thousands of papers <br>
        and collaborations between authors? Explore the content below!
      </span>
    </div>

    <!--    分区介绍-->
    <div class="sectors">

      <!--      Bacteriophage bay-->
      <div class="card">

        <!--        左边-->
        <div class="card-left">
          <!--        标题-->
          <div style="display: inline-block; padding-bottom: 2.5rem;">
            <img src="../assets/home/separater.svg" class="separator">
            <span class="title" @click="jumpTo(0)"> Graph Database</span>
          </div>
          <!--          说明-->
          <div style="padding-bottom: 2.5rem">
            We put data in a well-organised database. <br>
            By clicking, you can download it.
          </div>

          <!--          按钮-->
          <el-button @click="jumpTo(0)"> DOWNLOAD</el-button>
        </div>


        <!--        右边-->
        <div class="card-right">
          <img :src="require('../assets/home/illustration/file.png')">
        </div>

      </div>

      <!--      Phage finder-->
      <div class="card">

        <!--        右边-->
        <div class="card-right" style="text-align: left">
          <img :src="require('../assets/home/illustration/search.png')">
        </div>

        <!--        左边-->
        <div class="card-left">
          <!--        标题-->
          <div style="display: inline-block; padding-bottom: 2.5rem;">
            <img src="../assets/home/separater.svg" class="separator">
            <span class="title" @click="jumpTo(1)"> Graph Visualization </span>
          </div>
          <!--          说明-->
          <div style="padding-bottom: 2.5rem">
            By searching, people can find information <br>
            in different forms of visualization networks.
          </div>
        </div>
      </div>

      <!--      Interactive map-->
      <div class="card">

        <!--        左边-->
        <div class="card-left">
          <!--        标题-->
          <div style="display: inline-block; padding-bottom: 2.5rem;">
            <img src="../assets/home/separater.svg" class="separator">
            <span class="title" @click="jumpTo(2)"> Smart Search </span>
          </div>
          <!--          说明-->
          <div style="padding-bottom: 2.5rem">
            In this section you can search for information about papers <br>
            and collaborations of different authors.
          </div>

        </div>

        <!--        右边-->
        <div class="card-right">
          <img :src="require('../assets/home/illustration/map-dna.png')" style="width: 45%">
        </div>

      </div>

    </div>


    <!--    高亮点-->
    <div style="
              text-align: left;
              background-image: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 93%, white 93%)
     ">

      <div class="highlight-region"
        :style="{'background-image': 'url(' + require('@/assets/home/line-below.svg') + ') '}">
        <div style="overflow: hidden; width: 80%;">
          <!--两行三列-->
          <el-row style="width: 100%">
            <el-col :span="8" v-for="(item,i) in introduction" :key="i">
              <div :class="{
                'odd-highlight': (i % 2),
                'even-highlight': !(i % 2),
                'dynamic-animation':1
              }">
                <span style="font-weight: bold">{{ item.title }}</span>
                <br>

                <p>{{ item.description }}</p>
              </div>
            </el-col>
          </el-row>

        </div>
      </div>

      <!--      嵌入小方块-->
      <div style="text-align: left; margin-left: 2rem; margin-top: -3rem">
        <div style="
          background: #64cccc;
          text-align: left;
          padding: 2rem 2rem 0.5rem 0.5rem;
          display: inline-block;
          font-weight: bold;
          font-size: small;
          color: #fcfcfc;
        ">
          MESSAGE <br>
          BOARD
        </div>
      </div>

    </div>


    <!--    评论区-->
    <div class="comment-board" ref="commentBoard">
      <div style="width: 33.3%">
        <div v-for="i in [0, 1]" :key="i" class="comment">
          <div v-if="curPageContents[i]">
            <p>
              {{ curPageContents[i].commentContent }}
            </p>

            <div style="color: #757575">
              <span> {{ curPageContents[i].firstName }} </span>
              <span> {{ curPageContents[i].lastName }}</span> <br>
              <span> {{ curPageContents[i].commentTime }} </span>
            </div>
            <el-divider></el-divider>
          </div>
        </div>
      </div>

      <div style="width: 33.3%">
        <div v-for="i in [2, 3]" :key="i" class="comment">
          <div v-if="curPageContents[i]">
            <p>
              {{ curPageContents[i].commentContent }}
            </p>

            <div style="color: #757575">
              <span> {{ curPageContents[i].firstName }} </span>
              <span> {{ curPageContents[i].lastName }}</span> <br>
              <span> {{ curPageContents[i].commentTime }} </span>
            </div>
            <el-divider></el-divider>
          </div>
        </div>
      </div>

      <div style="width: 33.3%">
        <div v-for="i in [4]" :key="i" class="comment">
          <div v-if="curPageContents[i]">
            <p>
              {{ curPageContents[i].commentContent }}
            </p>

            <div style="color: #757575">
              <span> {{ curPageContents[i].firstName }} </span>
              <span> {{ curPageContents[i].lastName }}</span> <br>
              <span> {{ curPageContents[i].commentTime }} </span>
            </div>
            <el-divider></el-divider>
          </div>
        </div>

        <!--        换页符-->
        <div style="display: inline-flex; ">
          <el-button @click="current_change(publishedCurrentPage - 1)" :disabled="publishedCurrentPage === 1" circle>
            <i class="el-icon-caret-left"></i>
          </el-button>
          <el-button :disabled="publishedCurrentPage >= (commentNum / 5)"
                     @click="current_change(publishedCurrentPage + 1)" circle>
            <i class="el-icon-caret-right"></i>
          </el-button>
        </div>
      </div>

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
              <el-input placeholder="First Name" prefix-icon="el-icon-user-solid" v-model="firstname">
              </el-input>
            </el-col>
            <el-col :span="2">
              &nbsp;
            </el-col>
            <el-col :span="11">
              <el-input placeholder="Last Name" prefix-icon="el-icon-user-solid" v-model="lastname">
              </el-input>
            </el-col>
          </el-row>
          <el-row style="margin-top: 2rem;">
            <el-col :span="24">
              <el-input type="textarea" rows=5 placeholder="Message" prefix-icon="el-icon-user-solid" maxlength="256"
                        show-word-limit v-model="content">
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

    <!--跳转到管理员-->
    <button @click="jumpToAdmin()" style="float: right;border:none;width: 1vw;height: 1vh;"></button>
    <!--    logos-->
    <div style="background: white;">
      <div style="display: inline-flex" class="logo-bar">
        <img :src="require('../assets/logos/se.png')">
      </div>
    </div>

    <el-dialog title="Database Download" :visible.sync="downloadDatabaseVisible" width="30%" center>
      <!--
        <span>You can download the database you need.</span>
      -->
      <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%" max-height="300">
        <el-table-column label="Table" prop="table">
        </el-table-column>
        <el-table-column align="right">
          <template slot="header">
            <el-button size="mini" type="primary" @click="downloadAllFiles()">Download All</el-button>
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleDownload(scope.$index, scope.row)">Download</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="downloadDatabaseVisible = false">Quit</el-button>
      </span>
    </el-dialog>
  </div>


</template>

<script>
  // @ is an alias to /src
  import { videoPlayer } from "vue-video-player";
  import "video.js/dist/video-js.css";
  import { getComment, sendComment } from '@/api/board';

  export default {
    name: 'home',
    components: {
      videoPlayer,
    },
    created(){
      getComment().then(response => {
        this.comments = eval(response.data).reverse();
        //按时间倒序排列
        this.commentNum = this.comments.length
      }).catch(() => {
        this.$message.error("There's something wrong with your network.");
      })
      this.commentNum = this.comments.length;
    },
    methods:{
      jumpToAdmin() {
        this.$router.push({ path: "/admin" });
      },
      seeVideo() {
        this.dialogVisible = true;
      },
      handleClose() {
        this.dialogVisible = false;
      },
      jumpTo(index) {
        if (index == 0) {
          // 直接下载数据库
          //alert("正在下载数据库中")
          this.downloadDatabaseVisible = true;
        } else if (index == 1) {
          this.$router.push({ path: "/finder" });
        } else {
          this.$router.push({ path: "/map" });
        }
      },
      //发送留言
      addComment() {
        //判断是否输入了FirstName
        if (this.firstname.length == 0) {
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

          //自己的数据添加
          this.comments.splice(0, 0, param)
          this.commentNum += 1

          //提醒添加成功
          this.$message({
            message: 'You have successfully commented!!',
            type: 'success'
          });

          //清空内容
          this.firstname = ''
          this.lastname = ''
          this.content = ''

          //跳转到评论区
          this.$refs["commentBoard"].scrollIntoView(true);

        }).catch((err) => {
          console.log(err);
          this.$message.error("There's something wrong with your network.");
        })
      },
      gotoStart() {
        this.$refs["start"].scrollIntoView(true);
      },

      handleDownload(index, row) {
        //console.log(index, row.table);

        window.open('files/database/'+row.table+'.csv')
      },

      downloadAllFiles(){
        window.open('files/database.zip')

      },

      current_change(publishedCurrentPage) {
        this.publishedCurrentPage = publishedCurrentPage;
      },
    },

    data() {
      return {
        downloadDatabaseVisible: false,
        firstname: '',
        lastname: '',
        content: '',
        publishedCurrentPage: 1,
        playerOptions: {
          playbackRates: [0.5, 1.0, 2.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: true, // 导致视频一结束就重新开始。
          preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: "zh-CN",
          aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [
            {
              type: "video/mp4",
              src: require("../assets/illustration.mp4"), //视频url地址
            },
          ],
          poster: require("../assets/illustrationHeader.png"), //你的封面地址
          // width: document.documentElement.clientWidth,
          notSupportedMessage: "The video cannot be wathed now. Please wait.", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true, //全屏按钮
          },
        },
        
        
        poster: require("../assets/illustrationHeader.png"), //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "The video cannot be wathed now. Please wait.", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, //全屏按钮
        },

      introduction: [
        {
          //highlight:'强调',
          title: 'Powerful Data Support',
          description: 'We store the cleaned dataset in a high-performance neo-4j graph database with efficient and fast query support.'
        },
        {
          //highlight:'强调',
          title: 'Visualization data flow',
          description: 'Our team implemented an end-to-end visual data flow, supporting the reading and importing of datasets and performing them on the front end.'
        }, {
          //highlight:'强调',
          title: 'Complete functional query',
          description: 'We completed the basic functional query and kept the query speed within the desired range, and the back-end used .NET to make a big query for the database.'
        }, {
          //highlight:'强调',
          title: 'Extra Credit: Storage System',
          description: 'We have improved the performance of the query through caching and other means, and the specific performance optimization means are described in detail in the documentation.'
        }, {
          //highlight:'强调',
          title: 'Extra Credit:Visualization',
          description: 'Our team has optimized and rewritten the presentation framework of the Knowledge Graph to improve the performance of the front-end, so that users can better view the search results.'
        }
      ],
      commentNum: 1,
      comments: [
        {
          firstName: 'Mingjie',
          lastName: "Wang",
          commentTime: '2021-09-02 22:35',
          commentContent: "It is really a great website, and I'm totoally obsseseed with it!"
        },
        {
          firstName: 'Jacky',
          lastName: "Li",
          commentTime: '2021-09-03 10:20',
          commentContent: "Your website definitely helps me a lot since I've been finding such a web for a long time."
        },
        {
          firstName: 'Ziniu',
          lastName: 'Niu',
          commentTime: '2021-09-04 01:44',
          commentContent: 'Your graph neo4j IS SO FUCKKKKKKKKKKING FUNNY!!'
        },
        {
          firstName: 'Liyou',
          lastName: 'Wang',
          commentTime: '2021-09-04 11:20',
          commentContent: 'A great website but will be better with some more beautiful picture.'
        },
        {
          firstName: '三丰',
          lastName: '张',
          commentTime: '2021-09-04 19:21',
          commentContent: '这个网站真的很赞，我真的哭死'
        },
        {
          firstName: 'Zihan',
          lastName: 'Zhang',
          commentTime: '2021-09-05 10:37',
          commentContent: 'Good website which helps me in an exam'
        },
      ],
      tableData: [
        {
          table: 'bacteria'
        },
        {
          table: 'bacteria_phage_score'
        },
        {
          table: 'bacteria_spacer'
        },
        {
          table: 'bacteria_taxon'
        },
        {
          table: 'bug_score_with_name'
        },
        {
          table: 'phage'
        },
        {
          table: 'phage_bug'
        },
        {
          table: 'result'
        },
        {
          table: 'score_bug'
        },
        {
          table: 'score_with_name'
        },
        {
          table: 'super_bug'
        }

      ],
      search: ''

    }
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

</style>
