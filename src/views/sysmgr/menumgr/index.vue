<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select clearable class="filter-item" style="width: 130px" placeholder="站点">
        <!--<el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">-->
        <!--</el-option>-->
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>

    <el-row :gutter="20">
      <el-col :span="12">
        <div class="tree-content">
          <el-tree ref="expandMenuList" class="expand-tree"
                   v-if="isLoadingTree"
                   :data="treeData"
                   node-key="id"
                   highlight-current
                   :props="defaultProps"
                   :expand-on-click-node="false"
                   :render-content="renderContent"
                   default-expand-all
                   @node-click="handleNodeClick"></el-tree>
        </div>
      </el-col>
      <el-col :span="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>菜单详情</span>
          </div>
          <el-form label-position="left" label-width="80px" :model="formMenuDetail">
            <el-form-item label="ID">
              <el-input v-model="formMenuDetail.id"></el-input>
            </el-form-item>
            <el-form-item label="菜单名称"
                          :rules="{required: true, message: '菜单名称不能为空', trigger: 'blur'}">
              <el-input v-model="formMenuDetail.name"></el-input>
            </el-form-item>
            <el-form-item label="路径">
              <el-input v-model="formMenuDetail.region"></el-input>
            </el-form-item>
            <el-form-item label="排序">
              <el-input v-model="formMenuDetail.type"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" v-waves>保存</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>
<!-- VUE饿了么树形控件添加增删改功能按钮 -->
<script>
import { fetchList, createMenuItem, updateMenuItem } from '@/api/menumgr';
import TreeRender from './tree_render'
import api from './api'
import waves from '@/directive/waves' // 水波纹指令

  export default{
    name: 'menumgr',
    directives: {
      waves
    },
    data(){
      return{
        maxexpandId: 47,//新增节点开始id
        non_maxexpandId: 47,//新增节点开始id(不更改)
        isLoadingTree: false,//是否加载节点树
        treeData: null,//节点树数据
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        defaultExpandKeys: [],//默认展开节点列表

        listQuery: {
          site_id: '1'
        },
        formMenuDetail: {
          id: '',
          name: '',
          region: '',
          type: ''
        }

      }
    },
    created(){
      this.getList();
    },
    methods: {
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.treeData = this.toMenuTreeData(response.data.data);
          this.initExpand();
          this.listLoading = false;
        });
      },
      toMenuTreeData(data){
        let pos={};
        let tree=[];
        let i=0;
        while(data.length!=0){
          if (data[i].url === '') {
            data[i].url = data[i].id.toString();
          }
          if(data[i].pId==0){
            tree.push({
              id:data[i].id,
              pid:data[i].pid,
              orderno:data[i].orderno,
              name:data[i].name,
              url:data[i].url,
              isEdit: false,
              children:[]
            });
            pos[data[i].id]=[tree.length-1];
            data.splice(i,1);
            i--;
          }else{
            let posArr=pos[data[i].pId];
            if(posArr!=undefined){

              let obj=tree[posArr[0]];
              for(let j=1;j<posArr.length;j++){
                obj=obj.children[posArr[j]];
              }

              obj.children.push({
                id:data[i].id,
                pid:data[i].pid,
                orderno:data[i].orderno,
                name:data[i].name,
                url:data[i].url,
                isEdit: false,
                children:[]
              });
              pos[data[i].id]=posArr.concat([obj.children.length-1]);
              data.splice(i,1);
              i--;
            }
          }
          i++;
          if(i>data.length-1){
            i=0;
          }
        }
        return tree;
      },
      handleFilter() {
        this.getList();
      },
      initExpand(){
        this.treeData.map((a) => {
          this.defaultExpandKeys.push(a.id)
        });
        this.isLoadingTree = true;
      },
      setChecked() {
        this.$refs.tree.setCheckedNodes([{
          id: 1}]);
      },
      handleNodeClick(d,n,s){//点击节点
        d.isEdit = false;//放弃编辑状态
        this.formMenuDetail.id = d.id;
        this.formMenuDetail.name = d.name;
        this.formMenuDetail.url = d.url;
        this.formMenuDetail.orderno = d.orderno;
      },
      renderContent(h,{node,data,store}){//加载节点
        let that = this;
        return h(TreeRender,{
          props: {
            DATA: data,
            NODE: node,
            STORE: store,
            maxexpandId: that.non_maxexpandId
          },
          on: {
            nodeAdd: ((s,d,n) => that.handleAdd(s,d,n)),
            nodeEdit: ((s,d,n) => that.handleEdit(s,d,n)),
            nodeDel: ((s,d,n) => that.handleDelete(s,d,n))
          }
        });
      },
      handleAdd(s,d,n){//增加节点
        console.log(s,d,n)
        if(n.level >=6){
          this.$message.error("最多只支持五级！")
          return false;
        }
        //添加数据
        d.children.push({
          id: ++this.maxexpandId,
          name: '新增节点',
          pid: d.id,
          isEdit: false,
          children: []
        });
        //展开节点
        if(!n.expanded){
          n.expanded = true;
        }
      },
      handleEdit(s,d,n){//编辑节点
        console.log(s,d,n)
      },
      handleDelete(s,d,n){//删除节点
        let that = this;
        //有子级不删除
        if(d.children && d.children.length !== 0){
          this.$message.error("此节点有子级，不可删除！")
          return false;
        }else{
          //新增节点直接删除，否则要询问是否删除
          let delNode = () => {
            let list = n.parent.data.children || n.parent.data,//节点同级数据
              _index = 99999;//要删除的index
            /*if(!n.parent.data.children){//删除顶级节点，无children
              list = n.parent.data
            }*/
            list.map((c,i) => {
              if(d.id == c.id){
                _index = i;
              }
            })
            let k = list.splice(_index,1);
            //console.log(_index,k)
            this.$message.success("删除成功！")
          }
          let isDel = () => {
            that.$confirm("是否删除此节点？","提示",{
              confirmButtonText: "确认",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              delNode()
            }).catch(() => {
              return false;
            })
          }
          //判断是否新增
          d.id > this.non_maxexpandId ? delNode() : isDel()

        }
      },


    }

  }
</script>

<style>
.tree-content {
  width:100%;
  height:100%;
  overflow:hidden;
  padding-left: 10%;
}
.expand>div{
  height:85%;
  padding-top:20px;
  width:50%;
  margin:20px auto;
  max-width:400px;
  overflow-y:auto;
}
.expand>div::-webkit-scrollbar-track{
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  border-radius:5px;
}
.expand>div::-webkit-scrollbar-thumb{
  background-color:rgba(50, 65, 87, 0.5);
  outline:1px solid slategrey;
  border-radius:5px;
}
.expand>div::-webkit-scrollbar{
  width:10px;
}
.expand-tree{
  border:none;
  margin-top:10px;
}
.expand-tree .el-tree-node.is-current,
.expand-tree .el-tree-node:hover{
  overflow:hidden;
}
.expand-tree .is-current>.el-tree-node__content .tree-btn,
.expand-tree .el-tree-node__content:hover .tree-btn{
  display:inline-block;
}
.expand-tree .is-current>.el-tree-node__content .tree-label{
  font-weight:600;
  white-space:normal;
}
</style>
