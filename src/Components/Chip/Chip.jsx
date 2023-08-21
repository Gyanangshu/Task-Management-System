import React from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai"
import "./chip.css"

const Chip = (props) => {
  return (
    <div className='chip' style={{ backgroundColor: props.color }}>
      {props.text}
      {props.close && <AiOutlineCloseCircle onClick={() => props.onClose ? props.onClose() : ""} />}
    </div>
  )
}

export default Chip
