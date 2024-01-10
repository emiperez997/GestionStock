class Storage {
  get(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  }

  remove(key) {
    localStorage.removeItem(key);
    return true;
  }
}

export default new Storage();
