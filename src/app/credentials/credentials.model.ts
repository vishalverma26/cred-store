import { Todo } from "../todo/todo.model";

export class Credential {
  constructor(public credentialName: string, public imageUrl: string, public description: string, public taskList?: Todo[]) {}
}
