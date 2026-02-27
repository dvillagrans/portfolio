import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROFILE_METADATA } from "@/data/profiles/metadata";
import type { ProfileType } from "@/data/profiles/metadata";
import { PROFILE_DATA } from "@/data/profiles";
import { ProfileClient } from "./profile-client";

interface ProfilePageProps {
  params: Promise<{
    profile: ProfileType;
  }>;
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { profile } = await params;
  const metadata = PROFILE_METADATA[profile];

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
      url: `/profile/${profile}`,
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.seoTitle,
      description: metadata.seoDescription,
      images: [metadata.ogImage],
    },
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { profile } = await params;
  const metadata = PROFILE_METADATA[profile];

  if (!metadata) {
    notFound();
  }

  const content = PROFILE_DATA[profile];

  return <ProfileClient profile={profile} metadata={metadata} content={content} />;
}
