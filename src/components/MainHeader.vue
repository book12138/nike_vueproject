<template>
    <!-- 页面顶部内容 -->
    <div class="head">
        <div class="head-content">
            <img class="history head-content-item" src="../assets/icon/history.png">

            <div class="head-search head-content-item">
                <img src="../assets/icon/搜索.png">
                <input type="text" id="searchInput" value="" placeholder="男鞋">
                <input type="button" id="searchBtn" value="搜索">
                <div class="clr"></div>
            </div>

            <img class="gift head-content-item" src="../assets/icon/gift.png">
            <img class="email head-content-item" src="../assets/icon/邮箱.png">
        </div>
    </div>
</template>
<script>
export default {
  name: 'mainheader'
}
</script>
<style scoped>
.head {
    width: 100%;
    position: fixed;
    top: 0px;
    border-bottom: 1px solid #f0f0f0;
    height: 50px;
    background-color: white;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    z-index: 99;
}

.head-content {
    color: #999;
    display:-webkit-flex;
    display: flex;
    justify-content: space-around;
    padding: 0px 10px;
    width: 100%;
}

.head-content-item {
    display: inline-block;
    text-align: center;
}

.head-content .history {
    height: 28px;
    width: 28px;
    margin-top: 10px;
}

.head-content .email, .gift {
    width: 28px;
    height: 28px;
    margin-top: 10px;
}

.email{
    padding-right: 20px;
}

.head-content .head-search {
    background-color: white;
    border-radius: 20px;
    width: 220px;
    margin-top: 10px;
    border: 1.8px solid #ff5000;
}

.head-search img {
    float: left;
    width: 20px;
    margin-top: 5px;
    margin-left: 7px;
}

.head-search #searchInput {
    float: left;
    background-color: white;
    height: 26px;
    width: 125px;
    border: 0px;
    margin-left: 5px;
}

.head-search #searchBtn {
    color: white;
    float: right;
    width: 61px;
    height: 30px;
    border: 0px;
    border-radius: 25px;
    background-image: linear-gradient(to right, #ff8c0f, #ff5000);
}
</style>
