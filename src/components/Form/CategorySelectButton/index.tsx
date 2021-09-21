import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Category, Icon } from './styles';

interface Props extends RectButtonProps {
  title: string;
  onPress: () => void;
}

function CategorySelectButton({ title, testID, onPress }: Props) {
  return (
    <Container onPress={onPress} testID={testID}>
      <Category>{title}</Category>
      <Icon name='chevron-down' />
    </Container>
  );
}

export { CategorySelectButton };
