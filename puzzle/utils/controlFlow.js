
export async function timeout(ms, f) {
    const promise = f();
  
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('timeout'));
      }, ms);
  
      promise.then(resolve, reject);
    });
}

export async function retry(count, f) {
    if (count > 0) {
      try {
        return await f();
      } catch (e) {
        return retry(count - 1, f);
      }
    }
  
    return Promise.reject();
}

export async function invoke(options, f) {
    return retry(options.retry || 1, () => timeout(options.timeout || 0, f));
}