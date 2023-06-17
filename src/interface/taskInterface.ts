export interface ITaskField {
  id?: number;
  user?: string;
  photo?: string | null;
  finished?: boolean;
  title?: string;
  description?: string;
}

export interface IGetAllTask {
    message: string;
    data: ITaskField[]
  }