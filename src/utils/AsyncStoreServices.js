import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from './showMessage';

const STORAGE_KEY = '@user_information';
const DEFAULT_USER = {
  token: '',
  token_expired: '',
  fullName: '',
  numberId: '',
  studyProgram: '',
  faculty: '',
  studentClass: '',
  role: '',
  photo: '',
  phone: '',
  authenticated: false,
};

/**
 * Get User store as object
 * @returns {}|null
 */
const getUser = async () => {
  const user = await AsyncStorage.getItem(STORAGE_KEY);
  return user !== null ? JSON.parse(user) : DEFAULT_USER;
};

/**
 * Set User store as JSON string from given object
 * @param {object} user
 * @returns object
 */
const setUser = async user => {
  const oldUser = await getUser();
  const newUser = {
    ...oldUser,
    ...user,
    authenticated: true,
  };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
  return newUser;
};

/**
 * Remove and reset user entity
 * @returns object
 */
const deleteUser = async () => {
  const resetUser = DEFAULT_USER;
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(resetUser));
  return resetUser;
};

const storeData = async (storageKey, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(storageKey, jsonValue);
  } catch (e) {
    showMessage('Gagal menyimpan di localstorage');
  }
};

const getData = async storageKey => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    showMessage('Gagal mengambil data dari localstorage');
  }
};

const removeItem = async storageKey => {
  try {
    await AsyncStorage.removeItem(storageKey);
    return true;
  } catch (exception) {
    showMessage('Gagal remove data');
  }
};

export {getUser, removeItem, setUser, deleteUser, storeData, getData};
