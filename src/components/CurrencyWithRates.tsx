import React, { useEffect, useState } from "react";
import Select from "./Select";

export default function CurrencyWithRates() {
  const [rates, setRates] = useState<Record<string, string>>({});
  const [currency, setCurrency] = useState("USD");
  const [currencies, setCurrencies] = useState<string[]>([]);

  const fetchRates = async () => {
    const response = await fetch(`http://localhost:3002/rates/${currency}`);
    const { rates }: { rates: Record<string, string> } = await response.json();

    setRates(rates);
  };
  const fetchCurrencies = async () => {
    const response = await fetch(`http://localhost:3002/currencies`);
    const currencyCodes: Record<string, string> = await response.json();

    setCurrencies(Object.entries(currencyCodes).map(([key, value]) => key));
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    fetchRates();
  }, [currency]);

  return (
    <div>
      <Select
        value={currency}
        items={currencies}
        onSelect={(value) => setCurrency(value)}
      />
      {Object.entries(rates).map(([code, rate]) => (
        <p key={code}>
          {code} - {rate}
        </p>
      ))}
    </div>
  );
}
