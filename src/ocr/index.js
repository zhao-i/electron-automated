'use strict'

import { createWorker } from 'tesseract.js'
import robot from 'robotjs'
import jimp from 'jimp'

let worker, ocr;

class OCR {
  constructor(maxPrice, interval, ocrDelay, randomDelay) {
    this.isReady = false //是否初始化
    this.looping = true //循环指示
    this.tempResult = null //缓存上一次结果
    this.count = 0 //刷新计数器
    this.buys = 0 //购买计数器
    this.maxPrice = maxPrice //最大价格
    this.interval = interval //刷新间隔
    this.ocrDelay = ocrDelay //延时识别
    this.randomDelay = randomDelay //随机延迟
  }
}

let tess = async (image) => {

  if (!ocr.isReady) {

    worker = createWorker({
      // workerPath: 'D:/app/node_modules/tesseract.js/src/worker-script/node',
      workerPath: './node_modules/tesseract.js/src/worker-script/node',
      langPath: 'D:/tessdata'
    });

    await worker.load()
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    await worker.setParameters({ tessedit_char_whitelist: '0123456789' });

    ocr.isReady = true;

  }

  const { data: { text } } = await worker.recognize(image);

  return text

}

function captureScreen() {

  const raw = robot.screen.capture(1328, 216, 100, 48).image

  new jimp({ data: raw, width: 100, height: 48 }, (error, image) => {

    if (error) throw error;
    //将图片经过灰度、xor、放大处理，得到buffer
    image.color([{ apply: "greyscale", params: [100] }, { apply: 'xor', params: ['#ffffff'] }]).resize(jimp.AUTO, 72).getBuffer('image/png', (err, buffer) => {

      if (err) throw err;
      //添加一个期约,当完成时,可以取得由tess函数处理buffer后,返回的结果.
      //10秒后默认超时,期约拒绝
      const re = new Promise(async (resolve, reject) => {

        const id = setTimeout(() => reject('Failed: function[tess] has timed out!'), 10000);
        const result = await tess(buffer);
        clearTimeout(id);
        resolve(result);

      })
      //将期约结果交给处理函数
      re.then(a => handle(a)).catch(er => ocr.toRender('toRender', { code: 4, data: er }))

    })
  })
}

function handle(result) {
  if (result !== ocr.tempResult) { ocr.toRender('toRender', { code: 3, data: result }); ocr.tempResult = result; }

  switch (result) {

    case '':
      ocr.toRender('toRender', { code: 4, data: '识别不到价格，为了避免误操作已终止脚本，请关闭后重试' });
      break;
    case (1 <= result && result <= ocr.maxPrice):
      useRobot();
    default:
      refresh()
      break;

  }

}
async function refresh() {

  if (!ocr.looping) { //如果循环指示器标记为false,则退出循环
    await worker.terminate();
    return
  }

  setTimeout(() => {

    robot.keyTap('f');

    setTimeout(() => captureScreen(), ocr.ocrDelay);

  }, ocr.interval + Math.round(Math.random() * ocr.randomDelay));

  ocr.count += 1;

  ocr.toRender('toRender', { code: 1, data: ocr.count });
}

function useRobot() {

  const { x, y } = robot.getMousePos();

  if (!(1180 < x && x < 1260 && 230 < y && y < 250)) robot.moveMouseSmooth(1200, 240, 1.7);

  robot.mouseClick('right', false);

  setTimeout(() => {

    robot.keyTap('f');

    refresh();

  }, 330);

  ocr.buys += 1;

  ocr.toRender('toRender', { code: 2, data: ocr.buys });

}

//覆盖式指定一个新config对象,接收来自background.js的参数,和一个传递窗口消息函数
function setocr(a, b, c, d, e) {

  ocr = new OCR(a, b, c, d)

  ocr.toRender = e;
}

/* 
告诉渲染进程,入口函数调用成功
延时3秒后调用鼠标、键盘复位动作(如果中途判断循环失效,函数退出)
然后延时0.3秒按下键盘F
继续延时0.1秒后调用读取屏幕函数
 */
function runocr() {

  setTimeout(() => {

    if (!ocr.looping) return;

    robot.moveMouseSmooth(1200, 240, 1.7);

    robot.mouseClick('left', false);

    setTimeout(() => {

      robot.keyTap('f');

      setTimeout(() => captureScreen(), 100);

    }, 300);

  }, 3000);

  ocr.toRender('toRender', { code: 4, data: '3秒后脚本将自动执行，请松开鼠标' });

}
function stopocr() {
  ocr.looping = false;
}

export {
  setocr, runocr, stopocr
}