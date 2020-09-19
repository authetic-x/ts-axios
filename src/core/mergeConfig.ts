import { isPlainObject, deepMerge } from "../helpers/utils";
import { AxiosRequestConfig } from "../types";

const strats = Object.create(null);

function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1;
}

function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2;
  }
}

// 对象的合并策略
function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2);
  } else if (typeof val2 !== 'undefined') {
    return val2;
  } else if (isPlainObject(val1)) {
    return deepMerge(val1);
  } else if (typeof val1 !== 'undefined') {
    return val1;
  }
}

const stratKeyFromVal2 = ['url', 'params', 'data'];
const stratKeyDeepMerge = ['headers', 'auth'];

stratKeyFromVal2.forEach(key => {
  strats[key] = fromVal2Strat;
})

stratKeyDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat;
})

// 策略模式？
export default function mergeConfig(config1: AxiosRequestConfig, 
  config2?: AxiosRequestConfig): AxiosRequestConfig {
  if (!config2) {
    config2 = {};
  }

  const config = Object.create(null);

  // 对不同的配置项有不同的合并策略
  for (let key in config2) {
    mergeField(key);
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key);
    }
  }

  function mergeField(key: string) {
    const strat = strats[key] || defaultStrat;
    config[key] = strat(config1[key], config2[key]);
  }

  return config;
}