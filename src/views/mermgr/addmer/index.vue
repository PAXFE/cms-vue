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

    <el-form ref="form" :model="form" label-position="right" label-width="80px">
      <div v-if="active===0" class="step-content-main">
        <el-form-item label="企业类型">
          <el-radio-group v-model="form.enterpriseType" size="small" >
            <el-radio-button label="0">企业</el-radio-button>
            <el-radio-button label="1">个体</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

      </div>
      <div v-if="active===1" class="step-content-main">1</div>
      <div v-if="active===2" class="step-content-main">2</div>
      <div v-if="active===3" class="step-content-main">0</div>
      <div v-if="active===4" class="step-content-main">1</div>
      <div v-if="active===5" class="step-content-main">2</div>
      <div v-if="active===6" class="step-content-main">6</div>

    </el-form>



    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
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
          name: 'test'
        }

      };
    },

    methods: {
      next() {
        if (this.active++ > 6) this.active = 0;
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
.addmer-container {

}

</style>
