<style lang="less" scoped>
@import "../newLess/cardContent";
.role-content {
  margin-top: 17px;
  .card-content;

  .card-message-content {
    display: flex;
    flex-wrap: wrap;
    // prettier-ignore
    padding: 20PX 30PX;
    // prettier-ignore
    margin: 0 -10PX;
    .role-item {
      display: flex;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      // prettier-ignore
      flex: 0 0 calc(( 100% - 60PX)  / 3);
      // prettier-ignore
      margin: 0 10PX;
      &:nth-child(-n + 3) {
        // prettier-ignore
        margin-bottom: 30PX;
      }
      @media screen and (max-width: 1700px) {
        & {
          // prettier-ignore
          flex: 0 0 calc(( 100% - 40PX)  / 2) ;
          &:nth-child(-n + 4) {
            // prettier-ignore
            margin-bottom: 30PX;
          }
        }
      }
      .role-img {
        // prettier-ignore
        width: 58PX;
        // prettier-ignore
        height: 58PX;
        border-radius: 50%;
        object-fit: cover;
        // prettier-ignore
        margin-left: 20PX;
        // prettier-ignore
        padding: 10PX 0;
      }
      .role-middle {
        flex: 1;
        // prettier-ignore
        text-indent: 20PX;
        // prettier-ignore
        padding: 10PX 0;
        color: #727272;
        width: 0;
        .role-title {
          font-size: @font16;
          font-weight: 600;
          color: #535353;
        }
        .role-store,
        .role-phone {
          font-size: @font14;
        }
      }
      .role-type {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .role-type-top {
          font-size: @font13;
          border-radius: 4px;
          background: @backgroud;
          padding: 4px 6px;
          color: #fff;
        }
        .role-type-bottom {
          font-size: @font12;

          display: flex;
          justify-content: flex-end;

          .role-type-title {
            border-radius: 50%;
            background: @backgroud;
            color: #fff;
            text-align: center;
            // prettier-ignore
            width: 30PX;
            // prettier-ignore
            height: 30PX;
            // prettier-ignore
            line-height: 30PX;
          }
        }
      }
      &.role-btn-cotnent {
        align-items: center;
        justify-content: center;
        .role-btn {
          outline: none;
          border: none;
          background: @backgroud;
          font-size: @font14;
          color: #fff;
          // prettier-ignore
          padding: 5PX 10PX;
          border-radius: 4px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
<template>
  <div class="role-content">
    <div class="card-head">
      <h3 class="card-head-title">角色人申请</h3>
    </div>
    <!-- 录入人 -->
    <div class="card-message-content">
      <div class="role-item">
        <img
          class="role-img"
          src="http://thirdwx.qlogo.cn/mmopen/crFvYbdM220BSRSCtiaYofGjTgsjW6szW9qBoo7tG3mJibfmOaNw3LhJeWDiaegVqLRNLxo2u8xCmKw8VYSmZuiaRUEAw6KvZwnt/132"
          alt=""
        />
        <div class="role-middle">
          <div class="role-title overText">谢谢你</div>
          <div class="role-store overText">门店:天琴湾店</div>
          <div class="role-phone overText">电话:15280398053</div>
        </div>
        <div class="role-type">
          <div class="role-type-top">录入人</div>
        </div>
      </div>
      <!-- 跟单人 -->
      <div class="role-item">
        <img
          class="role-img"
          src="http://thirdwx.qlogo.cn/mmopen/crFvYbdM220BSRSCtiaYofGjTgsjW6szW9qBoo7tG3mJibfmOaNw3LhJeWDiaegVqLRNLxo2u8xCmKw8VYSmZuiaRUEAw6KvZwnt/132"
          alt=""
        />
        <div class="role-middle">
          <div class="role-title overText">谢谢你</div>
          <div class="role-store overText">门店:天琴湾店</div>
          <div class="role-phone overText">电话:15280398053</div>
        </div>
        <div class="role-type">
          <div class="role-type-top">跟单人</div>
        </div>
      </div>

      <!-- 委托人 -->
      <div class="role-item">
        <img
          class="role-img"
          src="http://thirdwx.qlogo.cn/mmopen/crFvYbdM220BSRSCtiaYofGjTgsjW6szW9qBoo7tG3mJibfmOaNw3LhJeWDiaegVqLRNLxo2u8xCmKw8VYSmZuiaRUEAw6KvZwnt/132"
          alt=""
        />
        <div class="role-middle">
          <div class="role-title overText">谢谢你</div>
          <div class="role-store overText">门店:天琴湾店</div>
          <div class="role-phone overText">电话:15280398053</div>
        </div>
        <div class="role-type">
          <div class="role-type-top">委托人</div>
          <div class="role-type-bottom">
            <div class="role-type-title">取代</div>
          </div>
        </div>
      </div>
      <!-- 钥匙人 -->
      <!-- <div class="role-item">
        <img
          class="role-img"
          src="http://thirdwx.qlogo.cn/mmopen/crFvYbdM220BSRSCtiaYofGjTgsjW6szW9qBoo7tG3mJibfmOaNw3LhJeWDiaegVqLRNLxo2u8xCmKw8VYSmZuiaRUEAw6KvZwnt/132"
          alt=""
        />
        <div class="role-middle">
          <div class="role-title overText">谢谢你</div>
          <div class="role-store overText">门店:天琴湾店</div>
          <div class="role-phone overText">电话:15280398053</div>
        </div>
        <div class="role-type">
          <div class="role-type-top">钥匙人</div>
        </div>
      </div> -->
      <!-- 申请钥匙人 -->
      <div class="role-item role-btn-cotnent">
        <button class="role-btn">申请钥匙人</button>
      </div>
      <!-- 实勘人 -->
      <div class="role-item">
        <img
          class="role-img"
          src="http://thirdwx.qlogo.cn/mmopen/crFvYbdM220BSRSCtiaYofGjTgsjW6szW9qBoo7tG3mJibfmOaNw3LhJeWDiaegVqLRNLxo2u8xCmKw8VYSmZuiaRUEAw6KvZwnt/132"
          alt=""
        />
        <div class="role-middle">
          <div class="role-title overText">谢谢你</div>
          <div class="role-store overText">门店:天琴湾店</div>
          <div class="role-phone overText">电话:15280398053</div>
        </div>
        <div class="role-type">
          <div class="role-type-top">实勘人</div>
          <div class="role-type-bottom">
            <div class="role-type-title">取代</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
