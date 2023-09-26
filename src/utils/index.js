export function numberFormatter(number) {
  const numbers = number.toString().split("").reverse();
  const segs = [];

  while (numbers.length) segs.push(numbers.splice(0, 3).join(""));

  return segs.join(",").split("").reverse().join("");
}

export function generateRealTime(realTimeList) {
  function generateRandomInterval() {
    // 生成一个随机的时间间隔，单位为毫秒，可以根据需要调整范围
    return Math.floor(Math.random() * 5000) + 1000; // 生成1秒到6秒之间的随机间隔
  }

  function generateNextEvent() {
    // 生成下一个事件的时间间隔
    const nextInterval = generateRandomInterval();

    // 输出当前时间和下一个事件的时间间隔
    const currentTime = new Date();

    realTimeList.push(
      `${(currentTime.getMonth() + 1).toString().padStart(2, "0")}-${currentTime
        .getDay()
        .toString()
        .padStart(2, "0")} ${currentTime.toLocaleTimeString()}`
    );

    // 设置定时器，在下一个事件间隔后触发 generateNextEvent 函数
    setTimeout(generateNextEvent, nextInterval);
  }

  // 启动第一个事件生成
  generateNextEvent();
}

// 获取数组中指定的随机元素
export function getRandomElements(arr, count) {
  const shuffled = arr.slice(); // 复制数组
  let i = arr.length;
  const min = i - count;
  let temp, index;

  // 随机交换数组中的元素
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}

// 取返回随机数
export function generateRandomNumber(min, max, digits) {
  return digits
    ? (Math.random() * (max - min) + min).toFixed(digits)
    : Math.random() * (max - min) + min;
}

// 随机循环时间间隔
export const getRandomSecondsInterval = (callback) => {
  let timer;

  function getRandomInterval(minSeconds, maxSeconds) {
    return (
      Math.floor(Math.random() * (maxSeconds - minSeconds + 1)) + minSeconds
    );
  }

  function randomIntervalLoop() {
    clearTimeout(timer);

    const nextInterval = getRandomInterval(1, 7) * 1000;

    callback();

    timer = setTimeout(randomIntervalLoop, nextInterval);
  }

  randomIntervalLoop();
};
