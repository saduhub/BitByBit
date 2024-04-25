// eslint-disable-next-line
function RadioButtonGroup({ label, name, options, value, onChange }) {
    const stringValue = String(value);
    return (
        <div className="mb-3 text-center">
            <label className="form-label d-block">{label}</label>
            <div className="d-flex justify-content-center">
                {/* eslint-disable-next-line */}
                {options.map((option, index) => (
                    <div key={index} className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name={name}
                            id={`${name}-${option}`}
                            value={option}
                            checked={stringValue === option}
                            onChange={onChange}
                        />
                        <label className="form-check-label" htmlFor={`${name}-${option}`}>
                            {option === "true" ? "Yes" : option === "false" ? "No" : "N/A"}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RadioButtonGroup;