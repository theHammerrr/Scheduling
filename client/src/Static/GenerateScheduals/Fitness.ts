import { eConstraintType, eShitType, iConstraint } from "../../components/Contexts/ConstraintContext/ConstraintsProvider";
import { iFitnessFunction } from "./Types";

const doesPersonHaveConstraintOnShift = (
    constraints: iConstraint[],
    person: string,
    constraintType: eConstraintType,
    shiftType: eShitType, 
    day: number): boolean => {
        let haveConstraint = false
        constraints.forEach((constraint) => {
            haveConstraint = haveConstraint || (
                constraint.person === person &&
                constraint.day === day && 
                constraint.shiftType === shiftType &&
                constraint.constraintType === constraintType
            )
        })

        return haveConstraint
}

export const fitnessFunction: iFitnessFunction = (schedule, numDays, employees, constraints ,shiftBreak = 2) => {
    //TODO: if shift type will be dynamic, there will be a need to change here
    //TODO: maybe split to functions 

    let score = 0;
    const shiftsCount: { [employee: string]: number } = {};
    const lastShiftDay: { [employee: string]: number } = {};

    for (let day = 0; day < numDays; day++) {
        const scheduleDay = schedule[day];
        const personInTheMorning = scheduleDay[eShitType.MORNING]        
        const personInTheNight = scheduleDay[eShitType.NIGHT]

        // Increment shift counts for each employee
        shiftsCount[personInTheMorning] = (shiftsCount[personInTheMorning] || 0) + 1;
        shiftsCount[personInTheNight] = (shiftsCount[personInTheNight] || 0) + 1;

        // Check for shift breaks
        if (lastShiftDay[personInTheMorning] !== undefined && (day - lastShiftDay[personInTheMorning]) < shiftBreak) {
            score -= 10; // Penalize if there's no x-shift break for morning shift employee
        }
        if (lastShiftDay[personInTheNight] !== undefined && (day - lastShiftDay[personInTheNight]) < shiftBreak) {
            score -= 10; // Penalize if there's no x-shift break for night shift employee
        }

        // Update last shift day
        lastShiftDay[personInTheMorning] = day;
        lastShiftDay[personInTheNight] = day;

        // Ensure no employee is assigned both shifts on the same day
        if (personInTheMorning === personInTheNight) {
            return -20; // Penalize heavily if the same person is assigned both shifts
        }

        //TODO: do dynamic
        if (doesPersonHaveConstraintOnShift(constraints, personInTheMorning, eConstraintType.CANNOT ,eShitType.MORNING, day)) {
            score -= 50
        }
        if (doesPersonHaveConstraintOnShift(constraints, personInTheNight, eConstraintType.CANNOT ,eShitType.NIGHT, day)) {
            score -= 50
        }

        if (doesPersonHaveConstraintOnShift(constraints, personInTheMorning, eConstraintType.MUST ,eShitType.MORNING, day)) {
            score += 50
        }
        if (doesPersonHaveConstraintOnShift(constraints, personInTheNight, eConstraintType.MUST ,eShitType.NIGHT, day)) {
            score += 50
        }
        
        if (doesPersonHaveConstraintOnShift(constraints, personInTheMorning, eConstraintType.PREFER ,eShitType.MORNING, day)) {
            score += 20
        }
        if (doesPersonHaveConstraintOnShift(constraints, personInTheNight, eConstraintType.PREFER ,eShitType.NIGHT, day)) {
            score += 20
        }
    }

    // Balance shifts among employees
    const maxShifts = Math.max(...Object.values(shiftsCount));
    const minShifts = Math.min(...Object.values(shiftsCount));
    score -= (maxShifts - minShifts) * 10; // Penalize imbalance in shift distribution

    // Reward for evenly distributed shifts
    score += (employees.length - (maxShifts - minShifts));

    return score;
};

// Todo: different scores between night and morning, between the end of the week and start of the week. 
// Or use table to calculate "justice" that someone who did a lot of nights will not do nights next week.
