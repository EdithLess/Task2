class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class CircularDoublyLinkedList {
  constructor() {
    this.head = null;
  }

  // 1. Формування списку
  createList(numElements) {
    this.head = null;
    let current = null;
    for (let i = 0; i < numElements; i++) {
      const newNode = new Node(i + 1);
      if (!this.head) {
        this.head = newNode;
        this.head.next = this.head;
        this.head.prev = this.head;
      } else {
        newNode.prev = current;
        current.next = newNode;
        newNode.next = this.head;
        this.head.prev = newNode;
      }
      current = newNode;
    }
  }

  // 2. Виведення списку
  printList() {
    if (!this.head) return "Список порожній.";
    const result = [];
    let current = this.head;
    do {
      result.push(current.value);
      current = current.next;
    } while (current !== this.head);
    return result.join(" <-> ");
  }

  // 3. Пошук елемента
  find(value) {
    if (!this.head) return null;
    let current = this.head;
    do {
      if (current.value == value) return current;
      current = current.next;
    } while (current !== this.head);
    return null;
  }

  // 4. Вставка перед елементом
  insertBefore(targetValue, newValue) {
    const target = this.find(targetValue);
    if (!target) return `Елемент зі значенням ${targetValue} не знайдено.`;
    const newNode = new Node(newValue);
    newNode.next = target;
    newNode.prev = target.prev;
    target.prev.next = newNode;
    target.prev = newNode;
    if (this.head === target) this.head = newNode;
    return "Елемент вставлено перед.";
  }

  // 5. Вставка після елемента
  insertAfter(targetValue, newValue) {
    const target = this.find(targetValue);
    if (!target) return `Елемент зі значенням ${targetValue} не знайдено.`;
    const newNode = new Node(newValue);
    newNode.prev = target;
    newNode.next = target.next;
    target.next.prev = newNode;
    target.next = newNode;
    return "Елемент вставлено після.";
  }

  // 6. Видалення елемента
  delete(value) {
    const target = this.find(value);
    if (!target) return `Елемент зі значенням ${value} не знайдено.`;
    if (target.next === target) {
      this.head = null; // Останній елемент
    } else {
      target.prev.next = target.next;
      target.next.prev = target.prev;
      if (this.head === target) this.head = target.next;
    }
    return "Елемент видалено.";
  }
}

// Ініціалізація списку
const list = new CircularDoublyLinkedList();

// Функції для роботи з DOM
function createList() {
  const num = prompt("Введіть кількість елементів у списку:");
  list.createList(Number(num));
  document.getElementById("output").textContent = "Список створено.";
}

function printList() {
  const output = list.printList();
  document.getElementById("output").textContent = output;
}

function findElement() {
  const value = prompt("Введіть значення для пошуку:");
  const found = list.find(value);
  document.getElementById("output").textContent = found
    ? `Елемент знайдено: ${found.value}`
    : "Елемент не знайдено.";
}

function insertBefore() {
  const target = prompt("Перед яким значенням вставити?");
  const value = prompt("Нове значення:");
  const message = list.insertBefore(target, value);
  document.getElementById("output").textContent = message;
}

function insertAfter() {
  const target = prompt("Після якого значення вставити?");
  const value = prompt("Нове значення:");
  const message = list.insertAfter(target, value);
  document.getElementById("output").textContent = message;
}

function deleteElement() {
  const value = prompt("Яке значення видалити?");
  const message = list.delete(value);
  document.getElementById("output").textContent = message;
}
