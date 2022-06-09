<template>
  <div>
    <el-dialog
        title="Details"
        :visible.sync="dialogVisible"
        @close="dialogVisible=false;"
        width="25%"
        center
    >
      <div>
        <p>Species: {{ currentSpecies }}</p>
        <p>Name: {{ currentName }}</p>
        <p>Id: {{ currentId }}</p>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="newWindow()"> View {{ currentId }} on NCBI</el-button>
        <br><br>
        <el-button @click="dialogVisible = false"> Close</el-button>
      </div>
    </el-dialog>


    <!--width,height 画布的宽度，高度。 可以是百分比或像素，一般在dom元素上设置 -->
    <div v-if="showTable" sytle="text-align : center;">
      <div>
        <el-autocomplete
              class="input-with-select"
              style="width: 90%;margin-left: 5%;"
              v-model="searchText"
              :fetch-suggestions="querySearch1"
              :highlight-first-item="true"
              placeholder="Research Topic"
              @change="onAuthor1Change"
              @select="onAuthor1Change"
            >
          </el-autocomplete>
      </div>
      <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          empty-text="No result now"
          @selection-change="handleSelectionChange"
      >
        <el-table-column
            type="selection"
        >
        </el-table-column>
        <el-table-column
            prop="bugSeqId"
            label="Super Bug Sequence Id">
        </el-table-column>
        <el-table-column
            prop="name"
            label="Super Bug Name">
        </el-table-column>
        <el-table-column
            prop="bugId"
            label="Super Bug Id">
        </el-table-column>
        <el-table-column
            prop="txid"
            label="Taxon Id"
            width="200">
        </el-table-column>
      </el-table>

      <div id="network_id" class="network" slot="reference"
        
           style="height:80vh; background: linear-gradient(to bottom, #536976, #292E49);" :span="24"
      >
      
    </div>
    <el-image 
      :src="require('@/assets/tableBlank.png')"
      v-if="!selectedItems "
      style="margin-top:-150%;width: 50%;position:relative;"></el-image>
<!--v-if="!selectedItems "-->

    </div>

    <el-row 
    style="background: linear-gradient(to bottom, #536976, #292E49);" v-else>
      <el-col id="network_id_2" class="network"
      v-loading="loading"
      element-loading-text="Searching..."
      element-loading-background="rgba(0, 0, 0, 0.1)"
              style="height:80vh;" :span="15">
              
            </el-col>
      <el-image 
      :src="require('@/assets/finderBlank.png')"
      v-if="!canvasShown && !loading"
      style="margin-left: -130%;margin-top:20%;width: 30%;"></el-image>
      
      <!--控制栏-->
      <el-col :span="9" style="background: rgba(233,236,239,0.3)">
        <div style="text-align: left;height: 80vh;">
          <div 
          class="sub-title" style="line-height: 5vh;font-weight: bold;margin-left: 5%;margin-top: 3vh;">Searching
            Entity Condition
          </div>
          <div style="height: 30%;">
            <el-autocomplete
              class="input-with-select"
              style="width: 90%;margin-left: 5%;"
              v-model="searchText"
              :fetch-suggestions="querySearch1"
              :highlight-first-item="true"
              :placeholder="findCondition1 == '1'? 'Author name'
              :'Research topic'"
              @change="onAuthor1Change"
              @select="onAuthor1Change"
            >
              <el-select 
              v-model="findCondition1" 
              @change="onFindCondition1Change"
              slot="prepend" placeholder="Please choose">
                <el-option label="Author" value="1"></el-option>
                <el-option label="Topic" value="2"></el-option>
              </el-select>
            </el-autocomplete>
            <div style="font-size:x-large; 
            cursor:pointer; 
            margin-left: 50%;
            color: #FFFFFF;
            ">
              <em :class="isConnectionShow ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"
              @click="openConnectionSearch"
              ></em>
            </div>
            <div>
              <el-collapse-transition>
                <div v-show="isConnectionShow">
                  <el-autocomplete
                    v-model="writerName2"
                    :fetch-suggestions="querySearch2"
                    placeholder="Input another author name."
                    style="width: 90%;margin-left: 5%;"
                    @change="onAuthor2Change"
                    @select="onAuthor2Change"
                  ></el-autocomplete>
                </div>
              </el-collapse-transition>
            </div>
          </div>
          <el-button @click="searchQuery"
          type="primary"
          style="margin-left: 40%;"
          :loading="loading || author1PossibleListLoading || author2PossibleListLoading"
          plain icon="el-icon-search" round>
          Search</el-button>
          <div style="margin-left: 5%; margin-top: 10%;">
            <el-image src="https://wwwtypora.oss-cn-shanghai.aliyuncs.com/image-20220609173037207.png"
            style="width:25vw;"></el-image>
          </div>
        </div>
      </el-col>
      
      <el-col :span="9" style="background: rgba(233,236,239,0.3)"
      v-show="false">
        <!--控制栏-->
        <div style="text-align: left;height: 80vh;">
          <div 
          class="sub-title" style="line-height: 5vh;font-weight: bold;margin-left: 5%;margin-top: 3vh;">Searching
            Condition
          </div>

          <el-autocomplete
              class="input-with-select"
              style="width: 80%;margin-left: 5%;"
              v-model="searchText"
              :fetch-suggestions="querySearch"
              placeholder="Name, Seq id or Taxon id."
          >
            <el-select v-model="findCondition" slot="prepend" placeholder="Please choose">
              <el-option label="All Species" value="1"></el-option>
              <el-option label="Bacteria" value="2"></el-option>
              <el-option label="Phage" value="3"></el-option>
            </el-select>
          </el-autocomplete>

          <!--得分筛选-->
          <div class="sub-title" style="line-height: 5vh;font-weight: bold;margin-left: 5%;margin-top: 5vh;">Score</div>
          <el-input placeholder="Please input here" v-model="searchScore"
                    class="input-with-select"
                    style="width: 80%;margin-left: 5%;"
          >
            <el-select v-model="scoreCompare" slot="prepend" placeholder="Please choose">
              <el-option label="=" value="1"></el-option>
              <el-option label=">" value="2"></el-option>
              <el-option label="<" value="3"></el-option>
              <el-option label=">=" value="4"></el-option>
              <el-option label="<=" value="5"></el-option>
            </el-select>

          </el-input>

          <!--展示的结点数目-->
          <div class="sub-title" style="line-height: 5vh;font-weight: bold;margin-left: 5%;margin-top: 5vh;">Set number
            of display records
          </div>
          <el-input-number
              v-model="showNodeNumber"
              @change="handleChange"
              :min="1"
              :max="50"
              label="Node Number"
              style="margin-left: 20%;"
          ></el-input-number>

          <div style="margin-top: 5vh;margin-left: 5%;">

            <el-button
                type="primary"
                @click="clickSearch()"
                :disabled="searchText.length <= 3 || isSearching"
                plain icon="el-icon-search" round>Search
            </el-button>
            <el-button
                type="success" icon="el-icon-download"
                round @click="downloadFinderData"
                :disabled="responseData.length == 0"
            >Download
            </el-button>
          </div>

          <!--下面是介绍-->

          <div style="margin-top: 15%;margin-left: 8%;">
            <el-image :src="require('@/assets/tips.png')" style="width: 25vw;"></el-image>
          </div>
        </div>
      </el-col>
    </el-row>

    <!--作者选择界面-->
    <el-dialog
    width="90%"
    :title="'Choose the author [' + chooseAuthorDialog.authorName + 
    '] you\'re finding'"
    :visible.sync="isChoosingAuthor"
    :close-on-click-modal="false"
    append-to-body>
      <h4>There are {{chooseAuthorDialog.authorPossibleList.length}} authors named 
        {{chooseAuthorDialog.authorName}}, please choose:</h4>
      <!--表格-->
      <el-table
        :data="chooseAuthorDialog.authorPossibleList"
        element-loading-text="加载中"
        fit
        ref="authorSelectTable"
        highlight-current-row
        style="width: 100%"
        :max-height="400"
        @selection-change="handleAuthorSelectionChange"
      >
        <el-table-column
          type="selection"
          width="30">
        </el-table-column>
        <el-table-column align="center" label="Department">
          <template slot-scope="scope">
            <div v-if="scope.row.authorDepartments.length != 0">
              <el-tag type="primary" 
              v-for="(i,index) in scope.row.authorDepartments" 
              :key="index" effect="dark"
              :color="labelColor[index % 3]" :hit="true"
              >
              {{i}}
            </el-tag>
            </div>
            <span v-else>No data</span>

          </template>
        </el-table-column>
        <el-table-column align="center" label="Article">
          <template slot-scope="scope">
            <span v-if="scope.row.articleTitles != ''">
              <div v-for="(i,index) in scope.row.articleTitles"
              :key="index">
                ▲ {{formatLongStr(i, 50)}}
              </div>
            </span>
            <span v-else>No data</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Areas">
          <template slot-scope="scope">
            <div v-if="scope.row.areas.length != 0">
              <el-tag type="primary" 
              v-for="(i,index) in scope.row.areas" 
              :key="index" effect="dark"
              :color="labelColor[index % 3]" :hit="true"
              >
              {{formatLongStr(i, 20)}}
            </el-tag>
            </div>
            <span v-else>No data</span>
          </template>
        </el-table-column>
        
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="enterAuthor()"
          class="table_href"
          title="OK"
          :disabled="chooseAuthorDialog.selectedAuthor == ''"
          >OK</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Vis from "vis";
import {findWriterSuggestion, findAreaSuggestion} from '@/api/finder';
import {findAllMap, findAllBug} from '@/api/map';
import {findAuthorPapers, findAuthorCooperateAuthors,
  findCooperatePapers, getBriefAuthorsDescription,
  getAuthorDepartment, getAuthorNameById} from '@/api/author';
import {findAreaAuthors} from '@/api/area';
import 'font-awesome/css/font-awesome.css';

export default {
  name: 'ResultMap',
  props: {
    showTable: Boolean
  },
  data() {

    return {
      canvasShown: false,

      isSelectedFunctionInside: false,

      // 正在选择某一个具体的读者
      isChoosingAuthor: false,

      chooseAuthorDialog:{
        authorName: '',
        authorPossibleList: [],
        selectedAuthor:'',
      },

      // 关系查询开启
      isConnectionShow: false,

      // 检索条件
      findCondition1: "1",
      writerName2: "",

      // 远程搜索的第一个作者
      remoteWriterList: [],

      // 读者1的可能信息
      author1PossibleList: [],
      // 作者1可能列表加载
      author1PossibleListLoading: false,
      // 最终author1的index
      author1Index: "",

      selectedAuthorIndex: "1",

      // 远程搜索的领域
      remoteAreaList:[],
      
      // 远程搜索的另一个作者
      remoteAnotherAuthorList:[],

      // 读者2的可能信息
      author2PossibleList:[],
      author2PossibleListLoading: false,
      // 最终author2的index
      author2Index: "",

      // 关系筛选中的另一个作者
      writerName: '',


      labelColor:["#77C9D4","#57BC90","#015249"],
      //检索条件
      loading:false,
      selectedItems:false,
      currentSpecies: "",
      currentName: "",
      currentId: "",
      findCondition: "1",
      searchText: '',
      scoreCompare: "4",
      dialogVisible: false,
      searchScore: '0',
      showNodeNumber: 50,
      nodes: [],
      edges: [],
      // network:null,
      container: null,
      //   节点数组
      nodesArray: [],
      //   关系线数组
      edgesArray: [],
      options: {},
      data: {},
      //表格数据
      tableData: [],
      responseData: [],
      visData: [],
      expandedMAPNode: null,
      nodeMap: null,
      shownClusterId:[],
      searchSuggestion: "",
      isSearching: false
    };
  },
  created() {
    if (this.showTable) {
      this.findCondition1 = "2";
    }
    this.expandedMAPNode = new Set()
    this.nodeMap = new Map()
    this.options = {
      autoResize: true, //网络将自动检测其容器的大小调整，并相应地重绘自身
      locale: "cn", //语言设置：工具栏显示中文
      //设置语言
      locales: {
        cn: {
          //工具栏中文翻译
          edit: "编辑",
          del: "删除当前节点或关系",
          back: "返回",
          addNode: "添加节点",
          addEdge: "添加连线",
          editNode: "编辑节点",
          editEdge: "编辑连线",
          addDescription: "点击空白处可添加节点",
          edgeDescription: "点击某个节点拖拽连线可连接另一个节点",
          editEdgeDescription: "可拖拽连线改变关系",
          createEdgeError: "无法将边连接到集群",
          deleteClusterError: "无法删除集群.",
          editClusterError: "无法编辑群集'"
        }
      },

      // 设置节点样式
      nodes: {
        shape: "image",
        size: 15,
        shadow:{
          enabled: false,
          color: 'rgba(0,0,0,0.5)',
          size:10,
          x:5,
          y:5
        },
        font: {
          //字体配置
          size: 15,
          color: "#FFFFFF",
        },
        color: {
          border: "#f1e7ea", //节点边框颜色
          background: "#97C2FC", //节点背景颜色
          highlight: {
            //节点选中时状态颜色
            border: "#f1e7ea",
            background: "#D2E5FF"
          },
          hover: {
            //节点鼠标滑过时状态颜色
            border: "#f1e7ea",
            background: "#D2E5FF"
          }
        },
        borderWidth: 3, //节点边框宽度，单位为px
        borderWidthSelected: 5 //节点被选中时边框的宽度，单位为px
      },
      // 边线配置
      edges: {
        width: 3,
        length: 300,
        color: {
          color: "#f1e7ea",
          highlight: "#f1f7fa",
          hover: "#f1f7fa",
          inherit: "from",
          opacity: 1.0
        },
        shadow: true,
        smooth: {
          //设置两个节点之前的连线的状态
          enabled: true //默认是true，设置为false之后，两个节点之前的连线始终为直线，不会出现贝塞尔曲线
        },
        arrows: {to: true} //箭头指向to
      },
      //计算节点之前斥力，进行自动排列的属性
      physics: {
        enabled: true, //默认是true，设置为false后，节点将不会自动改变，拖动谁谁动。不影响其他的节点
        barnesHut: {
          gravitationalConstant: -4000,
          centralGravity: 0.3,
          springLength: 120,
          springConstant: 0.04,
          damping: 0.09,
          avoidOverlap: 0
        }
      },
      //用于所有用户与网络的交互。处理鼠标和触摸事件以及导航按钮和弹出窗口
      interaction: {
        dragNodes: true, //是否能拖动节点
        dragView: true, //是否能拖动画布
        hover: true, //鼠标移过后加粗该节点和连接线
        multiselect: true, //按 ctrl 多选
        selectable: true, //是否可以点击选择
        selectConnectedEdges: true, //选择节点后是否显示连接线
        hoverConnectedEdges: true, //鼠标滑动节点后是否显示连接线
        zoomView: true //是否能缩放画布
      },
      //操作模块:包括 添加、删除、获取选中点、设置选中点、拖拽系列、点击等等
      manipulation: {
        enabled: false, //该属性表示可以编辑，出现编辑操作按钮
        addNode: true,
        addEdge: true,
        editEdge: true,
        deleteNode: true,
        deleteEdge: true
      },
      layout: {
        improvedLayout: false
      }
    };
  },
  
  methods: {

    enterAuthor(){
      if (this.chooseAuthorDialog.selectedAuthor == "") {
        this.$message("Please choose an author!");
        return;
      }
      if (this.author1Index == "") {
        // 当前为作者1的选择环节
        this.author1Index = this.chooseAuthorDialog.selectedAuthor.authorIndex;
        
        // 确认是否需要进入作者2的选择环节
        if (this.isConnectionShow) {
          this.chooseAuthorDialog.authorName = this.writerName2;
          this.chooseAuthorDialog.authorPossibleList = this.author2PossibleList;
          this.chooseAuthorDialog.selectedAuthor = "";

          // 表单清空
          this.isSelectedFunctionInside = false;
          this.$refs.authorSelectTable.clearSelection();
        } else {
          // 开始搜索
          this.isChoosingAuthor = false;
          this.getSearchData();
        }
      } else {
        this.author2Index = this.chooseAuthorDialog.selectedAuthor.authorIndex;

        // 开始搜索
        this.isChoosingAuthor = false;
        this.getSearchData();
      }
    },

    // 清空上一轮的数据
    clearData(){
      this.author1Index = "";
      this.author2Index = "";
      this.chooseAuthorDialog = {
        authorName: '',
        authorPossibleList: [],
        selectedAuthor:'',
      };
      this.isSelectedFunctionInside = false;
      this.$refs.authorSelectTable.clearSelection();
    },

    handleAuthorSelectionChange(val){
      if (this.isSelectedFunctionInside) {
        return;
      }
      this.isSelectedFunctionInside = true;
      this.$refs.authorSelectTable.clearSelection();
      if (val.length >= 1) {
        // 保留最后一个
        val = val[val.length - 1];
        this.$refs.authorSelectTable.toggleRowSelection(val);
        this.chooseAuthorDialog.selectedAuthor = val;
      } else {
        this.chooseAuthorDialog.selectedAuthor = "";
      }
      this.isSelectedFunctionInside = false;
    },

    onAuthor1Change(value){
      // 当作者1被改变时
      this.author1Index = "";
      this.author1PossibleListLoading = true;
      if (typeof value != 'string') {
          value = value.value;
      }
      if (value == "") {
        this.author1PossibleList = [];
        this.author1PossibleListLoading = false;
        return;
      }
      getBriefAuthorsDescription(value).then(response=>{
        this.author1PossibleList = response.data;
      }).catch(error=>{
        this.$message.error("There's something wrong with your network.");
      }).finally(()=>{
        this.author1PossibleListLoading = false;
      })
    },

    onAuthor2Change(value) {
      // 当作者2被改变时
      this.author2Index = "";
      this.author2PossibleListLoading = true;
      if (typeof value != 'string') {
          value = value.value;
      }
      if (value == "") {
        this.author2PossibleList = [];
        this.author2PossibleListLoading = false;
        return;
      }
      getBriefAuthorsDescription(value).then(response=>{
        this.author2PossibleList = response.data;
      }).catch(error=>{
        this.$message.error("There's something wrong with your network.");
      }).finally(()=>{
        this.author2PossibleListLoading = false;
      })
    },


    searchQuery(){

      // 空列表优先判断
      if (this.findCondition1 == "1" && this.author1PossibleList.length == 0){
        this.$message('No author named ' + this.searchText);
        return;
      }

      if (this.isConnectionShow && this.author2PossibleList.length == 0) {
        this.$message('No author named ' + this.writerName2);
        return;
      }

      this.author1Index = "";
      this.author2Index = "";

      // 作者1的详细选择
      if (this.findCondition1 == "1") {
        // 如果有多个作者，并且还没有选择过具体哪一位作者
        if (this.author1PossibleList.length > 1 ) {
          // 打开数据选择界面
          this.chooseAuthorDialog.authorName = this.searchText;
          this.chooseAuthorDialog.authorPossibleList = this.author1PossibleList;
          this.chooseAuthorDialog.selectedAuthor = "";
          this.isChoosingAuthor = true;
          return;
        } else {
          this.author1Index = this.author1PossibleList[0].authorIndex;
        }
        // 作者2的考虑
        if (this.isConnectionShow  ) {
          if (this.author2PossibleList.length > 1) {
            // 打开数据选择界面
            this.chooseAuthorDialog.authorName = this.writerName2;
            this.chooseAuthorDialog.authorPossibleList = this.author2PossibleList;
            this.chooseAuthorDialog.selectedAuthor = "";
            this.isChoosingAuthor = true;
            return;
          } else {
            this.author2Index = this.author2PossibleList[0].authorIndex;
          }
          
        }
      }
      this.getSearchData();
    },

    getSearchData(){
      this.loading = true;
      this.container = document.getElementById("network_id_2");
      

      if (this.isConnectionShow) {
        // 双条件查询
        this.cooperateAuthorsSearch();
      } else if (this.findCondition1 == "1") {
        // 作者实体查询
        this.singleAuthorSearch();
      } else {
        // 领域实体查询
        this.singleAreaSearch();
      }
    },
    
    formatLongStr(content, len = 10) {
      return content.slice(0, len) + 
              (content.length > len ? "...": "")
    },
    
    /**
     * 单作者查询
     * */
    singleAuthorSearch(){
      /*
      此处进行选择作者的弹窗提醒
      */

      // 上一轮数据清空
      this.nodesArray.splice(0, this.nodesArray.length);
      this.edgesArray.splice(0, this.edgesArray.length);

      // 核心作者结点
      this.nodesArray.push({
        // id
        id: "a" + this.author1Index, 
        // 作者名
        label: this.formatLongStr(this.searchText), 
        color: {
          background: '#f57797',
          highlight: "#fbc7d4",
          hover: "#fbc7d4"
        },
        icon: { face: 'FontAwesome', code: '\uf2bc', weight: 5, size: 40, color:'#2B7CE9' },
        image: 'https://wwwtypora.oss-cn-shanghai.aliyuncs.com/icons8-man-64.png'
        
      });

      // 所有请求同时发出
      Promise.all([
        findAuthorPapers(this.author1Index),
        findAuthorCooperateAuthors(this.author1Index),
        getAuthorDepartment(this.author1Index)
      ]).then(result => {
        console.log(result);

        /*处理论文数据*/
        result[0].data.forEach((item, index)=>{
          this.nodesArray.push({
            id: 'p' + item.index, 
            // title，只显示一部分信息
            label:this.formatLongStr(item.paper_title),
            description: item,
            color: {
              background: '#f57797',
              highlight: "#fbc7d4",
              hover: "#fbc7d4"
            },
            icon: { face: 'FontAwesome', code: '\uf2bc', weight: 5, size: 40, color:'#2B7CE9' },
            image: 'https://wwwtypora.oss-cn-shanghai.aliyuncs.com/icons8-paper-64.png'
          });

          // 结点和边相连
          this.edgesArray.push({
            from: "a" + this.author1Index,
            to: 'p' + item.index,
            label: "Write",
          });
        });

        /*处理合作作者关系*/
        result[1].data.forEach((item, index)=>{
          this.nodesArray.push({
            id: 'c' + item.index, 
            // title，只显示一部分信息
            label: this.formatLongStr(item.name),
            description: item,
            color: {
              background: '#f57797',
              highlight: "#fbc7d4",
              hover: "#fbc7d4"
            },
            icon: { face: 'FontAwesome', code: '\uf2bc', weight: 5, size: 40, color:'#2B7CE9' },
            image: 'https://wwwtypora.oss-cn-shanghai.aliyuncs.com/icons8-woman-64.png'
          });

          // 结点和边相连
          this.edgesArray.push({
            from: "a" + this.author1Index,
            to: 'c' + item.index,
            type: "bar",
            arrows: {to: false},
            label: "Cooperate",
          });
        });

        /*处理作者所属部门*/
        result[2].data.forEach((item, index)=>{
          this.nodesArray.push({
            id: 'd' + item, 
            // title，只显示一部分信息
            label: this.formatLongStr(item),
            description: item,
            color: {
              background: '#f57797',
              highlight: "#fbc7d4",
              hover: "#fbc7d4"
            },
            icon: { face: 'FontAwesome', code: '\uf2bc', weight: 5, size: 40, color:'#2B7CE9' },
            image: 'https://wwwtypora.oss-cn-shanghai.aliyuncs.com/icons8-school-64.png'
          });

          // 结点和边相连
          this.edgesArray.push({
            from: "a" + this.author1Index,
            to: 'd' + item,
            type: "bar",
            label: "Belongs",
          });
        })

        // 最后配置
        this.canvasShown = true;

        // 网络初始化
        this.network = 
          new Vis.Network(this.container, {
            nodes: this.nodesArray,
            edges: this.edgesArray,
          }, this.options);

        // 点击
        this.network.on("click", params => {
          params.event.preventDefault();
          if (params.nodes.length == 0) {
            return;
          }
          const nodeId = params.nodes[0];
          if (nodeId && nodeId.length > 0 && nodeId[0] == 'c') {
            const searchAuthorId = nodeId.slice(1);
            // 获取作者名称
            getAuthorNameById(searchAuthorId).then(response=>{
              const newAuthorName = response.data;
              // 关闭
              this.$confirm('Search for author: '+ newAuthorName+ '?', 'Confirmation', {
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                type: 'warning'
              }).then(() => {
                // 以该作者进行搜索
                this.author1Index = searchAuthorId;
                this.searchText = newAuthorName;
                this.findCondition1 = '1';
                this.isConnectionShow = false;
                this.singleAuthorSearch();
              }).catch(() => {

              }) 
            })
          }
        });

      }).catch((err)=>{
        console.log(err)
        this.$message.error("There's something wrong with your network.");
      }).finally(()=>{
        this.loading = false;
      })


      //image: 'https://wwwtypora.oss-cn-shanghai.aliyuncs.com/QQ%E6%88%AA%E5%9B%BE20220601191216.png',

      // 获取所有相连的论文

    },

    /**
     * 单领域查询
     * */
    singleAreaSearch(){
      // 当前所选择的领域
      const searchArea = this.searchText;
      // 上一轮数据清空
      this.nodesArray.splice(0, this.nodesArray.length);
      this.edgesArray.splice(0, this.edgesArray.length);
      // 查询领域作者
      findAreaAuthors(searchArea).then(response=>{
        if (response.data.length == 0) {
          this.$message('No such area.');
          return;
        }
        // 添加中心结点
        this.nodesArray.push({
          // id
          id: searchArea, 
          // 作者名
          label: searchArea, 
          color: {
            background: '#f57797',
            highlight: "#fbc7d4",
            hover: "#fbc7d4"
          },
          icon: { face: 'FontAwesome', code: '\uf2bc', weight: 5, size: 40, color:'#2B7CE9' },
          image: 'https://wwwtypora.oss-cn-shanghai.aliyuncs.com/icons8-object-96.png'
        });

        

        const authorSearchTask  = response.data.map(item => {
          // 加入author结点
          this.nodesArray.push({
            // id
            id: "a" + item.index, 
            // 作者名
            label: this.formatLongStr(item.name), 
            color: {
              background: '#f57797',
              highlight: "#fbc7d4",
              hover: "#fbc7d4"
            },
            icon: { face: 'FontAwesome', code: '\uf2bc', weight: 5, size: 40, color:'#2B7CE9' },
            image: 'https://wwwtypora.oss-cn-shanghai.aliyuncs.com/icons8-man-64.png'
          });

          // 添加中心结点到author的联系
          this.edgesArray.push({
            from: "a" + item.index,
            to: searchArea,
            label: "Search",
          });

          // 根据authorIndex查询
          return findAuthorPapers(item.index);
        });

        // 论文数超过10的作者信息
        let tooManyPaperAuthors = [];

        Promise.all(authorSearchTask).then(result => {
          console.log(result);
          result.forEach((item, index)=>{
            // 只展示该读者的前10篇论文
            const paperList = item.data.slice(0,10);

            paperList.forEach((paper) => {
              // 绘制结点
              this.nodesArray.push({
                id: 'p' + paper.index, 
                // title，只显示一部分信息
                label:this.formatLongStr(paper.paper_title),
                description: paper,
                color: {
                  background: '#f57797',
                  highlight: "#fbc7d4",
                  hover: "#fbc7d4"
                },
                icon: { face: 'FontAwesome', code: '\uf2bc', weight: 5, size: 40, color:'#2B7CE9' },
                image: 'https://wwwtypora.oss-cn-shanghai.aliyuncs.com/icons8-paper-64.png'
              });

              // 结点和边相连
              this.edgesArray.push({
                from: "a" + response.data[index].index,
                to: 'p' + paper.index,
                label: "Write",
              });
            })
          })

          // 最后配置
          this.canvasShown = true;

          // 网络初始化
          this.network = 
            new Vis.Network(this.container, {
              nodes: this.nodesArray,
              edges: this.edgesArray,
            }, this.options);
          
            this.network.on("click", params => {
              params.event.preventDefault();
              if (params.nodes.length == 0) {
                return;
              }
              const nodeId = params.nodes[0];
              if (nodeId && nodeId.length > 0 && nodeId[0] == 'a') {
                const searchAuthorId = nodeId.slice(1);
                // 获取作者名称
                getAuthorNameById(searchAuthorId).then(response=>{
                  const newAuthorName = response.data;
                  // 关闭
                  this.$confirm('Search for author: '+ newAuthorName+ '?', 'Confirmation', {
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    type: 'warning'
                  }).then(() => {
                    // 以该作者进行搜索
                    this.author1Index = searchAuthorId;
                    this.searchText = newAuthorName;
                    this.findCondition1 = '1';
                    this.isConnectionShow = false;
                    this.singleAuthorSearch();
                  }).catch(() => {

                  }) 
                })
              }
            });

        })
        
        
      }).catch((err)=>{
        console.log(err)
        this.$message.error("There's something wrong with your network.");
      }).finally(()=>{
        this.loading = false;
      })
    },

    /**
     * 两个作者联合查询
     **/
    cooperateAuthorsSearch(){
      if (this.author1Index == this.author2Index) {
        this.$message('You cannot choose two same authors!');
        this.loading = false;
        return;
      }

      // 上一轮数据清空
      this.nodesArray.splice(0, this.nodesArray.length);
      this.edgesArray.splice(0, this.edgesArray.length);

      // 添加两个作者结点
      this.nodesArray.push({
        // id
        id: "a" + this.author1Index, 
        // 作者名
        label: this.searchText, 
        color: {
          background: '#f57797',
          highlight: "#fbc7d4",
          hover: "#fbc7d4"
        },
        icon: { face: 'FontAwesome', code: '\uf2bc', weight: 5, size: 40, color:'#2B7CE9' },
        image: 'https://wwwtypora.oss-cn-shanghai.aliyuncs.com/icons8-man-64.png'
      });
      this.nodesArray.push({
        // id
        id: "a" + this.author2Index, 
        // 作者名
        label: this.querySearch2, 
        color: {
          background: '#f57797',
          highlight: "#fbc7d4",
          hover: "#fbc7d4"
        },
        icon: { face: 'FontAwesome', code: '\uf2bc', weight: 5, size: 40, color:'#2B7CE9' },
        image: 'https://wwwtypora.oss-cn-shanghai.aliyuncs.com/icons8-man-64.png'
      });
    
      // 查询两个作者共同发表的论文
      findCooperatePapers(this.author1Index, this.author2Index).then(response=>{
        const cooperatePapers = response.data;
        if (cooperatePapers.length == 0) {
          this.$message('These 2 authors have no cooperate papers.');
          return;
        }

        cooperatePapers.forEach(paper => {
          // 绘制结点
          this.nodesArray.push({
            id: 'p' + paper.index, 
            // title，只显示一部分信息
            label:this.formatLongStr(paper.paper_title),
            description: paper,
            color: {
              background: '#f57797',
              highlight: "#fbc7d4",
              hover: "#fbc7d4"
            },
            icon: { face: 'FontAwesome', code: '\uf2bc', weight: 5, size: 40, color:'#2B7CE9' },
            image: 'https://wwwtypora.oss-cn-shanghai.aliyuncs.com/icons8-paper-64.png'
          });

          // 结点和边相连
          this.edgesArray.push({
            from: "a" + this.author1Index,
            to: 'p' + paper.index,
            label: "Write",
          });
          this.edgesArray.push({
            from: "a" + this.author2Index,
            to: 'p' + paper.index,
            label: "Write",
          });
        })

        // 绘制作者以及合作论文
        this.canvasShown = true;

        // 网络初始化
        this.network = 
          new Vis.Network(this.container, {
            nodes: this.nodesArray,
            edges: this.edgesArray,
          }, this.options);
        

          this.network.on("click", params => {
              params.event.preventDefault();
              if (params.nodes.length == 0) {
                return;
              }
              const nodeId = params.nodes[0];
              if (nodeId && nodeId.length > 0 && nodeId[0] == 'a') {
                const searchAuthorId = nodeId.slice(1);
                // 获取作者名称
                getAuthorNameById(searchAuthorId).then(response=>{
                  const newAuthorName = response.data;
                  // 关闭
                  this.$confirm('Search for author: '+ newAuthorName+ '?', 'Confirmation', {
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    type: 'warning'
                  }).then(() => {
                    // 以该作者进行搜索
                    this.author1Index = searchAuthorId;
                    this.searchText = newAuthorName;
                    this.findCondition1 = '1';
                    this.isConnectionShow = false;
                    this.singleAuthorSearch();
                  }).catch(() => {

                  }) 
                })
              }
            });
        

      }).catch((err)=>{
        console.log(err)
        this.$message.error("There's something wrong with your network.");
      }).finally(()=>{
        this.loading = false;
      })
    },

    onFindCondition1Change(value){
      if (this.value != "1") {
        this.isConnectionShow =false;
      }
    },
    querySearch1(key, cb){
      // 根据key进行远程检索
      if (key == "") {
        key = "A";
      }
      if (this.findCondition1 == "1") {
        // 作者姓名的远程获取
        findWriterSuggestion(key).then(response => {
          console.log(response);
          this.remoteWriterList = response.data;
          // 回调作者的名称
          cb(response.data.map((item)=>{
            return {"value": item.name, "label": item.name + " " + item.authorIndex};
          }));
        }).catch(error=>{
          this.$message.error("There's something wrong with your network.");
        })
      } else if (this.findCondition1 == "2") {
        // 领域的远程搜索
        findAreaSuggestion(key).then(response => {
          this.remoteAreaList = response.data;
          cb(response.data.map((item)=>{
            return {"value": item};
          }));
        }).catch(()=>{
          this.$message.error("There's something wrong with your network.");
        })
      }
    },

    querySearch2(key, cb) {
      if (key == "") {
        key = "A";
      }
      findWriterSuggestion(key).then(response => {
        console.log(response);
        this.remoteAnotherAuthorList = response.data;
        // 回调作者的名称
        cb(response.data.map((item)=>{
          return {"value": item.name, "label": item.name + " " + item.authorIndex};
        }));
      }).catch(error=>{
        this.$message.error("There's something wrong with your network.");
      })
    },

    openConnectionSearch() {
      if (this.isConnectionShow) {
        this.isConnectionShow = false;
        return;
      }

      if (this.findCondition1 != "1"){
        this.$message({
          message: 'Connection search can only be used when condition is writer!',
          type: 'warning'
        });
        return;
      }
      this.isConnectionShow = true;
    },

    // 展示图表



    downloadFinderData() {
      console.log(this.responseData)
      if (!this.responseData.length)
        return;
      var blob = new Blob([this.responseDataToString(this.responseData)], {type: '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'});
      console.log(blob);

      const url3 = window.URL.createObjectURL(blob);
      console.log(url3);
      var filename = 'searchResult' + '.csv';
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = url3;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    },

    responseDataToString(data) {
      if (data.length == 0) {
        return ""
      }
      var temp = "bacteriaGenebankId,bacteriaSeqNcbiId,bacteriaTaxonId,phageId,phageTaxonId,blastScore,phpScore,thirdScore,score,bacteriaName,phageScientificName\n"
      for (let j = 0; j < data.length; j++) {
        let i = data[j]
        temp += i.genebankId + ','
        temp += i.seqNcbiId + ','
        temp += i.bacteriaTxid + ','
        temp += i.phageId + ','
        temp += i.phageTxid + ','
        temp += i.blastScore + ','
        temp += i.phpScore + ','
        temp += i.score + ','
        temp += i.thirdScore + ','
        temp += i.name + ','
        temp += i.scientificName + ','
        temp += '\n'
      }
      return temp;
    },

    newWindow() {
      window.open("https://www.ncbi.nlm.nih.gov/search/all/?term=" + this.currentId);
    },

    querySearch(key, cb) {
      var path = "/all";
      if (this.findCondition === 2) path = "/bacteria";
      else if (this.findCondition === 3) path = "/phage";

      findSuggestion(path, key, 1)
      .then( response => {
        console.log(response.data);
        var result = []
        for (let i = 0; i < response.data.length; i++) {
          result.push({"value": response.data[i].name })
        }
        cb(result)
      }, error => {
        console.log(error)
      })
    },

    selectScore(score, score_limit = Number.NEGATIVE_INFINITY) {
      /*
      <el-option label="=" value="1"></el-option>
      <el-option label=">" value="2"></el-option>
      <el-option label="<" value="3"></el-option>
      <el-option label=">=" value="4"></el-option>
      <el-option label="<=" value="5"></el-option>
      */

      switch (Number(this.scoreCompare)) {
        case 1:
          return score == score_limit;
        case 2:
          return score > score_limit;
        case 3:
          return score < score_limit;
        case 4:
          return score >= score_limit;
        case 5:
          return score <= score_limit;
        default:
          return score >= score_limit;
      }
    },

    selectCondition() {
      /*
      <el-option label="All Species" value="1"></el-option>
      <el-option label="Bacteria" value="2"></el-option>
      <el-option label="Phage" value="3"></el-option>
      */
      

    },

    initializeOptions() {
      let _this = this;
      //1.创建一个nodes数组
      _this.nodes = new Vis.DataSet(_this.nodesArray);
      //2.创建一个edges数组
      _this.edges = new Vis.DataSet(_this.edgesArray);

      if (this.showTable == true) {
        _this.container = document.getElementById("network_id");
      } else {
        _this.container = document.getElementById("network_id_2");
      }

      _this.data = {
        nodes: _this.nodes,
        edges: _this.edges
      };
      _this.options = {
        autoResize: true, //网络将自动检测其容器的大小调整，并相应地重绘自身
        locale: "cn", //语言设置：工具栏显示中文
        //设置语言
        locales: {
          cn: {
            //工具栏中文翻译
            edit: "编辑",
            del: "删除当前节点或关系",
            back: "返回",
            addNode: "添加节点",
            addEdge: "添加连线",
            editNode: "编辑节点",
            editEdge: "编辑连线",
            addDescription: "点击空白处可添加节点",
            edgeDescription: "点击某个节点拖拽连线可连接另一个节点",
            editEdgeDescription: "可拖拽连线改变关系",
            createEdgeError: "无法将边连接到集群",
            deleteClusterError: "无法删除集群.",
            editClusterError: "无法编辑群集'"
          }
        },

        // 设置节点样式
        nodes: {
          shape: "circle",
          size: 15,
          font: {
            //字体配置
            size: 15
          },
          color: {
            border: "#f1e7ea", //节点边框颜色
            background: "#97C2FC", //节点背景颜色
            highlight: {
              //节点选中时状态颜色
              border: "#f1e7ea",
              background: "#D2E5FF"
            },
            hover: {
              //节点鼠标滑过时状态颜色
              border: "#f1e7ea",
              background: "#D2E5FF"
            }
          },
          borderWidth: 3, //节点边框宽度，单位为px
          borderWidthSelected: 5 //节点被选中时边框的宽度，单位为px
        },
        // 边线配置
        edges: {
          width: 3,
          length: 300,
          color: {
            color: "#f1e7ea",
            highlight: "#f1f7fa",
            hover: "#f1f7fa",
            inherit: "from",
            opacity: 1.0
          },
          shadow: true,
          smooth: {
            //设置两个节点之前的连线的状态
            enabled: true //默认是true，设置为false之后，两个节点之前的连线始终为直线，不会出现贝塞尔曲线
          },
          arrows: {to: true} //箭头指向to
        },
        //计算节点之前斥力，进行自动排列的属性
        physics: {
          enabled: true, //默认是true，设置为false后，节点将不会自动改变，拖动谁谁动。不影响其他的节点
          barnesHut: {
            gravitationalConstant: -4000,
            centralGravity: 0.3,
            springLength: 120,
            springConstant: 0.04,
            damping: 0.09,
            avoidOverlap: 0
          }
        },
        //用于所有用户与网络的交互。处理鼠标和触摸事件以及导航按钮和弹出窗口
        interaction: {
          dragNodes: true, //是否能拖动节点
          dragView: true, //是否能拖动画布
          hover: true, //鼠标移过后加粗该节点和连接线
          multiselect: true, //按 ctrl 多选
          selectable: true, //是否可以点击选择
          selectConnectedEdges: true, //选择节点后是否显示连接线
          hoverConnectedEdges: true, //鼠标滑动节点后是否显示连接线
          zoomView: true //是否能缩放画布
        },
        //操作模块:包括 添加、删除、获取选中点、设置选中点、拖拽系列、点击等等
        manipulation: {
          enabled: false, //该属性表示可以编辑，出现编辑操作按钮
          addNode: true,
          addEdge: true,
          editEdge: true,
          deleteNode: true,
          deleteEdge: true
        },
        layout: {
          improvedLayout: false
        }
      };

      //console.log("container:",this.container);
      //console.log("data:",this.data);
      //console.log("options:",this.options);

      this.network = new Vis.Network(this.container, this.data, this.options);

      this.network.on("click", params => {
        params.event.preventDefault();
        let nodeId = this.network.getNodeAt(params.pointer.DOM);
        if (nodeId !== undefined) {
          this.network.selectNodes([nodeId]);
          let sNode = this.network.getSelectedNodes()[0];
          let name = this.nodesArray[sNode].label.replace(/\n/g, ' ');

          console.log(name.substr(0, 13))
          if (name.substr(0, 13) === "Phage Cluster") {
            console.log(name[14])
            if (this.expandedMAPNode.has(name[14])) {
              return;
            } else {
              this.expendMAPVis(this.expendMAPVis(name.substr(14)))
              this.expandedMAPNode.add(name.substr(14))
              // this.initializeOptions();
            }
          }
        }
      })

      this.network.on("oncontext", params => {
        let nodeId = this.network.getNodeAt(params.pointer.DOM);
        if (nodeId != undefined) {
          params.event.preventDefault();
          this.network.selectNodes([nodeId]);
          let sNode = this.network.getSelectedNodes()[0];

          let name = this.nodesArray[sNode].label.replace(/\n/g, ' ');

          if (name.substr(0, 13) == "Phage Cluster")
            return;

          this.currentSpecies = "";
          this.currentName = "";
          this.currentId = "";

          for (let i in this.visData) {
            let item = this.visData[i];
            if (name === item.phageName) {
              this.currentSpecies = "Phage";
              this.currentName = item.phageName;
              this.currentId = item.phageId;
              break;
            }
            if (name === item.scientificName) {
              this.currentSpecies = "Phage";
              this.currentName = item.scientificName;
              this.currentId = item.phageId;
              break;

            }
            if (name === item.name) {
              this.currentSpecies = "Bacteria";
              this.currentName = item.name;
              this.currentId = item.genebankId;
              break;
            }
            if (name === item.superBugName) {
              this.currentSpecies = "Super Bug";
              this.currentName = item.superBugName;
              this.currentId = item.bugSeqId;
              break;
            }
          }

          this.dialogVisible = true;
        }
      });
    },

    init() {
    },

    resetAllNodes() {
      this.nodes.clear();
      this.edges.clear();
      this.nodes.add(this.nodesArray);
      this.edges.add(this.edgesArray);
      this.data = {
        nodes: this.nodes,
        edges: this.edges
      };
      //   network是一种用于将包含点和线的网络和网络之间的可视化展示
      this.network = new Vis.Network(
          this.container,
          this.data,
          this.options
      );
    },
    resetAllNodesStabilize() {
      this.resetAllNodes();
      this.network.stabilize();
    },

    handleSelectionChange(selected) {
      //清空展出项目
      this.shownClusterId= [];
      

      console.log(selected);
      this.selectedItems = selected.length!=0;
      this.visData = [];
      for (let i in selected) {
        let bug = selected[i];

        for (let j in this.responseData) {
          let relation = this.responseData[j];

          if (relation.superBugTxid === bug.txid) {
            this.visData.push(relation);
          }
        }
      }
      this.drawMapVis(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY);
      this.initializeOptions();
    },
    handleChange() {
      this.drawFinderVis(this.showNodeNumber, this.searchScore);
      this.initializeOptions();

    },

    drawMapVis(data_limit = 50, score_limit = Number.NEGATIVE_INFINITY) {

      let mapdata = {
        nodes: [],
        edges: [],
        nodesArray: [],
        edgesArray: [],
      };
      let genbank_set = new Set();
      let phage_set = new Set();

      data_limit = Number(data_limit);
      score_limit = Number(score_limit);


      let data_num = 0;
      for (let i in this.visData) {

        let item = this.visData[i];

        if (this.selectScore(item.score, score_limit) == false) {
          continue;
        }

        data_num = data_num + 1;
        genbank_set.add(item.superBugName);
        phage_set.add("Phage Cluster " + item.phageClusterId);

        if (data_num >= data_limit) {
          break;
        }
      }

      let genbank_map = new Map()
      let phage_map = new Map()
      let cnt = 0;
      for (let i of genbank_set) {
        genbank_map.set(i, cnt);
        cnt = cnt + 1
      }
      for (let i of phage_set) {
        phage_map.set(i, cnt);
        this.nodeMap.set(i, cnt)
        cnt = cnt + 1
      }


      for (let [k, v] of genbank_map) {
        mapdata.nodesArray.push({
          id: v, label: k.replace(/ /g, '\n'),
          color: {
            background: "#7574eb",
            highlight: "#b9b8f5",
            hover: "#b9b8f5"
          }
        })
      }

      for (let [k, v] of phage_map) {
        mapdata.nodesArray.push({
          id: v, label: k.replace(/ /g, '\n'),
          color: {
            background: '#f57797',
            highlight: "#fbc7d4",
            hover: "#fbc7d4"
          }
        })
      }

      data_num = 0;

      let record_map = new Set()

      for (let i in this.visData) {
        let item = this.visData[i];

        if (this.selectScore(item.score, score_limit) == false) {
          continue;
        }

        data_num = data_num + 1;

        let g_id = genbank_map.get(item.superBugName);
        let p_id = phage_map.get("Phage Cluster " + item.phageClusterId);
        if (record_map.has(g_id + p_id)) {
          continue;
        } else {
          record_map.add(g_id + p_id)
        }

        //console.log("score",len);
        mapdata.edgesArray.push({from: g_id, to: p_id})

        if (data_num >= data_limit) {
          break;
        }

      }
      this.edgesArray = mapdata.edgesArray;
      this.nodesArray = mapdata.nodesArray;
      this.nodes = [];
      this.edges = [];
    },

    expendMAPVis(clusterId) {
      //判断是否已经被展开
      for(let i=0;i<this.shownClusterId.length;++i){
        if(this.shownClusterId[i]==clusterId){
          return;
        }
      }

      let phage_set = new Set();

      for (let i in this.visData) {

        let item = this.visData[i];

        if (item.phageClusterId == clusterId) {
          phage_set.add(item.phageName);
        }
      }

      let phage_map = new Map()

      let cnt = this.nodes.length;
      for (let i of phage_set) {
        phage_map.set(i, cnt);
        cnt = cnt + 1
      }

      

      for (let [k, v] of phage_map) {
        this.nodes.add({
          id: v, label: k.replace(/ /g, '\n'), color: {
            background: '#f57797',
            highlight: "#fbc7d4",
            hover: "#fbc7d4"
          }
        })
        this.nodesArray.push({
          id: v, label: k.replace(/ /g, '\n'), color: {
            background: '#f57797',
            highlight: "#fbc7d4",
            hover: "#fbc7d4"
          }
        })
      }

      

      let from = this.nodeMap.get("Phage Cluster " + clusterId)
      this.shownClusterId.push(clusterId)

      for (let i in this.visData) {
        let item = this.visData[i];

        let p_id = phage_map.get(item.phageName);
        let len = item.score;

        //console.log("score",len);
        this.edges.add({from: from, to: p_id, label: len.toString()})
        this.edgesArray.push({from: from, to: p_id, label: len.toString()})

      }
      // this.edgesArray=mapdata.edgesArray;
      // this.nodesArray=mapdata.nodesArray;
      // this.nodes=[];
      // this.edges=[];
    },


    drawFinderVis(data_limit = 50, score_limit = Number.NEGATIVE_INFINITY) {

      
    },

    requestMapDate(str, find, func = () => {
                   },
                   data_limit = 50, score_limit = Number.NEGATIVE_INFINITY) {
      this.isSearching = true;
      if (this.showTable == true) {
        findAllBug().then(response => {
          this.tableData = response.data;
          this.$refs.multipleTable.toggleRowSelection([this.tableData[0]])
          this.loading = false;
        }).catch((error) => {
          //this.$message.error("There's something wrong with your network.");
          console.log("请求错误:" + error.toString());
        });
      } else {
       
      }

    },
    //处理搜索内容
    clickSearch() {
      //加载
      this.loading = true;

      //清空上一轮的搜索结果
      this.edgesArray = [];
      this.nodesArray = [];
      this.initializeOptions();
      console.log("searching:", this.searchText);
      console.log("limit of search result:", this.showNodeNumber, this.searchScore, this.scoreCompare);
      this.requestMapDate(this.searchText, this.selectCondition(), this.initializeOptions, this.showNodeNumber, this.searchScore);

    }
  },

  mounted() {
    this.init();
  }
};
</script>
<style lang="less">

</style>

<style>
.el-select .el-input {
  width: 130px;
}
body {
    margin: 0;
  }
</style>

<style scoped>
/* 标签列表 */
.label-list{
    padding:1px 1px;
    margin:1px 1px ;
}
.el-tag{
    float:left;
    white-space: pre-line;
    word-break: break-all;
    margin-top: 5px;
    margin-left: 5px;
    max-height: 4vh;
    color:white;
}

</style>