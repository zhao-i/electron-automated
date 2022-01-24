<template>
  <div id="wrap">
    <ul id="left-area">
      <li style="margin-top:10px"  :class="{'onshow': code < 2}">开 始</li>
      <li style="margin-top:100px" :class="{'onshow': code===2}">检 测</li>
      <li style="margin-top:116px" :class="{'onshow': code===3}">配 置</li>
      <li style="margin-top:103px" :class="{'onshow': code===4}">运 行</li>
    </ul>

    <div id="progress">
      <div class="scroll" :class="{'two':code===2 ,'three':code===3&&next===true,'four':code===4,'threeback':code===3&&next===false}"></div>
    </div>

    <div id="right-area">

      <div class="config-page-one" v-if="code===2">检测模块</div>
      <div class="config-page-two" v-if="code===3">参数模块</div>
      <div class="config-page-three" v-if="code===4">启动脚本窗口模块</div>

      <div id="user">
        <div style="clear: both"></div>
        <div class="button" v-on:click="changeState()" :class="{'agree':code>0}">{{code_text[code]}}</div>
        <ul class="button-back" v-show="code===4">
          <li @click="code=3;next=false">调整参数</li>
          <li @click="code=0">选择游戏</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped>
#wrap {
  position: relative;
  top:26px;
  left:0;
  width: 1000px;
  height: 600px;
}
#left-area {
  float: left;
  margin: 100px 10px 0px 80px;
  width: 50px;
  height: 400px;
  
}
#left-area>li{
  visibility: hidden;
  width: 50px;
  line-height: 16px;
}
.onshow{
  visibility: visible !important;
  animation: textin .4s ease-in 1 none normal;
}
@keyframes textin{
  from{opacity: 0;}
  to{opacity: 1;}
}
#progress {
  position: absolute;
  top: 100px;
  left: 160px;
  width: 10px;
  height: 400px;
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
  box-shadow: 2px 2px 5px #afafaf inset;
}
.scroll {
  position: relative;
  left: -3px;
  top: 10px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: rgb(131, 145, 230);
  background-image: linear-gradient(rgb(133, 218, 255), rgb(100, 115, 255));
  box-shadow: 0px 0px 5px 3px rgb(201, 201, 201);
  transform: translateY(0px);
}
.two{
  transform: translateY(116px);
  animation: two .2s ease-out 1 none normal;
}
.three{
  transform: translateY(248px);
  animation: three .2s ease-out 1 none normal;
}
.four{
  transform: translateY(367px);
  animation: four .2s ease-out 1 none normal;
}
.threeback{
  transform: translateY(248px);
  animation: threeback .2s ease-out 1 none normal;
}
@keyframes two{
  from{transform: translateY(0px)}
  to{transform: translateY(116px)}
}
@keyframes three{
  from{transform: translateY(116px)}
  to{transform: translateY(248px)}
}
@keyframes four{
  from{transform: translateY(248px)}
  to{transform: translateY(367px)}
}
@keyframes threeback{
  from{transform: translateY(367px)}
  to{transform: translateY(248px)}
}
#right-area{
  position: absolute;
  bottom: 0;
  right: 0;
  /* float: right; */
  margin: 100px 60px 50px 60px;
  width: 700px;
  height: 450px;
  /* background-color: rgb(241, 241, 253); */
}
#user{
  width: 700px;
  height: 100px;
  position: absolute;
  top: 335px;
  left: 0;
}
.button{
  position:absolute;
  top:35px;
  left:300px;
  width: 80px;
  height: 30px;
  line-height: 30px;
  color: black;
  background-color: rgb(184, 190, 228);
  border-radius: 4px;
}
.agree{
  box-shadow: 0px 0px 1px 1px rgb(168, 168, 168);
  background-color: rgb(162, 171, 226)
}
.agree:hover{
  background-color:rgb(141, 153, 230)
}
.agree:active{
  background-color:rgb(126, 139, 230)
}
.button-back{
  display: flex;
  position: absolute;
  top: 46px;
  left: 400px;
  text-decoration: underline;
  width: 140px;
  height: 20px;
  line-height: 20px;
}
.button-back>li{
  margin: 0px 5px;
}
</style>
<script>
export default {
  data(){
    return{
      code:0,
      code_text:['确认','起步','继续','继续','运行'],
      next:true,
      haveRead:false,
    }
  },
  methods:{
    changeState(){
      if(this.code>=4) {this.code=4}
      else if(this.code===0){}
      else{this.code = this.code +1 ,this.next=true}
    }
  }
}
</script>