export const setToLS = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const setToLSwhenEmpty = (key, value) => {
  if (window.localStorage.getItem(key)) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getFromLS = (key) => {
  const value = window.localStorage.getItem(key);

  if (value) {
    return JSON.parse(value);
  } else {
    return null;
  }
};
