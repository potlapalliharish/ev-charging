const STORAGE_KEY = 'requests';

function readData() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error(err);
    return [];
  }
}

function writeData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
}

function createItem(item) {
  const data = readData();
  item.id = Date.now();
  data.push(item);
  writeData(data);
  return item;
}

function readItem(id) {
  const data = readData();
  return data.find((item) => item.id === id);
}

function readAllItems() {
  return readData();
}

function updateItem(name, updates) {
  const data = readData();
  const index = data.findIndex((item) => item.name === name);
  if (index !== -1) {
    data[index] = { ...data[index], ...updates };
    writeData(data);
    return data[index];
  }
}

function deleteItem(name) {
  const data = readData();
  const index = data.findIndex((item) => item.name === name);
  if (index !== -1) {
    const deletedItem = data.splice(index, 1)[0];
    writeData(data);
    return deletedItem;
  }
}

module.exports = {
    createItem,
    readItem,
    readAllItems,
    updateItem,
    deleteItem
  };