"use client"

import { useState } from "react"
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import TimePicker from "react-time-picker";

export const HourSelect = ()=> {
    const [hour, setHour] = useState('12:00')
    return (
        <TimePicker value={hour} onChange={(value)=> setHour(value as string) } />
    )
}