import React from 'react';
import { FiMoreHorizontal } from "react-icons/fi";
import { BsClockHistory } from "react-icons/bs";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import "./card.css";
import Chip from '../Chip/Chip';
import CardInfo from './CardInfo/CardInfo';

const Card = (props) => {

    const [showModal, setShowModal] = React.useState(false)

    return (
        <>
        {showModal && <CardInfo 
        card={props.card}
        updateCard={props.updateCard}
        boardId={props.boardId}
        onClose={() => setShowModal(false)}/>}
        
        <div className='card'
            draggable
            onDragEnd={() => props.handleDragEnd(props.card?.id, props.boardId)}
            onDragEnter={() => props.handleDragEnter(props.card?.id, props.boardId)}
            onClick={() => setShowModal(true)}
            >

            <div className="card_top">
                <div className="card_top_labels">
                    {props.card?.labels?.map((item, index) => (
                        <Chip key={index} text={item.text} color={item.color} />
                    ))}
                </div>
                <div className="card_top_more" >
                    <BsTrash3 onClick={() => props.removeCard(props.card?.id, props.boardId)} />
                </div>
            </div>

            {/* card content  */}
            <div className="card_title">
                {props.card?.title}
            </div>
            <div className="card_desc">
                {props.card?.desc}
            </div>
            <div className="card_footer">
                {props.card?.date && (
                    <p><BsClockHistory />
                        {props.card?.date}
                    </p>
                )}
                { props.card?.tasks?.length > 0 &&
                    <p>
                    <AiOutlineCheckSquare />
                    {props.card?.tasks?.filter((item) => item.completed).length}/{props.card?.tasks?.length}
                </p>
                }
                
            </div>
        </div>
        </>
    )
}

export default Card
