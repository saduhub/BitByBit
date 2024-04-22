// eslint-disable-next-line
function RadioButtonGroup({ label, name, options, value, onChange }) {
    const stringValue = String(value);  
    return (
        <div>
            <label>{label}</label>
            {/* eslint-disable-next-line */}
            {options.map(option => (
                <label key={option}>
                    <input
                        type="radio"
                        name={name}
                        value={option}
                        checked={stringValue === option}
                        onChange={onChange} /> {option === "true" ? "Yes" : option === "false" ? "No" : "N/A"}
                </label>
            ))}
        </div>
    );
}

export default RadioButtonGroup;