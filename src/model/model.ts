interface Item {
  id: number;
  categoryId: number;
  title: string;
  description: string;
  url: string;
  icon: string;
}

interface Category {
  id: number;
  name: string;
}

class Model {
  private items: Item[];
  private categories: Category[];
  private listeners: Set<() => void>;

  private initialItems: Item[] = [
    {
      id: 1,
      categoryId: 1,
      title: "Гугл",
      description: "google.com",
      url: "https://google.com",
      icon: "👀",
    },
    {
      id: 2,
      categoryId: 1,
      title: "Яндекс",
      description: "yandex.ru",
      url: "https://yandex.ru",
      icon: "🔍",
    },
    {
      id: 3,
      categoryId: 2,
      title: "Иносми",
      description: "inoshmi.ru",
      url: "https://inosmi.ru",
      icon: "🌍",
    },
    {
      id: 4,
      categoryId: 2,
      title: "СтранаUA",
      description: "strana.ua",
      url: "https://strana.today",
      icon: "🇺🇦",
    },
    {
      id: 5,
      categoryId: 3,
      title: "MyAll Chat",
      description: "Misha, Sasha & Alex",
      url: "https://www.facebook.com/messages/t/8699950900038782/",
      icon: "✋",
    },
    {
      id: 6,
      categoryId: 1,
      title: "Chrome Extensions",
      description: "extensions.chrome.com",
      url: "chrome://extensions/",
      icon: "🖥️",
    },
    {
      id: 7,
      categoryId: 3,
      title: "Вопросы (Google Docs)",
      description: "docs.google.com",
      url: "https://docs.google.com/document/d/1PH2g2U36aE7-ddFed7iCIhMJuWVgkCg_NuDcsVU24Fg/edit?usp=sharing",
      icon: "💾",
    },
  ];

  constructor() {
    this.categories = [
      { id: 1, name: "Избранное" },
      { id: 2, name: "Мировые новости" },
      { id: 3, name: "Обсуждения" },
      { id: 4, name: "New Items" },
    ];

    const savedItems = localStorage.getItem("panelItems");
    this.items = savedItems ? JSON.parse(savedItems) : this.initialItems;
    this.listeners = new Set();
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  getCategories(): Category[] {
    return this.categories;
  }

  getItems(): Item[] {
    return this.items;
  }

  addItem(item: Omit<Item, "id">): Item {
    const newItem = {
      ...item,
      id: Date.now(),
    };
    this.items.push(newItem);
    this.saveItems();
    this.notify();
    return newItem;
  }

  removeItem(id: number): void {
    this.items = this.items.filter((item) => item.id !== id);
    this.saveItems();
    this.notify();
  }

  moveItem(itemId: number, newCategoryId: number): void {
    const item = this.items.find((item) => item.id === itemId);
    if (item) {
      item.categoryId = newCategoryId;
      this.saveItems();
      this.notify();
    }
  }

  private saveItems(): void {
    localStorage.setItem("panelItems", JSON.stringify(this.items));
  }
}

// Create a singleton instance
const model = new Model();

export type { Item, Category };
export { model };
