import React, { useCallback, useReducer, useState } from 'react'
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import Select from 'react-select'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
const Form = ({ schema, submitLabel, CancelLabel, onCancel, onSubmit, getValues }) => {
    const defaultStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start'
    }
    function reducer(state, action) {
        switch (action.type) {
            case "onChange":
                return state.map(item =>
                    item.id === action.payload.id
                        ? { ...item, value: action.payload.value }
                        : item
                );
            case "onClear":
                return schema;
            default:
                throw new Error("Unknown action type");
        }
    }
    const [state, dispatch] = useReducer(reducer, schema)
    const Submit = () => {
        const payload = state.reduce((acc, { id, value }) => {
            acc[id] = value;
            return acc;
        }, {});
        getValues(payload)
    }
    const onChange = useCallback((id, e, type) => {
        switch (type) {
            case 'text':
                dispatch({ type: 'onChange', payload: { id: id, value: e.value }, })
                break
            case 'checkbox':
                dispatch({ type: 'onChange', payload: { id: id, value: e.checked }, })
                break
            case 'radio':
                dispatch({ type: 'onChange', payload: { id: id, value: e.value }, })
                break
            case 'date':
                dispatch({ type: 'onChange', payload: { id: id, value: e }, })
                break
            case 'time':
                dispatch({ type: 'onChange', payload: { id: id, value: e }, })
                break
            case 'select':
                dispatch({ type: 'onChange', payload: { id: id, value: e }, })
                break
            default:
                dispatch({ type: 'onChange', payload: { id: id, value: e.value }, })
                break
        }
    }, [dispatch])
    const onClear = useCallback(() => {
        dispatch({ type: 'onClear', payload: null, })
        onCancel()
    }, [dispatch])

    return (
        <>
            <div>
                {state?.map((item, index) => (
                    <div style={{ ...defaultStyle, ...item.style }}>
                        {renderInput(index, item, state, item.type, onChange)}
                    </div>
                ))}
                <button onClick={Submit}>Submit</button>
            </div>
        </>
    )
}
const renderInput = (index, item, state, type, onChange) => {
    switch (type) {
        case 'text':
            return (
                <>
                    <label>{item.label}</label>
                    <input
                        type={item.type}
                        value={state[index].value}
                        checked={state[index].value}
                        onChange={(e) => {
                            onChange(item.id, e.target, item.type)
                        }} />
                </>
            )
        case 'radio':
            return (
                <>
                    {item.labels?.map((radio) => (
                        <div style={{ display: 'flex', flexDirection: item.arrange || 'row-reverse', alignItems: 'center' }}>
                            <label htmlFor={radio.value}>{radio.label}</label>
                            <input
                                id={radio.value}
                                type={item.type}
                                checked={state[index].value === radio.value}
                                onChange={(e) => {
                                    onChange(item.id, radio, item.type)
                                }} />
                        </div>
                    ))}
                </>
            )
        case 'checkbox':
            return (
                <>
                    <label>{item.label}</label>
                    <input
                        type={item.type}
                        value={state[index].value}
                        checked={state[index].value}
                        onChange={(e) => {
                            onChange(item.id, e.target, item.type)
                        }} />
                </>
            )
        case 'date':
            return (
                <>
                    <label>{item.label}</label>
                    <DatePicker
                        onChange={(value) => {
                            onChange(item.id, value, item.type)
                        }}
                        value={state[index].value}
                    />
                </>
            )
        case 'time':
            return (
                <>
                    <label>{item.label}</label>
                    <TimePicker
                        disableClock={true}
                        format="hh:mm a"
                        onChange={(value) => {
                            onChange(item.id, value, item.type)
                        }}
                        value={state[index].value}
                    />
                </>
            )
        case 'select':
            return (
                <>
                    <label>{item.label}</label>
                    <Select
                        options={item.options}
                        onChange={(e) => {
                            onChange(item.id, e, item.type)
                        }}
                        value={state[index].value}
                    />
                </>
            )

        default: return
    }
}
export default Form