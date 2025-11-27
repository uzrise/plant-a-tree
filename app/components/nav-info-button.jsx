"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usersAPI, authAPI } from "../../lib/api";

export default function NavInfoButton() {
  const t = useTranslations("nav");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getInitials = (name, surname) => {
    const firstInitial = name ? name.charAt(0).toUpperCase() : '';
    const lastInitial = surname ? surname.charAt(0).toUpperCase() : '';
    return `${firstInitial}${lastInitial}`;
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      await authAPI.refresh();
      setIsAuthenticated(true);
      const response = await usersAPI.getMe();
      if (response.data.name && response.data.surname) {
        setHasProfile(true);
        setUser(response.data);
      }
    } catch (err) {
      setIsAuthenticated(false);
      setHasProfile(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="border border-[#FFFFFF] bg-[#EEEEEE] px-2 py-1 sm:px-3 sm:py-1.5 rounded-full animate-pulse flex items-center justify-center min-w-[32px] h-8 sm:h-9">
        <div className="w-6 h-3 bg-gray-300 rounded"></div>
      </div>
    );
  }

  if (isAuthenticated && hasProfile && user) {
    return (
      <Link
        href="/profile"
        className="border border-[#FFFFFF] bg-[#EEEEEE] px-2 py-1 sm:px-3 sm:py-1.5 rounded-full hover:bg-[#E0E0E0] transition-colors flex items-center justify-center min-w-[32px] h-8 sm:h-9"
      >
        <span className="text-[#202225] font-semibold text-xs">
          {getInitials(user.name, user.surname)}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/auth/login"
      className="border border-[#FFFFFF] bg-[#EEEEEE] px-2 py-1 sm:px-3 sm:py-1.5 rounded-full hover:bg-[#E0E0E0] transition-colors"
    >
      <span className="text-[#202225] font-semibold text-xs">
        {t("signIn")}
      </span>
    </Link>
  );
}
