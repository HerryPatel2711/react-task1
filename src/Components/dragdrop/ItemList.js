import React from 'react';
import { Draggable } from "react-beautiful-dnd";
import { Card } from 'semantic-ui-react';
export default function ItemList({ item, index }) {
    return (
        <Draggable
            key={item.id}
            draggableId={item.id}
            index={index}
        >
            {(provided, snapshot) => {
                return (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        {...snapshot.isDragging}
                        style={{
                            userSelect: "none",
                            padding: 16,
                            margin: "0 0 8px 0",
                            minHeight: "50px",
                            backgroundColor: snapshot.isDragging
                                ? "#d9b3ff"
                                : "#ffb3b3",
                            ...provided.draggableProps.style
                        }}
                    >
                        <h4>{item?.id}</h4>
                        <Card.Group items={[
                            { header: item?.taskName, description: item?.description, meta: "Due Date : " + item?.dueDate },
                        ]} />
                    </div>
                );
            }}
        </Draggable>
    )
}
