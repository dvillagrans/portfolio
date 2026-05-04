export { sharedEn, sharedEs } from "./dictionaries/shared";
export { timeupEn, timeupEs } from "./dictionaries/timeup";
export { eyenetEn, eyenetEs } from "./dictionaries/eyenet";
export { covidEn, covidEs } from "./dictionaries/covid";

import { sharedEn } from "./dictionaries/shared";
import { timeupEn } from "./dictionaries/timeup";
import { eyenetEn } from "./dictionaries/eyenet";
import { covidEn } from "./dictionaries/covid";

import { sharedEs } from "./dictionaries/shared";
import { timeupEs } from "./dictionaries/timeup";
import { eyenetEs } from "./dictionaries/eyenet";
import { covidEs } from "./dictionaries/covid";
import type { LanguageDict } from "./types";

export const en: LanguageDict = { ...sharedEn, timeup: timeupEn, eyenet: eyenetEn, covidPerfiles: covidEn };
export const es: LanguageDict = { ...sharedEs, timeup: timeupEs, eyenet: eyenetEs, covidPerfiles: covidEs };
