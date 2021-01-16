export interface Trade
{
    id: string;
    buySell: string;
    market: string;
    strategy: string;
    success: boolean
    priceLevelTimestamp: Date;
    riskReward: number;

    entryPrice: number
    exitPrice: number
    targetPrice: number

    price: number
    timestamp: Date;
    lastUpdated: Date;
}