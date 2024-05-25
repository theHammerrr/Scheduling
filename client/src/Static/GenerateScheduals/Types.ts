import { eConstraintType, eShitType, iConstraint } from "../../components/Contexts/ConstraintContext/ConstraintsProvider";

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
        [day: number]: { [key in eShitType]: string }; // Assigned persons for morning and night shifts for each day
    }

    export type ConstraintsPerPerson = { [person: string]: { [key in eConstraintType]: number[] } }
    export type iFitnessFunction = (schedule: iShiftSchedule, 
                                    numDays: number, employees: string[], 
                                    constraintPerPerson: ConstraintsPerPerson, 
                                    shiftBreak?: number) => number;
