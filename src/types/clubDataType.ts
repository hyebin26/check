type ClubType = {
  id: string;
  name: string;
  type: string;
  place: string;
  coverUrl: string;
  meetings: {
    order: number;
    endedAt: string;
    startedAt: string;
  }[];
  description: string;
};

type ClubDataType = {
  club: ClubType;
  price: number;
  leaders: { name: string }[];
  partners: { name: string }[];
  createdAt: string;
};

export default ClubDataType;
