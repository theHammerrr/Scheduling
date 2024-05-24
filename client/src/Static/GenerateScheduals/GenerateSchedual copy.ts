import { iConstraint } from "../../components/Contexts/ConstraintContext/ConstraintsProvider";
import { fitnessFunction } from "./Fitness";
import { iFitnessFunction, iShiftSchedule, iShiftSchedulingGA } from "./Types";

export class ShiftScheduling implements iShiftSchedulingGA {
    people: string[] = [];
    numDays: number;
    constraints: iConstraint[] = [];
    populationSize: number;
    generations: number;
    mutationRate: number;
    crossoverRate: number;

    constructor({
        people,
        numDays = 7,
        constraints, //TODO: use constraints
        populationSize = 100,
        generations = 1000,
        crossoverRate = 0.5,
        mutationRate = 0.1
    }: iShiftSchedulingGA) {
        this.people = people
        this.numDays = numDays
        this.constraints = constraints
        this.populationSize = populationSize
        this.generations = generations
        this.crossoverRate = crossoverRate
        this.mutationRate = mutationRate
    }

    private initializePopulation(
        populationSize: number,
        numDays: number,
        peoples: string[]): iShiftSchedule[] {
        const population: iShiftSchedule[] = [];

        for (let i = 0; i < populationSize; i++) {
            const schedule: iShiftSchedule = {};
            for (let day = 0; day < numDays; day++) {
                schedule[day] = {
                    morning: peoples[Math.floor(Math.random() * peoples.length)],
                    night: peoples[Math.floor(Math.random() * peoples.length)]
                };
            }
            population.push(schedule);
        }
        return population;
    }

    private selectParent(
        population: iShiftSchedule[],
        numDays: number,
        people: string[],
        fitnessFunction: iFitnessFunction): iShiftSchedule {
        const tournamentSize = 5;
        let bestSchedule = population[Math.floor(Math.random() * population.length)];

        for (let i = 0; i < tournamentSize; i++) {
            const contender = population[Math.floor(Math.random() * population.length)];

            if (fitnessFunction(contender, numDays, people) >
                fitnessFunction(bestSchedule, numDays, people)) {
                bestSchedule = contender;
            }
        }
        return bestSchedule;
    }

    private crossover(
        parent1: iShiftSchedule,
        parent2: iShiftSchedule,
        crossoverRate: number,
        numDays: number): [iShiftSchedule, iShiftSchedule] {
        if (Math.random() > crossoverRate) {
            return [parent1, parent2];
        }

        const crossoverPoint = Math.floor(Math.random() * numDays);
        const child1: iShiftSchedule = {};
        const child2: iShiftSchedule = {};

        for (let day = 0; day < numDays; day++) {
            child1[day] = day < crossoverPoint ? { ...parent1[day] } : { ...parent2[day] };
            child2[day] = day < crossoverPoint ? { ...parent2[day] } : { ...parent1[day] };
        }

        return [child1, child2];
    }

    private mutate(
        schedule: iShiftSchedule,
        mutationRate: number,
        numDays: number,
        employees: string[]): iShiftSchedule {
        const mutatedSchedule: iShiftSchedule = {};
        for (let day = 0; day < numDays; day++) {
            mutatedSchedule[day] = {
                morning: Math.random() < mutationRate ? employees[Math.floor(Math.random() * employees.length)] : schedule[day].morning,
                night: Math.random() < mutationRate ? employees[Math.floor(Math.random() * employees.length)] : schedule[day].night
            };
        }
        return mutatedSchedule;
    }

    public evolve(): Promise<iShiftSchedule> {
        return new Promise((resolve, reject) => {
            const startTime = performance.now();

            let bestSchedule = this.initializePopulation(1, this.numDays, this.people,)[0];
            let population = this.initializePopulation(this.populationSize, this.numDays, this.people);

            for (let generation = 0; generation < this.generations; generation++) {
                const newPopulation: iShiftSchedule[] = [];

                for (let i = 0; i < this.populationSize; i++) {
                    const parent1 = this.selectParent(population, this.numDays, this.people, fitnessFunction);
                    const parent2 = this.selectParent(population, this.numDays, this.people, fitnessFunction);
                    const [child1, child2] = this.crossover(parent1, parent2, this.crossoverRate, this.numDays);
                    const mutatedChild1 = this.mutate(child1, this.mutationRate, this.numDays, this.people);
                    const mutatedChild2 = this.mutate(child2, this.mutationRate, this.numDays, this.people);
                    newPopulation.push(mutatedChild1, mutatedChild2);
                }

                population = newPopulation;
                const populationScore: number[] = population.map((schedule) =>
                    fitnessFunction(schedule, this.numDays, this.people)
                )

                const fittestScheduleIndex = populationScore.reduce((maxIndex, elem, i, arr) =>
                    elem > arr[maxIndex] ? i : maxIndex, 0);
                const fittestSchedule = population[fittestScheduleIndex]

                if (fitnessFunction(fittestSchedule, this.numDays, this.people) >
                    fitnessFunction(bestSchedule, this.numDays, this.people)) {
                    bestSchedule = fittestSchedule;
                }
            }

            const endTime = performance.now();
            const elapsedTime = endTime - startTime;
            console.log(`Elapsed time: ${elapsedTime} milliseconds`);

            resolve(bestSchedule)
        })
    }
}

// const initializePopulation = (
//     populationSize: number,
//     numDays: number,
//     peoples: string[]): iShiftSchedule[] => {
//     const population: iShiftSchedule[] = [];

//     for (let i = 0; i < populationSize; i++) {
//         const schedule: iShiftSchedule = {};
//         for (let day = 0; day < numDays; day++) {
//             schedule[day] = {
//                 morning: peoples[Math.floor(Math.random() * peoples.length)],
//                 night: peoples[Math.floor(Math.random() * peoples.length)]
//             };
//         }
//         population.push(schedule);
//     }
//     return population;
// }

// const selectParent = (
//     population: iShiftSchedule[],
//     numDays: number,
//     people: string[],
//     fitnessFunction: iFitnessFunction): iShiftSchedule => {
//     const tournamentSize = 5;
//     let bestSchedule = population[Math.floor(Math.random() * population.length)];

//     for (let i = 0; i < tournamentSize; i++) {
//         const contender = population[Math.floor(Math.random() * population.length)];

//         if (fitnessFunction(contender, numDays, people) >
//             fitnessFunction(bestSchedule, numDays, people)) {
//             bestSchedule = contender;
//         }
//     }
//     return bestSchedule;
// }

// const crossover = (
//     parent1: iShiftSchedule,
//     parent2: iShiftSchedule,
//     crossoverRate: number,
//     numDays: number): [iShiftSchedule, iShiftSchedule] => {
//     if (Math.random() > crossoverRate) {
//         return [parent1, parent2];
//     }

//     const crossoverPoint = Math.floor(Math.random() * numDays);
//     const child1: iShiftSchedule = {};
//     const child2: iShiftSchedule = {};

//     for (let day = 0; day < numDays; day++) {
//         child1[day] = day < crossoverPoint ? { ...parent1[day] } : { ...parent2[day] };
//         child2[day] = day < crossoverPoint ? { ...parent2[day] } : { ...parent1[day] };
//     }

//     return [child1, child2];
// }

// const mutate = (
//     schedule: iShiftSchedule,
//     mutationRate: number,
//     numDays: number,
//     employees: string[]): iShiftSchedule => {
//     const mutatedSchedule: iShiftSchedule = {};
//     for (let day = 0; day < numDays; day++) {
//         mutatedSchedule[day] = {
//             morning: Math.random() < mutationRate ? employees[Math.floor(Math.random() * employees.length)] : schedule[day].morning,
//             night: Math.random() < mutationRate ? employees[Math.floor(Math.random() * employees.length)] : schedule[day].night
//         };
//     }
//     return mutatedSchedule;
// }

// export const shiftSchedulingGA = ({
//     people,
//     numDays = 7,
//     constraints, //TODO: use constraints
//     populationSize = 100,
//     generations = 1000,
//     crossoverRate = 0.5,
//     mutationRate = 0.1
// }: iShiftSchedulingGA): Promise<iShiftSchedule> => {
//     return new Promise((resolve, reject) => {
//         const startTime = performance.now();

//         let bestSchedule = initializePopulation(1, numDays, people,)[0];
//         let population = initializePopulation(populationSize, numDays, people);

//         for (let generation = 0; generation < generations; generation++) {
//             const newPopulation: iShiftSchedule[] = [];

//             for (let i = 0; i < populationSize; i++) {
//                 const parent1 = selectParent(population, numDays, people, fitnessFunction);
//                 const parent2 = selectParent(population, numDays, people, fitnessFunction);
//                 const [child1, child2] = crossover(parent1, parent2, crossoverRate, numDays);
//                 const mutatedChild1 = mutate(child1, mutationRate, numDays, people);
//                 const mutatedChild2 = mutate(child2, mutationRate, numDays, people);
//                 newPopulation.push(mutatedChild1, mutatedChild2);
//             }

//             population = newPopulation;
//             const populationScore: number[] = population.map((schedule) =>
//                 fitnessFunction(schedule, numDays, people)
//             )

//             const fittestScheduleIndex = populationScore.reduce((maxIndex, elem, i, arr) =>
//                 elem > arr[maxIndex] ? i : maxIndex, 0);
//             const fittestSchedule = population[fittestScheduleIndex]

//             if (fitnessFunction(fittestSchedule, numDays, people) >
//                 fitnessFunction(bestSchedule, numDays, people)) {
//                 bestSchedule = fittestSchedule;
//             }
//         }

//         const endTime = performance.now();
//         const elapsedTime = endTime - startTime;
//         console.log(`Elapsed time: ${elapsedTime} milliseconds`);

//         resolve(bestSchedule)
//     })
// }