export const setItem = (itemName,value) => {
  if(window.localStorage == 'undefined') {
    throw new Error("your browser not supports localStorage");
  }else {
    //let itemInJson = JSON.stringify(value);
    localStorage.setItem(itemName,JSON.stringify(value));
    return value + " was stored successfully";
  }
};

export const getItem = (itemName) => {
  const jsonStringifiedValue = localStorage.getItem(itemName);
  return JSON.parse(jsonStringifiedValue);
};
