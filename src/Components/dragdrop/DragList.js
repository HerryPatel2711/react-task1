import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { taskList } from "../../redux/actions";
import DraggableElement from "./DraggableElement";


export default function DragList() {

    const initialList = useSelector(state => state.taskList);
    const dispatch = useDispatch();

    const [columns, setColumns] = useState({});
    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            });
            if (result?.destination?.droppableId === "item1") {
                const tempResult1 = sourceItems;
                var finalResult = []
                tempResult1?.map((element) => {
                    element.status = true
                    finalResult?.push(element)
                })
                const tempResult2 = destItems;
                tempResult2?.map((element) => {
                    element.status = false
                    finalResult?.push(element)
                })
                dispatch(taskList(finalResult));

            }
            if (result?.destination?.droppableId === "item2") {
                const tempResult1 = destItems;
                var finalResult = []
                tempResult1?.map((element) => {
                    element.status = true
                    finalResult?.push(element)
                })
                const tempResult2 = sourceItems;
                tempResult2?.map((element) => {
                    element.status = false
                    finalResult?.push(element)
                })
                dispatch(taskList(finalResult));
            }
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            });
            if (result?.destination?.droppableId === "item2") {
                var finalResult1 = columns["item1"]?.items
                copiedItems?.map((element) => {
                    return (finalResult1?.push(element))
                })
                dispatch(taskList(finalResult1));
            } else {
                var finalResult2 = columns["item2"]?.items
                copiedItems?.map((element) => {
                    return (finalResult2?.push(element))
                })
                dispatch(taskList(finalResult2));
            }
        }
    };
    useEffect(() => {
        var tempList = {
            complete: [],
            inComplete: []
        }
        initialList?.filter((element) => {
            if (element?.status) {
                tempList?.complete?.push(element)
            } else {
                tempList?.inComplete?.push(element)
            }
        })
        const temp1 = {
            "item1": {
                name: "in-Complete",
                items: tempList?.inComplete || []
            },
            "item2": {
                name: "Complete",
                items: tempList?.complete || []
            }
        }
        setColumns(temp1)
    }, [initialList])

    return (
        <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
            <DragDropContext
                onDragEnd={result => onDragEnd(result, columns, setColumns)}
            >
                {Object.entries(columns).map(([columnId, column], index) => {
                    return (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}
                            key={columnId}
                        >
                            <DraggableElement columnId={columnId} column={column} />
                        </div>
                    );
                })}
            </DragDropContext>
        </div>
    );
}
