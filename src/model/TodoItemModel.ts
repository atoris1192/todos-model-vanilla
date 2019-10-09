
export const sample = [
  { id: 100, title: "title1", completed: false},
  { id: 101, title: "title2", completed: true},
  { id: 102, title: "title3", completed: false},
]
let id = 0;

export class TodoItemModel {
  private id: number;
  private title: string;
  private completed: boolean;

  constructor({ title, completed }) {
    this.id = id +=1;
    this.title = title;
    this.completed = completed
  }
}