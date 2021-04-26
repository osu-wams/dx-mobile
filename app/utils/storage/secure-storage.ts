import * as SecureStorage from 'expo-secure-store'

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export async function loadString(key: string): Promise<string | null> {
  try {
    if (await SecureStorage.isAvailableAsync()) {
      return await SecureStorage.getItemAsync(key)
    }
    return null
  } catch {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return null
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function saveString(key: string, value: string): Promise<boolean> {
  try {
    if (await SecureStorage.isAvailableAsync()) {
      await SecureStorage.setItemAsync(key, value)
      return true
    }
    return false
  } catch {
    return false
  }
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export async function load<T>(key: string): Promise<T | null> {
  try {
    if (await SecureStorage.isAvailableAsync()) {
      const almostThere = await SecureStorage.getItemAsync(key)
      return JSON.parse(almostThere)
    }
    return null
  } catch {
    return null
  }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function save<T>(key: string, value: T): Promise<boolean> {
  try {
    const ready = await SecureStorage.isAvailableAsync()
    if (ready) {
      await SecureStorage.setItemAsync(key, JSON.stringify(value))
      return true
    }
    return false
  } catch (err) {
    return false
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export async function remove(key: string): Promise<void> {
  try {
    if (await SecureStorage.isAvailableAsync()) {
      await SecureStorage.deleteItemAsync(key)
    }
  } catch {}
}
