import React, { useState, FC } from 'react';
import { nanoid } from 'nanoid';
import { CardBase } from './StyledCardComponents';
import { CardProps } from './card.props';

const CardContext = React.createContext<any>(null);

const Card: FC<CardProps> = ({ children, collapsing = true, ...props }) => {
  // Generate a unique id for linking header to controlled content
  const uuid = nanoid();
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => setCollapsed(!collapsed);
  const collapsible = collapsing;
  const value = { collapsed, toggleCollapsed, collapsible, uuid };

  return (
    <CardBase css={{ padding: 0 }} {...props}>
      <CardContext.Provider value={value}>{children}</CardContext.Provider>
    </CardBase>
  );
};

export { Card, CardContext };
