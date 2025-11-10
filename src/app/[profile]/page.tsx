import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROFILE_METADATA, ProfileType } from "@/contexts/profile-context";
import { PROFILE_DATA } from "@/data/profiles";
import { ProfileClient } from "./profile-client";

interface ProfilePageProps {
  params: {
    profile: ProfileType;
  };
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const metadata = PROFILE_METADATA[params.profile];

  if (!metadata) {
    return {};
  }

  return {
    title: metadata.seoTitle,
    description: metadata.seoDescription,
    openGraph: {
      title: metadata.seoTitle,
      description: metadata.seoDescription,
      images: [
        {
          url: metadata.ogImage,
          width: 1200,
          height: 630,
        },
      ],
      url: `/profile/${params.profile}`,
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.seoTitle,
      description: metadata.seoDescription,
      images: [metadata.ogImage],
    },
  };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const metadata = PROFILE_METADATA[params.profile];

  if (!metadata) {
    notFound();
  }

  const content = PROFILE_DATA[params.profile];

  return <ProfileClient profile={params.profile} metadata={metadata} content={content} />;
}
