import React from "react";

import {
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastTransaction,
} from "./styles";

interface IHighlightCardProps {
  title: string;
  amount: string;
  lastTransaction: string;
  type: "income" | "outcome" | "total";
}

const icon = {
  income: "arrow-up-circle",
  outcome: "arrow-down-circle",
  total: "dollar-sign",
};

function HighlightCard({
  type,
  title,
  amount,
  lastTransaction,
}: IHighlightCardProps) {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icon[type]} type={type} />
      </Header>

      <Footer>
        <Amount type={type}>{amount}</Amount>
        <LastTransaction type={type}>{lastTransaction}</LastTransaction>
      </Footer>
    </Container>
  );
}

export { HighlightCard };
