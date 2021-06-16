import { Types } from '@osu-wams/lib';

export interface ResourceListItemProps {
  resource: Types.Resource;
  itStatus: {
    isSuccess: boolean;
    data: {
      name: string;
      status: number;
      statusText: string;
    }[];
  };
  eventCategory: string;
  eventAction: string;
  draggable?: boolean;
  index?: number;
}
