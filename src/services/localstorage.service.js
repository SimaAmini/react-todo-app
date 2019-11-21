const name = 'task';

function setData(data) {
  localStorage.setItem(name, JSON.stringify(data));
}
function getData() {
  return JSON.parse(localStorage.getItem(name));
}
function clear() {
  localStorage.clear(name);
}
export default {
  setData,
  getData,
  clear
};
