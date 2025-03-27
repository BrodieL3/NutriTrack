"use client";

import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-mobile";
import { Dashboard } from "@/components/dashboard";
import { LogMealForm } from "@/components/log-meal-form";
import { WeighIn } from "@/components/weigh-in";
import { Settings } from "@/components/settings";
import { Layout } from "@/components/layout";

export default function NutritionTracker() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Layout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      isMobile={isMobile}
    >
      {activeTab === "dashboard" && <Dashboard />}
      {activeTab === "log-food" && <LogMealForm />}
      {activeTab === "weigh-in" && <WeighIn />}
      {activeTab === "settings" && <Settings />}
    </Layout>
  );
}
