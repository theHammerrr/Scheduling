import { eConstraintType, eShitType } from "../../components/Contexts/ConstraintContext/ConstraintsProvider";
import { iFitnessFunction } from "./Types";

let times = 1
export const fitnessFunction: iFitnessFunction = (schedule, numDays, employees, constraintPerPerson ,shiftBreak = 2) => {
    //TODO: if shift type will be dynamic, there will be a need to change here

    let score = 0;
    const shiftsCount: { [employee: string]: number } = {};
    const lastShiftDay: { [employee: string]: number } = {};

    for (let day = 0; day < numDays; day++) {
        const scheduleDay = schedule[day];
        const morning = scheduleDay[eShitType.MORNING]
        const night = scheduleDay[eShitType.NIGHT]

        // Increment shift counts for each employee
        shiftsCount[morning] = (shiftsCount[morning] || 0) + 1;
        shiftsCount[night] = (shiftsCount[night] || 0) + 1;

        // Check for shift breaks
        if (lastShiftDay[morning] !== undefined && (day - lastShiftDay[morning]) < shiftBreak) {
            score -= 10; // Penalize if there's no x-shift break for morning shift employee
        }
        if (lastShiftDay[night] !== undefined && (day - lastShiftDay[night]) < shiftBreak) {
            score -= 10; // Penalize if there's no x-shift break for night shift employee
        }

        // Update last shift day
        lastShiftDay[morning] = day;
        lastShiftDay[night] = day;

        // Ensure no employee is assigned both shifts on the same day
        if (morning === night) {
            return -20; // Penalize heavily if the same person is assigned both shifts
        }

        // const morningShiftCannotConstraint = constraintPerPerson[morning][eConstraintType.CANNOT]
        const morningShiftCannotConstraint = constraintPerPerson[morning][eConstraintType.CANNOT]
        const nightShiftCannotConstraint = constraintPerPerson[night][eConstraintType.CANNOT]

        if (!!morningShiftCannotConstraint.length ) {
            times && console.log(`morningShiftCannotConstraint: ${morningShiftCannotConstraint}`);
            times && console.log(morningShiftCannotConstraint);
            times = 0

            return score -= 5000
        }
        if (!!nightShiftCannotConstraint.length && nightShiftCannotConstraint.includes(day)) {
            return score -= 5000
        }
    }

    // Balance shifts among employees
    const maxShifts = Math.max(...Object.values(shiftsCount));
    const minShifts = Math.min(...Object.values(shiftsCount));
    score -= (maxShifts - minShifts) * 5; // Penalize imbalance in shift distribution

    // Reward for evenly distributed shifts
    score += (employees.length - (maxShifts - minShifts));

    return score;
};
