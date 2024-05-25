import styled from "styled-components"
import { iShiftSchedule } from "../../Static/GenerateScheduals/Types"
import { eDayInTheWeek, eShitType } from "../Contexts/ConstraintContext/ConstraintsProvider"
import { useEffect, useState } from "react"

const ScheduleTableStyled = styled.table`
    border: 2px solid rgb(140 140 140);
    border-collapse: collapse;
`

const ScheduleTableHead = styled.thead`
    background-color: rgb(93 206 253);
`

const ScheduleTableCell = styled.th`
    border: 2px solid black;
    padding: 5px 0 10px;
`
const ScheduleTableBody = styled.tbody`
    background-color: #a4ffe7;
`

const DAYS_BY_INDEX: string[] = Object.values(eDayInTheWeek)
const SHIFT_TYPES = Object.values(eShitType)
const SHIFT_TYPE_TEXT = "סוג משמרת"

interface iScheduleTableProps {
    schedule: iShiftSchedule
}

const SchedualTable: React.FC<iScheduleTableProps> = ({
    schedule
}: iScheduleTableProps) => {    
    const [shifts, setShifts] = useState(Object.values(schedule))
    console.log(shifts);
    

    useEffect(() => {
        setShifts(Object.values(schedule))
    }, [schedule])

    return <ScheduleTableStyled>
        <ScheduleTableHead>
            <tr>
                <ScheduleTableCell>{SHIFT_TYPE_TEXT}</ScheduleTableCell>
                {Object.keys(schedule).map((key, index) => (
                    <ScheduleTableCell key={index}>{DAYS_BY_INDEX[+key]}</ScheduleTableCell>
                ))}
            </tr>
        </ScheduleTableHead>
        <ScheduleTableBody>
            {
                SHIFT_TYPES.map((shiftType) => (
                    <tr key={shiftType}>
                        <ScheduleTableCell>{shiftType}</ScheduleTableCell>
                        {shifts.map((shift, index) => (
                            <ScheduleTableCell key={index}>{shift[shiftType]}</ScheduleTableCell>
                        ))}
                    </tr>
                ))
            }
        </ScheduleTableBody>
    </ScheduleTableStyled>
}

export default SchedualTable