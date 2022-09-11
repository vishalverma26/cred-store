export class Todo {
  constructor(public taskName: string, public endDate: string) {}
}

export interface editModel {
  editIndex?: number;
  editTask?: Todo;
  editMode?: boolean;
}
