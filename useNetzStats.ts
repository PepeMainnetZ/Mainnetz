import { useState, useEffect } from "react";

export type NetzStats = {
  average_block_time: number;
  coin_image: null | string;
  coin_price: string;
  coin_price_change_percentage: number;
  gas_price_updated_at: string;
  gas_prices: {
    average: number;
    fast: number;
    slow: number;
  };
  gas_prices_update_in: number;
  gas_used_today: string;
  market_cap: string;
  network_utilization_percentage: number;
  static_gas_price: null | number;
  total_addresses: string;
  total_blocks: string;
  total_gas_used: string;
  total_transactions: string;
  transactions_today: string;
  tvl: null | string;
};

export const useNetzStats = () => {
  const [data, setData] = useState<NetzStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [trigger, setTrigger] = useState(0); // Add this line

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://netzexplorer.io/api/v2/stats");
        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred."));
        }
        setIsLoading(false);
      }
    };

    fetchData();
  }, [trigger]);

  const refetch = () => {
    setTrigger((value) => value + 1); // Increment trigger to refetch data
  };

  return { data, isLoading, error, refetch };
};
