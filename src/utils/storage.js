/**
 * Local Storage control with get, set, remove and clear sintax
 * Thanks David
 */
const storage = {
  get(key) {
    let value = localStorage.getItem(key);
    !value ? (value = null) : (value = JSON.parse(value));
    return value;
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },
};
export default storage;
