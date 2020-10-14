export interface PriceLevel
{
    timeStamp: Date;
    price: number;
    priceRange: number;
    tradeType: string;
    active: boolean;
    market: string;

    granularity: string;
    lastUpdated: Date;
}