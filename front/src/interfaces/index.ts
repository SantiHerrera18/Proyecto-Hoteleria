export interface IRooms {
  room_id: string;
  room_type: {
    currency: string;
    description: string;
    price: string;
    room_type_id: string;
    rooms_left: number;
  };
  type: string;
}

export interface IAmenities {
  amenities_id: string;
  pool: boolean;
  spa: boolean;
  gym: boolean;
  restaurant: boolean;
  bar: boolean;
}

export interface IHotel {
  id: number;
  name: string;
  details: {
    stars: number;
    rating?: number;
    imgUrl: string;
    description: string;
  };
  address: {
    city: string;
    country: string;
    street: string;
  };
  /* availability: {
    available: boolean;
    totalRoomsLeft: number;
}; */
  room: IRooms[];
  amenities: IAmenities;
}
