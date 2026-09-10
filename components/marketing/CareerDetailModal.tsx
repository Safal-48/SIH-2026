"use client";

import * as React from "react";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatINR } from "@/lib/utils/formatters";
import { TrendingUp, Building2, Award, CheckCircle2 } from "lucide-react";

export interface CareerDetailModalData {
  title: string;
  domain: string;
  description: string;
  projectedGrowth: string;
  averageStartingInr: number;
  specialization: string;
  sampleRoles: string[];
  keyCompetencies: string[];
  topPartners: string[];
}

interface CareerDetailModalProps {
  career: CareerDetailModalData | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectPath?: (career: CareerDetailModalData) => void;
}

export function CareerDetailModal({
  career,
  isOpen,
  onClose,
  onSelectPath,
}: CareerDetailModalProps) {
  if (!career) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={career.title}
      description={`Specialization: ${career.specialization} • Domain: ${career.domain}`}
      size="lg"
    >
      <div className="space-y-5 text-sm">
        {/* Salary & Growth Ribbon */}
        <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-primary/10 border border-primary/20">
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Avg. Starting CTC
            </p>
            <p className="text-xl font-bold text-foreground">
              {formatINR(career.averageStartingInr)} <span className="text-xs font-normal text-muted-foreground">/ yr</span>
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              5-Year Demand Growth
            </p>
            <div className="flex items-center gap-1.5 text-accent font-bold text-base mt-0.5">
              <TrendingUp className="h-4 w-4" />
              <span>{career.projectedGrowth}</span>
            </div>
          </div>
        </div>

        {/* Detailed Overview */}
        <div>
          <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Career Overview & Scope
          </h5>
          <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
            {career.description}
          </p>
        </div>

        {/* Required Competencies */}
        <div>
          <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
            <Award className="h-3.5 w-3.5 text-accent" />
            Core NCISM Competencies Required
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {career.keyCompetencies.map((comp, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-muted/60 text-xs text-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>{comp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Hiring Ecosystem Partners */}
        <div>
          <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
            <Building2 className="h-3.5 w-3.5 text-secondary" />
            Top Hiring & Research Partners
          </h5>
          <div className="flex flex-wrap gap-1.5">
            {career.topPartners.map((partner, idx) => (
              <Badge key={idx} variant="outline" size="sm">
                {partner}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Footer */}
        <div className="pt-4 border-t border-border flex items-center justify-between gap-3">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="gold"
            size="sm"
            onClick={() => {
              onSelectPath?.(career);
              onClose();
            }}
          >
            Map My Competencies to This Role
          </Button>
        </div>
      </div>
    </Modal>
  );
}
