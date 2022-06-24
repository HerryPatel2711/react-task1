import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import ItemList from './ItemList';

export default function DraggableElement({ column, columnId }) {
    return (
        <>
            <h2>{column.name}</h2>
            <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                        return (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                {...snapshot.isDraggingOver}
                                style={{
                                    background: snapshot.isDraggingOver
                                        ? "lightblue"
                                        : "#99ffff",
                                    padding: 4,
                                    width: 250,
                                    minHeight: 500
                                }}
                            >
                                {column.items.map((item, index) => {
                                    return (
                                        <ItemList item={item} index={index} />
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        );
                    }}
                </Droppable>
            </div>
        </>
    )
}
