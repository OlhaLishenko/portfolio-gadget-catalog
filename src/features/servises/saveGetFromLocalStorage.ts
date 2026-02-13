export function loadFromLocalStorage<V>(key: string): V[] {
  const storagedVal = localStorage.getItem(key);

  return storagedVal !== null ? JSON.parse(storagedVal) : [];
}

export function saveToLocalStorage<P>(key: string, newValue: P): void {
  localStorage.setItem(key, JSON.stringify(newValue));
}
