import React from "react";

import { categories } from "../../utils/categories";

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from "./styles";

export interface ITransactionCardProps {
  type: "income" | "outcome";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface TransactionCardProps {
  data: ITransactionCardProps;
}

function TransactionCard({ data }: TransactionCardProps) {
  const [category] = categories.filter((item) => item.key === data.category);

  return (
    <Container>
      <Title>{data.name}</Title>

      <Amount type={data.type}>
        {data.type === "outcome" && "- "}
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>

        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}

export { TransactionCard };
