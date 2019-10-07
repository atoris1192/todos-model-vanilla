let todoIdx = 0;

export class TodoItemModel {
  public id; number;
  private title: string;
  private completed: boolean;

  constructor({ title, completed }) {
    this.id = todoIdx += 1;
    this.title = title;
    this.completed = completed;
  }
}