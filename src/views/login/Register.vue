<template>
  <div class="col-wrapper box">
    <div class="contain col-wrapper">
      <div class="title col-wrapper">
        <div class="title">建享教育</div>
        <div class="subTitle">学校信息管理后台</div>
      </div>
      <div class="col-wrapper form">
        <el-select v-model="form.type">
          <el-option label="注册成为学校用户" value="1"></el-option>
          <el-option label="注册成为教研室用户" value="2"></el-option>
        </el-select>
        <div class="input-contain row-wrapper">
          <div class="icon-contain col-wrapper">
            <Iphone color="#7D7E81" class="icon"/>
          </div>
          <input v-model="form.username"
                 placeholder="请输入手机号"
                 class="input"/>
        </div>
        <div class="row-wrapper" style="justify-content: space-between">
          <div class="input-contain row-wrapper">
            <div class="icon-contain col-wrapper">
              <Checked color="#7D7E81" class="icon" />
            </div>
            <input type="password"
                   placeholder="短信验证码"
                   v-model="form.password" class="input"/>
          </div>
          <Button>获取验证码</Button>
        </div>
        <div class="input-contain row-wrapper">
          <div class="icon-contain col-wrapper">
            <Lock color="#7D7E81" class="icon"/>
          </div>
          <input type="password"
                 placeholder="密码"
                 v-model="form.password" class="input"/>
        </div>
        <div class="input-contain row-wrapper">
          <div class="icon-contain col-wrapper">
            <Lock color="#7D7E81" class="icon"/>
          </div>
          <input type="password"
                 placeholder="确认密码"
                 v-model="form.password" class="input"/>
        </div>
        <Button :type="'primary'" class="login">提交申请</Button>
      </div>
      <div class="register row-wrapper">
        <span class="register" @click="$router.push({path:'/login'})">用已有账号登录</span>
      </div>
    </div>
  </div>
</template>

<script>
import {Iphone} from "_@element-plus_icons-vue@0.2.6@@element-plus/icons-vue";

export default {
  name: "Login",
  components: {Iphone},
  data() {
    return {
      form: {
        username: undefined,
        password: undefined,
        type: '1'
      }
    }
  }
}
</script>

<style scoped lang="less">
.box {
  height: 100vh;

  .contain {
    margin-top: 110px;
    width: 375px;
    align-items: stretch;

    .title {
      padding: 20px;

      .title {
        font-weight: 300;
        font-size: 30px;
        color: #000;
      }

      .subTitle {
        font-weight: 400;
        font-size: 2em;
        color: #666
      }

    }

    .form {
      padding: 20px;
      align-items: stretch;
      align-self: stretch;

      .login {
        margin: 0;
        align-self: stretch;
      }

      .input-contain {
        align-self: stretch;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        margin: 5px 0;

        .input {
          outline: none;
          padding-left: 0;
          border: 1px solid transparent;
          align-self: stretch;
        }
      }

      .forget-password {
        justify-content: flex-end;
        padding: 20px 0;

        .forget-password {
          font-size: 14px;
          padding: 0;
          color: #409EFF
        }

        .forget-password:hover {
          cursor: pointer;
        }
      }
    }

    .register {
      justify-content: flex-end;
      padding: 0 20px;

      .register {
        font-size: 14px;
        padding: 0;
        color: #409EFF
      }

      .register:hover {
        cursor: pointer;
      }
    }
  }

}

.icon-contain {
  padding: 5px 10px;

  .icon {
    width: 20px;
    height: 20px;
  }
}
</style>
<style>
.el-select .el-input__inner{
  padding-left: 40px;
}
</style>