import { element } from './view/html-util';
import { EventEmitter } from './EventEmitter'
import { sample, TodoItemModel } from './model/TodoItemModel';

class TodoListModel extends EventEmitter {
  private items: any;
  constructor(items = []) {
    super();
    this.items = items;
  }
  getTodoItems() {
    return this.items;
  }
  setTodoItems(items) {
    this.items = items
  }
  getTotalCount() {
    return this.items.length;
  }
  addTodo(item){
    this.items.push(item);
  }
  checkboxTodo({ id, completed }) {
    const item = this.items.find( item => {
      return item.id === id
    })
    item.completed = !item.completed
    // this.emit('update');
  }
  deleteTodo({ id }) {
    const items = this.items.filter( item => {
      return item.id !== id
    })
    this.items = items
  }
}

export class App {
  private todoListModel: any;
  constructor() {
    this.todoListModel = new TodoListModel()
  }
  main() {
    const todoList = document.querySelector('#js-todo-list');
    const todoCount = document.querySelector('#js-todo-count');
    const jsForm = document.querySelector('#js-form');
    const jsFormInput: any = document.querySelector('#js-form-input');
    this.todoListModel.setTodoItems(sample)

    this.todoListModel.addEventListener('update', () => {
      const items = this.todoListModel.getTodoItems();
      const totalCount = this.todoListModel.getTotalCount();
      const ul = document.createElement('ul');

      items.forEach( item => {
        const listElement = item.completed
                  ? element`<li><input type="checkbox" class="checkbox" checked /><del>${ item.title }</del><button class="delete" >x</button></li>`
                  : element`<li><input type="checkbox" class="checkbox" />${ item.title }<button class="delete" >x</button></li>`
        ul.appendChild(listElement)
        // CheckBoxTodo
        const checkboxElement = listElement.querySelector('.checkbox');
        checkboxElement.addEventListener('change', () => {
          this.todoListModel.checkboxTodo({
            id: item.id,
            completed: !item.completed,
          })
          this.todoListModel.emit('update');
        })
        // deleteTodo
        const deleteElement = listElement.querySelector('.delete');
        deleteElement.addEventListener('click', () => {
          this.todoListModel.deleteTodo({
            id: item.id,
           }) 
          this.todoListModel.emit('update');
        })
      });
      todoList.textContent = '';
      todoList.appendChild(ul);
      todoCount.textContent = `Todo Count: ${ this.todoListModel.getTotalCount() }`
    })
    this.todoListModel.emit('update');


    jsForm.addEventListener('submit', (event) => {
      event.preventDefault();
      console.log("submit....");

      this.todoListModel.addTodo( new TodoItemModel({
        title: jsFormInput.value,
        completed: false,
      }))      
      jsFormInput.value = '';
      this.todoListModel.emit('update')
    })


  }
}