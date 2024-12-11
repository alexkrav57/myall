import React, { useEffect, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import { motion } from "framer-motion";
import styled from "styled-components";

interface Item {
  id: number;
  title: string;
  description: string;
  url: string;
  icon: string;
}

interface ListItemProps {
  item: Item;
  index: number;
  isSelected: boolean;
  onClick: (id: number) => void;
}

const ListItem: React.FC<ListItemProps> = ({
  item,
  index,
  isSelected,
  onClick,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSelected && itemRef.current) {
      itemRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [isSelected]);

  return (
    <Draggable draggableId={`item-${item.id}`} index={index}>
      {(provided, snapshot) => (
        <StyledItem
          ref={(el) => {
            itemRef.current = el;
            provided.innerRef(el);
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onClick(item.id)}
          $isDragging={snapshot.isDragging}
          $isSelected={isSelected}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Icon>{item.icon}</Icon>
          <Content>
            <Title>{item.title}</Title>
            <Description>{item.description}</Description>
          </Content>
        </StyledItem>
      )}
    </Draggable>
  );
};

interface StyledItemProps {
  $isDragging: boolean;
  $isSelected: boolean;
}

const StyledItem = styled(motion.div)<StyledItemProps>`
  display: flex;
  align-items: center;
  padding: 8px;
  margin: 4px;
  background-color: ${({ $isDragging, $isSelected }) =>
    $isDragging ? "#e0e0e0" : $isSelected ? "#f0f0f0" : "white"};
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${({ $isSelected }) =>
      $isSelected ? "#f0f0f0" : "#fafafa"};
  }
`;

const Icon = styled.span`
  font-size: 24px;
  margin-right: 12px;
`;

const Content = styled.div`
  flex: 1;
  min-width: 0;
`;

const Title = styled.div`
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const Description = styled.div`
  font-size: 0.9em;
  color: #666;
`;

export default ListItem;
