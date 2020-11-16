export interface Price
{
    market: string;
    granularity: string;
    bid: number;
    ask: number;

    tickQty: number;
    timeStamp: Date;
}
