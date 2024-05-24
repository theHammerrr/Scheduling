import * as Comlink from 'comlink'
import { shiftSchedulingGA } from './GenerateSchedual'; // Import necessary functions

Comlink.expose(shiftSchedulingGA); // Expose the evolve function to be called from the main thread
