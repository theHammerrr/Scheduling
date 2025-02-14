import { iConstraint } from "../../components/Contexts/ConstraintContext/ConstraintsProvider";

export interface iShiftSchedulingGA {
    people: string[],
    numDays?: number,
    constraints: iConstraint[],
    populationSize?: number,
    generations?: number,
    mutationRate?: number,
    crossoverRate?: number
}


export interface iShiftSchedule {
    [day: number]: { morning: string; night: string }; // Assigned persons for morning and night shifts for each day
}

export type iFitnessFunction = (schedule: iShiftSchedule, numDays: number, employees: string[], shiftBreak?: number) => number;
