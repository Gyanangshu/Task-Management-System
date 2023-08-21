import React from 'react'
import "./cardInfo.css"
import Modal from '../../../UI/Modal/Modal'
import { FiType } from "react-icons/fi"
import { AiOutlineUnorderedList } from "react-icons/ai"
import { SlCalender } from "react-icons/sl"
import { SlTag } from "react-icons/sl"
import { BsTrash3 } from "react-icons/bs"
import Editable from "../../Editable/Editable"
import Chip from '../../Chip/Chip'

const CardInfo = (props) => {
    const colors = [
        '#D8727D',
        '#DFA874',
        '#83C29D',
        '#8da377',
        '#9975bd',
        '#cf61a1',
        '#240959',
    ];

    const [activeColor, setActiveColor] = React.useState("")

    const [values, setValues] = React.useState({ ...props.card })

    const calculatePercentage = () => {
        if (values.tasks?.length === 0) return "0"

        const completed = values.tasks?.filter(item => item.completed)?.length

        return (completed / values.tasks?.length) * 100 + ""
    };

    const addLabel = (value, color) => {

        const index = values.labels?.findIndex((item) => item.text === value);
        if (index > -1) return;

        const label = {
            text: value,
            color,
        };
        setValues({...values, labels: [...values.labels, label] });
        setActiveColor("");
    };

    const removeLabel = (text) => {
        const tempLabels = values.labels?.filter(item => item.text!==text)

        setValues({...values, labels: tempLabels});
    }

    const addTask = (value) => {
        const task = {
            id: Date.now() + Math.random(),
            text: value,
            completed: false
        }

        setValues({...values, tasks:[...values.tasks, task]})
    }

    const removeTask = (id) => {
        const index = values.tasks?.findIndex((item) => item.id === id);
        if (index < 0) return;

        const tempTasks = values.tasks?.splice(index, 1);
        setValues({ ...values, tasks: tempTasks});
    }

    const updateTask = (id, completed) => {
        const index = values.tasks?.findIndex((item) => item.id === id);
        if (index < 0) return;

        const tempTasks = [...values.tasks];
        tempTasks[index].completed = completed;
        setValues({...values, tasks: tempTasks})
    };

    React.useEffect(() => {

        if (
            values.title === props.card?.title &&
            values.date === props.card?.date &&
            values.desc === props.card?.desc &&
            values.labels?.length === props.card?.labels?.length &&
            values.tasks?.length === props.card?.tasks?.length
        )
        return;

        props.updateCard(props.card.id, props.boardId, values)
    }, [values])

    return (
        <Modal onClose={() => props.onClose()}>
            <div className="cardinfo">
                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                        <FiType />
                        Title
                    </div>
                    <div className='cardinfo_box_body'>
                        <Editable text={values.title}
                            default={values.title}
                            placeholder="Enter Title" buttonText="Add Title"
                            onSubmit={(value) => setValues({ ...values, title: value })}
                        />
                    </div>
                </div>

                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                        <AiOutlineUnorderedList />
                        Description
                    </div>
                    <div className='cardinfo_box_body'>
                        <Editable
                            text={values.desc}
                            default={values.desc}
                            placeholder="Enter Description"
                            buttonText="Add Description"
                            onSubmit={(value) => setValues({ ...values, desc: value })}
                        />
                    </div>
                </div>

                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                        <SlCalender />
                        Date
                    </div>
                    <div className='cardinfo_box_body'>
                        <input
                            type="date"
                            defaultValue={values.date ? new Date(values.date).toISOString().substr(0, 10) : ""}
                            onChange={(event) => setValues({ ...values, date: event.target.value })
                            }
                        />
                    </div>
                </div>

                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                        <SlTag />
                        Labels
                    </div>
                    <div className="cardinfo_box_labels">
                        {
                            values.labels?.map((item, index) => <Chip 
                            close 
                            onClose={() => removeLabel(item.text)} 
                            key={item.text + index}
                            color={item.color}
                            text={item.text}
                            />)

                        }
                    </div>
                    <div className="cardinfo_box_colors">
                        {
                            colors.map((item, index) => <li key={index} style={{ backgroundColor: item }}
                                className={item === activeColor ? "active" : ""}
                                onClick={() => setActiveColor(item)}
                            />)
                        }
                    </div>
                    <div className='cardinfo_box_body'>
                        <Editable
                            text="Write Label Name" placeholder="Enter Label Name"
                            buttonText="Add Label" 
                            onSubmit={(value) => addLabel(value, activeColor)}
                            />
                    </div>
                </div>


                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                        <SlTag />
                        Tasks
                    </div>

                    <div className="cardinfo_box_progress-bar">
                        <div className={`cardinfo_box_progress`} 
                        style={{ width: calculatePercentage() + "%", backgroundColor: calculatePercentage() === "100" ? "limegreen" : "" }} />
                    </div>

                    <div className="cardinfo_box_list">
                        {
                            values.tasks?.map((item) => <div
                                key={item.id} className="cardinfo_task">
                                <input type="checkbox" defaultChecked={item.completed} 
                                onChange = {(event) => updateTask(item.id, event.target.checked)}
                                />
                                <p>{item.text}</p>
                                <BsTrash3 onClick={() => removeTask(item.id)} />
                            </div>)
                        }
                    </div>

                    <div className='cardinfo_box_body'>
                        <Editable
                            text="Add New Task" placeholder="Enter Tasks"
                            buttonText="Add Task" 
                            onSubmit={(value) => addTask(value)}
                            />
                    </div>
                </div>
            </div>
        </Modal>

    )
}

export default CardInfo
