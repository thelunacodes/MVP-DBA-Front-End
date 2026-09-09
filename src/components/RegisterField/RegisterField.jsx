import "./RegisterField.css"


export default function RegisterField({labelText, identifier, inputType, inputValue, action, isRequired=true}) {

    return (
        <div className="registerField">
            <label className="semibold" htmlFor={identifier}>{labelText}</label>
            <input className="registerInput" 
                type={inputType}
                name={identifier}
                id={identifier} 
                value={inputValue} 
                onChange={action} 
                required={isRequired} />
        </div>
    )
}