import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "./assets/logo.svg";
import { palette } from "./styles";
import Input from "./components/Input";
import Button from "./components/Button";
import History from "./components/History";
import { useLocalStorage } from "./hooks/useLocalStorage";
import CurrencyWithRates from "./components/CurrencyWithRates";

function App() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const { data, setData } = useLocalStorage<string[]>(
    "historicalConversions",
    []
  );

  const convertAmount = async () => {
    const response = await fetch(
      `http://localhost:3002/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
    );

    const { convertedAmount } = await response.json();
    setConvertedAmount(convertedAmount);
    setData((currentState: string[]) => [...currentState, convertedAmount]);
  };

  return (
    <div>
      <StyledHeader>
        <Logo title="Cleo" />
        <p>Currency Converter</p>
      </StyledHeader>
      <ContentContainer>
        <ConverterContainer>
          <Input
            label="amount"
            onChange={(value) => setAmount(value)}
            value={amount}
          />

          <Input
            label="from currency"
            onChange={(value) => setFromCurrency(value)}
            value={toCurrency}
          />

          <Input
            label="to currency"
            onChange={(value) => setToCurrency(value)}
            value={toCurrency}
          />
          <Button onClick={convertAmount}>Convert</Button>
          <span>{convertedAmount}</span>
        </ConverterContainer>
      </ContentContainer>
      <CurrencyWithRates />
      <History history={data} />
    </div>
  );
}

const StyledHeader = styled.header`
  height: 280px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  background-color: ${palette.blue};
  color: ${palette.white};
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConverterContainer = styled.div`
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
  width: 400px;
  margin-top: -50px;
  background-color: ${palette.white};
  padding: 36px 30px;
`;
export default App;
