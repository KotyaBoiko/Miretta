export const debounce = <T>(callback: (...rest:T[]) => void, delay = 1000) => {
  let timer:ReturnType<typeof setTimeout> | null = null;
  
  return function start (...rest:T[]) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => callback(...rest), delay)
  }
}