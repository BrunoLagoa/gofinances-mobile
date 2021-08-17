import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { Container, Icon, Title, Button } from "./styles";

interface Props extends RectButtonProps {
  type: "income" | "outcome";
  title: string;
  isActive: boolean;
}

const icons = {
  income: "arrow-up-circle",
  outcome: "arrow-down-circle",
};

function TransactionTypeButton({ type, title, isActive, ...rest }: Props) {
  return (
    <Container type={type} isActive={isActive}>
      <Button {...rest}>
        <Icon name={icons[type]} type={type} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
}

export { TransactionTypeButton };
