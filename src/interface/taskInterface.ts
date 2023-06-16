export interface IGetAllTask {
    message: string;
    data: {
      id: number;
      user: string;
      photo: string | null;
      finished: boolean;
      title: string;
      description: string;
      created_at: string;
      updated_at: string;
    }[];
  }