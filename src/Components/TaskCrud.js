import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Checkbox, Form, Modal, Table } from 'semantic-ui-react';
import { taskList } from '../redux/actions';

export default function TaskCrud() {
    const [openModal, setOpenModal] = useState(false)
    const dispatch = useDispatch();

    const [listOfTask, setlistOfTask] = useState(useSelector(state => state.taskList))
    const [operation, setOperation] = useState("add")
    const [currentData, setCurrentData] = useState({})
    const [taskCount, setTaskCount] = useState({})
    const handleDelete = (deleteTaskId) => {
        const result = listOfTask?.filter(task => task?.id !== deleteTaskId)
        setlistOfTask(result)
        dispatch(taskList(result));
    }
    const handleUpdate = (data) => {
        const dataForAdd = {
            id: data?.id,
            taskName: data?.taskName,
            description: data?.description,
            status: data?.status,
            dueDate: data?.dueDate
        }
        const result = listOfTask?.filter(task => task?.id !== data?.id)
        result?.push(dataForAdd)
        setlistOfTask(result)
        setOpenModal(false)
        dispatch(taskList(result));
    }
    const handleAdd = (data) => {
        const dataForAdd = {
            id: "#task" + Math.floor(Math.random() * (999 - 100 + 1) + 100),
            taskName: data?.taskName,
            description: data?.description,
            status: data?.status,
            dueDate: data?.dueDate
        }
        const tempData = [...listOfTask]
        tempData?.push(dataForAdd)
        setlistOfTask(tempData)
        setOpenModal(false)
        dispatch(taskList(tempData));
    }
    const handleOperation = () => {
        if (operation === "add") {
            handleAdd(currentData)
        } else {
            handleUpdate(currentData)
        }
    }

    useEffect(() => {
        const tempTaskCount = {
            inComplete: 0,
            complete: 0
        }
        listOfTask?.map((element) => {
            element?.status ? (tempTaskCount.complete += 1) : (tempTaskCount.inComplete += 1)
        })
        setTaskCount(tempTaskCount)
    }, [listOfTask])

    return (
        <div style={{ margin: "20px" }}>
            {/* Task Count */}
            <div style={{ margin: "auto", width: "60%" }} >
                <Card.Group items={[
                    { header: "Total Complete Task", description: taskCount?.complete },
                    { header: "Total in-Complete Task", description: taskCount?.inComplete }
                ]} />
            </div>

            {/* Table For List Task */}
            <div style={{ margin: "30px" }}>
                <Button primary style={{ float: "right", margin: "10px" }} onClick={() => { setOpenModal(true); setCurrentData({}); setOperation("add") }}>+ Add</Button>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Task Id</Table.HeaderCell>
                            <Table.HeaderCell>Task Name</Table.HeaderCell>
                            <Table.HeaderCell>Task Descriptiom</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Due Date</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            listOfTask?.map((task) => {
                                return (
                                    <Table.Row>
                                        <Table.Cell>{task?.id}</Table.Cell>
                                        <Table.Cell>{task?.taskName}</Table.Cell>
                                        <Table.Cell>{task?.description}</Table.Cell>
                                        <Table.Cell>{task?.status ? "Complete" : "in-complete"}</Table.Cell>
                                        <Table.Cell>{task?.dueDate}</Table.Cell>
                                        <Table.Cell>
                                            <Button color='yellow' onClick={() => { setCurrentData(task); setOpenModal(true); setOperation("update") }}>Edit</Button>
                                            <Button color='google plus' onClick={() => handleDelete(task?.id)}>Delete</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })
                        }
                    </Table.Body>
                </Table>
            </div>
            {/* Add & Update Modal */}
            <Modal
                closeIcon
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
                open={openModal}
                size="tiny"
            >
                <Modal.Header style={{ textAlign: "center" }}>{operation === "add" ? "Add New Task" : "Update Task"}</Modal.Header>
                <Modal.Content >
                    <Form style={{ with: "25%" }}>
                        <Form.Field>
                            <label>Task Name</label>
                            <input placeholder='Task Name' value={currentData?.taskName} onChange={(e) => setCurrentData({ ...currentData, taskName: e.target.value })} />
                        </Form.Field>
                        <Form.Field>
                            <label>Task Description</label>
                            <input placeholder='Description' value={currentData?.description} onChange={(e) => setCurrentData({ ...currentData, description: e.target.value })} />
                        </Form.Field>
                        <Form.Field>
                            <label>Due Date</label>
                            <input placeholder='Due Date' type="date" value={moment(currentData?.dueDate).format("YYYY-MM-DD")} onChange={(e) => setCurrentData({ ...currentData, dueDate: e.target.value })} />
                        </Form.Field>
                        <Form.Field style={{ marginTop: "5px" }}>
                            <Checkbox label='Complete or Not ?' checked={currentData?.status} value={currentData?.status} onChange={(e, data) => { setCurrentData({ ...currentData, status: data?.checked }) }} />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => setOpenModal(false)}>
                        Cancel
                    </Button>
                    <Button color='black' onClick={() => handleOperation()}>
                        {operation === "add" ? "+ Add" : "Update"}
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
}