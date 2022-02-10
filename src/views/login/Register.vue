<template>
  <div class="col-wrapper box">
    <div class="contain col-wrapper">
      <div class="title col-wrapper">
        <div class="title">建享教育</div>
        <div class="subTitle">学校信息管理后台</div>
      </div>
      <div class="col-wrapper form">
        <Input v-model="form.username" class="input">
          <div class="row-wrapper">
            <Iphone class="icon"/>
          </div>
        </Input>
        <Input type="password" v-model="form.password" class="input"/>
        <div class="row-wrapper forget-password">
          <span class="forget-password">忘记密码?</span>
        </div>
        <Button :type="'primary'" class="login">登录</Button>
      </div>
      <div class="register row-wrapper">
        <span class="register">注册账号</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: undefined,
        password: undefined
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

      .input {
        margin: 5px 0;
        align-self: stretch;
        width: 100%;
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
    .register{
      justify-content: flex-end;
      padding: 0 20px;
      .register{
        font-size: 14px;
        padding: 0;
        color: #409EFF
      }
      .register:hover{
        cursor: pointer;
      }
    }
  }

}

.icon {
  width: 20px;
  height: 20px;
}
</style>