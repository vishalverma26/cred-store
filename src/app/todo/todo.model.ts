export class Todo {
  // endDate should be in 'yyyy-mm-dd' format
  constructor(public taskName: string, public endDate: string) {}
}

export interface editModel {
  editIndex?: number;
  editTask?: Todo;
  editMode?: boolean;
}
