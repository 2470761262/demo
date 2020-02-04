<style lang="less">
.page-cell {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(
    to bottom right,
    rgb(114, 135, 254),
    rgb(130, 88, 186)
  );
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .page-cell-middle {
    width: 500px;
    height: 300px;
    background-image: linear-gradient(
      to bottom right,
      rgb(149, 165, 255),
      rgb(92, 103, 211)
    );
    background-size: 100%;
    display: flex;
    .page-cell-middle-left {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      .page-cell-input {
        height: 40px;
        border-radius: 20px;
        overflow: hidden;
        margin: 20px 0;
        input {
          text-indent: 10px;
          height: 100%;
          outline: none;
          border: none;
        }
        &::after {
          content: attr(data-msg);
        }
      }
      &::after {
        position: absolute;
        content: "";
        height: 100%;
        width: 2px;
        right: 0;
        background: #fff;
      }
    }
    .page-cell-middle-right {
      flex: 0 0 20%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      a {
        text-decoration: none;
      }
    }
  }
}
</style>
<template>
  <div class="page-cell">
    <div class="page-cell-middle">
      <div class="page-cell-middle-left">
        <div class="page-cell-input"
             :data-msg="errors.first('account')">
          <input type="text"
                 v-model="account"
                 placeholder="账号"
                 name="account"
                 v-validate="'required'" />
        </div>
        <div class="page-cell-input"
             :data-msg="errors.first('password')">
          <input type="password"
                 v-model="password"
                 placeholder="密码"
                 name="password"
                 v-validate="'required'" />
        </div>
      </div>
      <div class="page-cell-middle-right">
        <div @click="isLogin">登陆</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data () {
    return {
      account: "",
      password: ""
    };
  },
  mounted () {
    console.log(2);
  },
  activated () {
    console.log(3);
  },
  created () {
    console.log(1);
    const dictionary = {
      zh_CN: {
        messages: {
          required: field => "不能为空" + field
        },
        attributes: {
          account: "账号",
          password: "密码"
        }
      }
    };
    this.$validator.updateDictionary(dictionary);
  },
  methods: {
    isLogin () {
      //  Validator.updateDictionary(dictionary);
      //console.log(this.$validator.validate("account"));
      this.$validator.validateAll().then(e => {
        if (e) {
          this.$router.push({ name: "middle" });
        }
      });
    }
  }
};
</script>
