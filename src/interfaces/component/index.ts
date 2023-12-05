export enum SetComponet {
  GET = 1,
  CREATE = 2,
  UPDATE = 3,
  DELETE = 4,
}

export interface SelecteComponet {
  [key: number]: JSX.Element;
}
