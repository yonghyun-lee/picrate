export type Field = {
  id?: number;
  label: string;
  x: number;
  y: number;
  rate: number | null;
  isOpen: boolean;
  isEdit: boolean;
};

export type CardData = {
  data: {
    id: number;
    created_at: string;
    modified_at: string;
    image: {
      id: number;
      org_name: string;
      hash_name: string;
      type: string;
      size: number;
    };
    ratings: [
      {
        id: number;
        x: number;
        y: number;
        rate: null | number;
        label: string;
      },
      {
        id: number;
        x: number;
        y: number;
        rate: null | number;
        label: string;
      }
    ];
  };
  error: null;
};
