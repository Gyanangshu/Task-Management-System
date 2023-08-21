import React from 'react'
import "./board.css"
import addSquare from "../../Images/square-color.png"
import Card from '../Card/Card'
import Editable from '../Editable/Editable'
import { AiOutlineClose } from "react-icons/ai"

const Board = (props) => {

    const [showEdit, setShowEdit] = React.useState(false);

    return (
        <div className='board'>
            {/* board top  */}
            <div className='board_top'>

                <p className="board_top_title">{props.board?.title}<span className='board_card_count'>{`${props.board?.cards?.length}`}</span>
                </p>


                <img className='add_card' src={addSquare} alt="Add" onClick={() => setShowEdit(true)} />
            </div>

            <hr style={{ color: `${props.board?.hr}` }} />

            {/* board cards  */}
            {showEdit ?
                (<div className="board_cards custom-scroll">
                    <div className='edit_field'>
                        <Editable placeholder="Enter Card Title" buttonText="Add Card" onSubmit={(value) => props.addCard(value, props.board?.id)} />
                        <AiOutlineClose className='x' onClick={() => setShowEdit(false)} />
                    </div>
                    {props.board?.cards?.map((item) => (
                        <Card
                            key={item.id}
                            card={item}
                            removeCard={props.removeCard} boardId={props.board?.id}
                            handleDragEnter={props.handleDragEnter}
                            handleDragEnd={props.handleDragEnd}
                            updateCard={props.updateCard}
                        />
                    ))}
                </div>)
                : <div className="board_cards custom-scroll">
                    {props.board?.cards?.map((item) => (
                        <Card
                            key={item.id}
                            card={item}
                            removeCard={props.removeCard} boardId={props.board?.id}
                            handleDragEnter={props.handleDragEnter}
                            handleDragEnd={props.handleDragEnd}
                            updateCard={props.updateCard}
                        />
                    ))}
                </div>
            }

        </div>
    )
}

export default Board
