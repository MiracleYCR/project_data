class Calculator {
  constructor() {
    this.name = "Calculator";
  }

  plus(num1, num2, ...others) {
    if (others.length > 0) {
      return this.plus(this.plus(num1, num2), others[0], ...others.slice(1));
    }
    const baseNum = Math.pow(
      10,
      Math.max(this.digitLength(num1), this.digitLength(num2))
    );
    return (this.times(num1, baseNum) + this.times(num2, baseNum)) / baseNum;
  }

  minus(num1, num2, ...others) {
    if (others.length > 0) {
      return this.minus(this.minus(num1, num2), others[0], ...others.slice(1));
    }
    const baseNum = Math.pow(
      10,
      Math.max(this.digitLength(num1), this.digitLength(num2))
    );
    return (this.times(num1, baseNum) - this.times(num2, baseNum)) / baseNum;
  }

  times(num1, num2, ...others) {
    if (others.length > 0) {
      return this.times(this.times(num1, num2), others[0], ...others.slice(1));
    }
    const num1Changed = this.float2Fixed(num1);
    const num2Changed = this.float2Fixed(num2);
    const baseNum = this.digitLength(num1) + this.digitLength(num2);
    const leftValue = num1Changed * num2Changed;
    this.checkBoundary(leftValue);
    return leftValue / Math.pow(10, baseNum);
  }

  divide(num1, num2, ...others) {
    if (others.length > 0) {
      return this.divide(
        this.divide(num1, num2),
        others[0],
        ...others.slice(1)
      );
    }
    const num1Changed = this.float2Fixed(num1);
    const num2Changed = this.float2Fixed(num2);
    this.checkBoundary(num1Changed);
    this.checkBoundary(num2Changed);
    return this.times(
      num1Changed / num2Changed,
      Math.pow(10, this.digitLength(num2) - this.digitLength(num1))
    );
  }

  digitLength(num) {
    const eSplit = num.toString().split(/[eE]/);
    const len = (eSplit[0].split(".")[1] || "").length - +(eSplit[1] || 0);
    return len > 0 ? len : 0;
  }

  strip(num, precision = 16) {
    return +parseFloat(num.toPrecision(precision));
  }

  float2Fixed(num) {
    if (num.toString().indexOf("e") === -1) {
      return Number(num.toString().replace(".", ""));
    }
    let dLen = this.digitLength(num);
    return dLen > 0 ? this.strip(num * Math.pow(10, dLen)) : num;
  }

  // 检测数字是否越界，如果越界给出提示
  checkBoundary(num) {
    if (this.BOUNDARY_CHECKING_STATE) {
      if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
        console.warn(
          `${num} is beyond boundary when transfer to integer, the results may not be accurate`
        );
      }
    }
  }
  // 是否进行边界检查，默认开启
  enableBoundaryChecking(flag = true) {
    this.BOUNDARY_CHECKING_STATE = flag;
  }

  // 四舍五入
  round(num, ratio) {
    const base = Math.pow(10, ratio);
    return this.divide(Math.round(this.times(num, base)), base);
  }
}

export default new Calculator();
