export { sharedEn, sharedEs } from "./dictionaries/shared";
export { timeupEn, timeupEs } from "./dictionaries/timeup";
export { eyenetEn, eyenetEs } from "./dictionaries/eyenet";
export { covidEn, covidEs } from "./dictionaries/covid";
export { bouquetEn, bouquetEs } from "./dictionaries/bouquet";
export { cvBuilderEn, cvBuilderEs } from "./dictionaries/cv-builder";

import { sharedEn } from "./dictionaries/shared";
import { timeupEn } from "./dictionaries/timeup";
import { eyenetEn } from "./dictionaries/eyenet";
import { covidEn } from "./dictionaries/covid";
import { bouquetEn } from "./dictionaries/bouquet";
import { cvBuilderEn } from "./dictionaries/cv-builder";

import { sharedEs } from "./dictionaries/shared";
import { timeupEs } from "./dictionaries/timeup";
import { eyenetEs } from "./dictionaries/eyenet";
import { covidEs } from "./dictionaries/covid";
import { bouquetEs } from "./dictionaries/bouquet";
import { cvBuilderEs } from "./dictionaries/cv-builder";
import type { LanguageDict } from "./types";

export const en: LanguageDict = { ...sharedEn, timeup: timeupEn, eyenet: eyenetEn, covidPerfiles: covidEn, bouquet: bouquetEn, cvBuilder: cvBuilderEn };
export const es: LanguageDict = { ...sharedEs, timeup: timeupEs, eyenet: eyenetEs, covidPerfiles: covidEs, bouquet: bouquetEs, cvBuilder: cvBuilderEs };
