"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, UserCheck, GraduationCap, Building2, Landmark, ShieldCheck } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ROLE_DEFINITIONS, UserRole } from "@/types/roles";

interface RoleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAction?: "login" | "register";
}

export function RoleSelectionModal({
  isOpen,
  onClose,
  initialAction = "register",
}: RoleSelectionModalProps) {
  const roleIcons: Record<UserRole, React.ReactNode> = {
    STUDENT: <UserCheck className="h-5 w-5 text-primary" />,
    ACADEMICIAN: <GraduationCap className="h-5 w-5 text-secondary" />,
    INDUSTRY: <Building2 className="h-5 w-5 text-accent" />,
    INSTITUTION: <Landmark className="h-5 w-5 text-primary" />,
    ADMIN: <ShieldCheck className="h-5 w-5 text-primary" />,
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialAction === "login" ? "Select Your Portal" : "Join the Vaidya Setu Ecosystem"}
      description="Choose your stakeholder gateway to explore role-specific features and opportunities."
      size="lg"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
        {Object.values(ROLE_DEFINITIONS).map((role) => {
          const targetUrl = initialAction === "login" 
            ? `/login?role=${role.role}` 
            : `/register?role=${role.role}`;

          return (
            <Link
              key={role.role}
              href={targetUrl}
              onClick={onClose}
              className="p-4 rounded-xl border border-border bg-card/60 hover:bg-muted/60 hover:border-primary/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-background border border-border/80 group-hover:scale-105 transition-transform">
                    {roleIcons[role.role]}
                  </div>
                  <Badge variant="gold" size="sm">
                    {role.role}
                  </Badge>
                </div>
                <h5 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                  {role.title}
                </h5>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                  {role.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-primary">
                <span>{initialAction === "login" ? "Sign In to Gateway" : "Register with Role"}</span>
                <ArrowRight className="h-3.5 w-3.5 text-accent group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-5 pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <Link 
          href="/role-selection" 
          onClick={onClose}
          className="text-accent hover:underline font-medium inline-flex items-center gap-1"
        >
          Compare all roles on the dedicated selection screen →
        </Link>
        <Button variant="ghost" size="sm" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
}
