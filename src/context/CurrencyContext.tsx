import React, { createContext, useContext, useState, ReactNode } from 'react';

type Currency = 'INR' | 'LKR';

type CurrencyContextType = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  // rate meaning: 1 INR = rate LKR
  rate: number;
  setRate: (r: number) => void;
  // convert returns numeric converted amount (based on selected currency)
  convert: (amountInINR: number) => number;
  // format returns a display string including currency symbol/code
  format: (amountInINR: number) => string;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Default assumption: 1 INR = 4.6 LKR (static default). You can update the rate at runtime via context.
export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>('LKR');
  const [rate, setRate] = useState<number>(4.6);

  const convert = (amountInINR: number) => {
    return currency === 'LKR' ? amountInINR * rate : amountInINR;
  };

  const format = (amountInINR: number) => {
    const v = convert(amountInINR);
    if (currency === 'LKR') return `LKR ${v.toFixed(2)}`;
    return `₹${v.toFixed(2)}`;
  };

  return <CurrencyContext.Provider value={{ currency, setCurrency, rate, setRate, convert, format }}>
    {children}
  </CurrencyContext.Provider>;
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
};

export default CurrencyContext;
