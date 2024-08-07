export function getStoredHeartedItems() {
  const stored = localStorage.getItem("heartedItems");
  return stored ? JSON.parse(stored) : [];
}

export function setStoredHeartedItems(items: string[]) {
  localStorage.setItem("heartedItems", JSON.stringify(items));
}
