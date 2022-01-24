<template>
  <div id="wrap" v-if="!this.haveRead">
    <div id="article">
      <h3>免责声明</h3>
      <p>1. 本软件完全出于开发者兴趣爱好，属于非盈利产品，是一款安全、绿色、可靠的测试软件。</p>
      <P>2. 本软件仅用于个人使用，未经允许在互联网传播属于违法行为，本人拥有进一步追责的权利。</P>
      <p>3. 本软件绝对不针对任何一款游戏或者游戏开发商，如果有人利用本软件进行非法游戏辅助，本人将保留追究其民事以及刑事责任的权利。</p>
      <P>4. 当你第一次开始使用本人所提供的任何软件及资源的那一刻起就将被视为对本声明全部内容的认可。同时您必须认可上述免责条款，方可使用本软件。如有任何异议，请立刻删除本软件并停止使用。</P>
      <p>5. 以上内容，本人保留最终解释权。</p>
      <hr class="hr">
      <div class="agreement">
        <input type="checkbox" id="checkbox" @click="setstate($event)">
        <span>我已同意和知晓《免责声明》</span>
      </div>
      <div class="yes" :class="{'onyes':this.agree}" @click.self="close">好的</div>
      <div id="no" title="此功能不可用">拒绝并退出</div>
    </div>
  </div>
</template>
<style scoped>
#wrap{
    position: fixed;
    top:0;
    left:0;
    right: 0;
    bottom: 0;
    background: rgb(0, 0, 0,0.5);
    z-index: 1000;
}
#article{
    position: absolute;
    top:50%;
    left: 50%;
    margin: -200px 0px 0px -400px;
    width: 800px;
    height: 400px;
    background:rgba(240, 240, 255);
}
#article>h3{
  line-height: 30px;
  text-align: center;
}
#article>p{
  text-align: left;
  text-indent: 2em;
  margin: 20px;
  line-height: 20px;
}
.hr{
    width: 96%;
    border: 1px solid rgb(128, 162, 226);
}
.agreement{
    font-size: 14px;
    display: flex;
}

#checkbox{
    width:14px;
    height:14px;
    margin:1px 10px 0 580px;
}
.yes{
  position: absolute;
  left:50%;
  bottom:0;
  margin: 0 0 20px -40px;
  width: 80px;
  height:35px;
  line-height: 35px;
  color: rgb(131, 131, 131);
  background: #d9dbe2;
  border-radius: 4px;
}
.onyes{
  color: black;
  background: #b8bee4;
}
#no{
  position: absolute;
  right: 0px;
  bottom: 17px;
  width: 130px;
  height: 22px;
  line-height: 22px;
  color: rgb(155, 155, 155);
  text-decoration: underline;
}
</style>
<script>
export default {
  data(){
    return{
      agree: false,
      haveRead: window.localStorage.getItem('first') == 'ok'
    }
  },
  methods:{
    setstate(event){
        this.agree = event.target.checked
    },
    close(){
      if(this.agree) {
        this.haveRead = true
        window.localStorage.setItem('first','ok')
      }
    }
  }
}
</script>