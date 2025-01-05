"use client"

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { useState } from "react"
import DateTimePicker from "react-datetime-picker"

export const DatePicker = ()=> {
    const [date, setDate] = useState(new Date())
    return (
        <div>
            <DateTimePicker name='date' value={date} onChange={(value)=>setDate(value as Date)} />
        </div>
    )
}