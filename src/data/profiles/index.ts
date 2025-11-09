import { ProfileType } from "@/contexts/profile-context";
import { mlEngineerProfile } from "./ml-engineer";
import { dataEngineerProfile } from "./data-engineer";
import { devopsEngineerProfile } from "./devops-engineer";
import { dataAnalystProfile } from "./data-analyst";
import { ProfileData } from "./types";

export const PROFILE_DATA: Record<ProfileType, ProfileData> = {
  'ml-engineer': mlEngineerProfile,
  'data-engineer': dataEngineerProfile,
  'devops-engineer': devopsEngineerProfile,
  'data-analyst': dataAnalystProfile,
};

export * from "./types";
export { mlEngineerProfile, dataEngineerProfile, devopsEngineerProfile, dataAnalystProfile };
