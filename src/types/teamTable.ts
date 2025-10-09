

export interface Team {
  name: string;
  code: string;
  desc: string;
  email: string;
  entity: string;
  manager: string;
  created: string;
  status: string;
}

export interface Column<T> {
  header: string;
  key?: keyof T;
  render?: (row: T, index: number) => React.ReactNode;
}

export interface ActionPopupState {
  show: boolean;
  x: number;
  y: number;
  teamId: number | null;
}
