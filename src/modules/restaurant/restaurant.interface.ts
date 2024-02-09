export interface IResturant {
    id: number,
    name: string,
    serveStartTime: number,
    serveEndTime: number,
    createdAt: Date
}

export type ICreateResturantRequest = Omit<IResturant, 'id' | 'createdAt'>;

export interface IGetResturantRequest{
    deliveryTime: string
}