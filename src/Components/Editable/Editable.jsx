import React from 'react';
import "./editable.css";

const Editable = (props) => {
    
    const [inputValue, setInputValue] = React.useState(props.default || "")

    return (
        <div className='editable'>
            <form className={`editable_edit ${props.editClass || ""}`}
                onSubmit={(e) => {
                    e.preventDefault()
                    if (props.onSubmit)props.onSubmit(inputValue);
                    setInputValue("");
                    
                }}
            >
                <input
                    type="text"
                    autoFocus
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={props.placeholder || "Enter Title"}
                />
                <div className="editable_edit_footer">
                    <button type='submit'>{props.buttonText || "Add"}</button>
                </div>
            </form>
        </div>
    )
}

export default Editable
