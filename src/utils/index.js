export function numberFormatter(number) {
  const numbers = number.toString().split("").reverse();
  const segs = [];

  while (numbers.length) segs.push(numbers.splice(0, 3).join(""));

  return segs.join(",").split("").reverse().join("");
}

export const round = (value, decimals = 2) => {
  const pow = 10 ** decimals;
  return Math.round(value * pow) / pow;
};
export const currency = (value, decimals = 2, thousands = true) => {
  value = parseFloat(value);
  if (!isFinite(value) || (!value && value !== 0)) return "";
  let t =
    decimals > -1
      ? round(value, decimals).toFixed(decimals)
      : parseFloat(value.toFixed(8)) + "";
  if (!t.includes(".")) {
    t += ".";
  }
  if (thousands) {
    t = t.replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
      return $1 + ",";
    });
  }
  t = t.replace(/\.$/, "");
  return t;
};

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
    ? Number((Math.random() * (max - min) + min).toFixed(digits))
    : Math.random() * (max - min) + min;
}

// 随机循环时间间隔
export const getRandomSecondsInterval = (callback, start = 1, end = 3) => {
  let timer;

  function getRandomInterval(minSeconds, maxSeconds) {
    return (
      Math.floor(Math.random() * (maxSeconds - minSeconds + 1)) + minSeconds
    );
  }

  function randomIntervalLoop() {
    clearTimeout(timer);

    const nextInterval = getRandomInterval(start, end) * 1000;

    callback();

    timer = setTimeout(randomIntervalLoop, nextInterval);
  }

  randomIntervalLoop();
};
