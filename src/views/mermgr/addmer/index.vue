<template>
  <div class="app-container addmer-container">
    <el-steps class="steps"
              :active="active"
              finish-status="success" simple>
      <el-step class="step" title="营业执照信息"></el-step>
      <el-step class="step" title="法人证件信息"></el-step>
      <el-step class="step" title="结算账户信息"></el-step>
      <el-step class="step" title="经营门店信息"></el-step>
      <el-step class="step" title="开通产品信息"></el-step>
      <el-step class="step" title="联系人信息"></el-step>
      <el-step class="step" title="资质证照上传"></el-step>
    </el-steps>

    <el-form ref="form"
             :model="form"
             :rules="rules"
             label-position="right" label-width="180px">
      <div v-if="active===0" class="step-content-main">
        <el-form-item label="企业类型" required>
          <el-radio-group v-model="form.enterpriseType" size="small" >
            <el-radio-button label="0">企业</el-radio-button>
            <el-radio-button label="1">个体</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-row>
          <el-col :span="10">
            <el-form-item label="统一社会信用代码" prop="regNo">
              <el-input v-model="form.regNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="2">
            <el-form-item label="执照注册名称" prop="licenseName">
              <el-input v-model="form.licenseName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label="法定代表人" prop="busiLegalName">
              <el-input v-model="form.busiLegalName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="2">
            <el-form-item label="注册资本(万元)" prop="regCapital">
              <el-input v-model="form.regCapital"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-form-item label="注册地址" prop="name">
            <el-col :span="5">
              <el-cascader
                :options="options2"
                @active-item-change="handleItemChange"
                :props="props"
                placeholder="省/市/区"
              ></el-cascader>
            </el-col>
            <el-col :span="8">
              <el-input v-model="form.name" placeholder="详细地址"></el-input>
            </el-col>
          </el-form-item>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label="成立时间" prop="busiStart">
              <el-date-picker
                v-model="form.busiStart"
                type="date"
                :picker-options="busiStartPickerOptions"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="2">
            <el-form-item label="营业期至" prop="busiEnd">
              <el-date-picker
                v-model="form.busiEnd"
                type="date"
                :picker-options="busiEndPickerOptions"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-form-item label="经营范围">
            <el-input type="textarea" v-model="form.busiRange"></el-input>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="营业执照">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-row>


      </div>
      <div v-if="active===1" class="step-content-main">1</div>
      <div v-if="active===2" class="step-content-main">2</div>
      <div v-if="active===3" class="step-content-main">0</div>
      <div v-if="active===4" class="step-content-main">1</div>
      <div v-if="active===5" class="step-content-main">2</div>
      <div v-if="active===6" class="step-content-main">6</div>





      <el-row>
        <el-form-item>
          <el-button v-if="active!==0" type="primary" @click="prev">上一部</el-button>
          <el-button v-if="active!==6" type="primary" @click="next">下一步</el-button>
          <el-button v-if="active===6" type="primary" @click="next">保存</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "addmer",

    data() {
      return {
        active: 0,
        form: {
          enterpriseType: 0,  // 企业类型
          regNo: '',  //  统一社会信用代码
          licenseName: '', // 执照注册名称
          busiLegalName: '', // 法定代表人
          regCapital: '', // 注册资本

          busiStart: '', // 成立时间
          busiEnd: '', // 营业期至
          busiRange: '', // 经营范围

        },
        busiStartPickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        busiEndPickerOptions: {
          disabledDate(time) {
            return time.getTime() < form.busiStart;
          },
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        },

        options2: [{
          label: '江苏',
          cities: []
        }, {
          label: '浙江',
          cities: []
        }],
        props: {
          value: 'label',
          children: 'cities'
        },

      };
    },

    methods: {
      next() {
        if (this.active++ > 6) this.active = 0;
      },
      prev() {
        if (this.active-- < 0) this.active = 0;
      },

      handleItemChange(val) {
        console.log('active item:', val);
        setTimeout(_ => {
          if (val.indexOf('江苏') > -1 && !this.options2[0].cities.length) {
            this.options2[0].cities = [{
              label: '南京'
            }];
          } else if (val.indexOf('浙江') > -1 && !this.options2[1].cities.length) {
            this.options2[1].cities = [{
              label: '杭州'
            }];
          }
        }, 300);
      },

      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
.addmer-container {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}

</style>
