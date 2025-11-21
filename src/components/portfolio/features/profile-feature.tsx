"use client";

import { ProfileType } from "@/contexts/profile-context";
import { DataPipelineFeature } from "./data-pipeline-feature";
import { MLEngineerFeature } from "./ml-engineer-feature";
import { DevOpsFeature } from "./devops-feature";
import { DataAnalystFeature } from "./data-analyst-feature";

interface ProfileFeatureProps {
    profile: ProfileType;
}

export function ProfileFeature({ profile }: ProfileFeatureProps) {
    switch (profile) {
        case "data-engineer":
            return <DataPipelineFeature />;
        case "ml-engineer":
            return <MLEngineerFeature />;
        case "devops-engineer":
            return <DevOpsFeature />;
        case "data-analyst":
            return <DataAnalystFeature />;
        default:
            return null;
    }
}
