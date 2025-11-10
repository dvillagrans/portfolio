'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PROFILE_METADATA } from '@/data/profiles/metadata';
import type { ProfileMetadata, ProfileType } from '@/data/profiles/metadata';

interface ProfileContextType {
  profile: ProfileType;
  setProfile: (profile: ProfileType) => void;
  getProfileMetadata: (profile: ProfileType) => ProfileMetadata;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<ProfileType>('ml-engineer');
  const [isClient, setIsClient] = useState(false);

  // Set client flag on mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load profile from localStorage on mount
  useEffect(() => {
    if (!isClient) return;

    const savedProfile = localStorage.getItem('profile') as ProfileType;
    if (savedProfile && PROFILE_METADATA[savedProfile]) {
      setProfile(savedProfile);
    }
  }, [isClient]);

  // Save profile to localStorage when it changes
  useEffect(() => {
    if (!isClient) return;

    localStorage.setItem('profile', profile);
  }, [profile, isClient]);

  const getProfileMetadata = (profileType: ProfileType): ProfileMetadata => {
    return PROFILE_METADATA[profileType];
  };

  const value = {
    profile,
    setProfile,
    getProfileMetadata,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}

export { PROFILE_METADATA } from '@/data/profiles/metadata';
export type { ProfileMetadata, ProfileType } from '@/data/profiles/metadata';
