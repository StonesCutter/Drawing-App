// Async Storage
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getStorage(string: string) {
  const storage = await AsyncStorage.getItem(string);

  let jsonStorage = JSON.parse(storage!);
  // console.log("jsonStorage UTILS", jsonStorage)
  return jsonStorage;
}

export async function setStorage(
  data: object | [] | null | boolean,
  string: string
) {
  const jsonValue = JSON.stringify(data);

  await AsyncStorage.setItem(string, jsonValue);
  // console.log("setStorage UTILS", jsonValue)
  return jsonValue;
}

export async function clearStorage(string: string) {
  await AsyncStorage.removeItem(string);
  console.log("clear storage done");
}
