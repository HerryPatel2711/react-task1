import React from 'react'
import { Menu } from 'semantic-ui-react'

export default function Header(props) {
    return (
        <div style={{ margin: "20px" }}>
            <Menu tabular>
                <Menu.Item
                    name='Home'
                    active={props?.activeItem === 'home'}
                    onClick={() => props?.setActiveItem("home")}
                />
                <Menu.Item
                    name='Task Crud'
                    active={props?.activeItem === 'taskCrud'}
                    onClick={() => props?.setActiveItem("taskCrud")}
                />
                <Menu.Item
                    name='Task List'
                    active={props?.activeItem === 'taskList'}
                    onClick={() => props?.setActiveItem("taskList")}
                />
            </Menu>
        </div>
    )
}
