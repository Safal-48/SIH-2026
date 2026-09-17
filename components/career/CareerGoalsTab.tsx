"use client";

import * as React from "react";
import Link from "next/link";
import {
  Compass,
  CheckCircle2,
  Plus,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Building2,
  Briefcase,
  Layers,
  ChevronRight,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/cards/Card";
import {
  CareerRoleItem,
  getCareerRoles,
  getActiveCareerGoal,
  setActiveCareerGoal,
  addCustomCareerRole,
} from "@/lib/services/careerIntelligenceService";
import { formatINR } from "@/lib/utils/formatters";

interface CareerGoalsTabProps {
  onSelectRole?: (roleId: string) => void;
}

export function CareerGoalsTab({ onSelectRole }: CareerGoalsTabProps) {
  const [roles, setRoles] = React.useState<CareerRoleItem[]>([]);
  const [activeGoal, setActiveGoal] = React.useState<string>("");
  const [showAddModal, setShowAddModal] = React.useState<boolean>(false);
  const [filterCategory, setFilterCategory] = React.useState<string>("All");

  // Custom role form state
  const [newTitle, setNewTitle] = React.useState("");
  const [newSanskrit, setNewSanskrit] = React.useState("");
  const [newCategory, setNewCategory] = React.useState<CareerRoleItem["category"]>("Clinical");
  const [newDescription, setNewDescription] = React.useState("");
  const [newCtc, setNewCtc] = React.useState(1000000);
  const [newSkillsStr, setNewSkillsStr] = React.useState("Clinical Diagnostics, Samhita, GCP-Ayush");

  React.useEffect(() => {
    setRoles(getCareerRoles());
    setActiveGoal(getActiveCareerGoal());
  }, []);

  const handleSelectGoal = (title: string) => {
    setActiveGoal(title);
    setActiveCareerGoal(title);
  };

  const handleCreateCustomRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const reqSkills = newSkillsStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((skillName) => ({
        skillName,
        minimumProficiency: 80,
      }));

    const created = addCustomCareerRole({
      title: newTitle.trim(),
      sanskritDomain: newSanskrit.trim() || undefined,
      category: newCategory,
      description: newDescription.trim() || "Custom defined Ayush trajectory.",
      averageStartingCtcInr: Number(newCtc) || 1000000,
      projectedGrowth: "+35% 5-Yr Growth",
      requiredSkills: reqSkills.length > 0 ? reqSkills : [{ skillName: "Clinical Competency", minimumProficiency: 80 }],
      preferredSkills: ["Inter-disciplinary Ayush Practice"],
      recommendedLearningModules: [
        { title: `${newTitle} Core Curriculum`, type: "Course", duration: "3 Weeks" },
      ],
      sampleRoles: [newTitle],
      keyEmployers: ["Accredited Ayush Hospitals & Institutes"],
    });

    setRoles(getCareerRoles());
    handleSelectGoal(created.title);
    setShowAddModal(false);

    // Reset
    setNewTitle("");
    setNewSanskrit("");
    setNewDescription("");
  };

  const filteredRoles = roles.filter(
    (r) => filterCategory === "All" || r.category.toLowerCase() === filterCategory.toLowerCase()
  );

  return (
    <div className="space-y-8">
      {/* 1. Active Goal Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-[#041d13] to-slate-950 border border-emerald-500/40 backdrop-blur-xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Active Calibrated Career Goal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white flex items-center gap-3">
            <span>{activeGoal}</span>
            <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0" />
          </h2>
          <p className="text-xs sm:text-sm text-gray-300/80 max-w-2xl">
            All Skill DNA benchmarks, gap remediations in the LEARNING hub, and recommendations in the OPPORTUNITY marketplace are dynamically aligned with this goal.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={() => setShowAddModal(true)}
            variant="outline"
            size="sm"
            className="border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/50 text-xs font-semibold gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Define Custom Role</span>
          </Button>
          <Link href="/career?tab=paths">
            <Button variant="gold" size="sm" className="text-xs font-bold gap-1.5">
              <span>View Required Skills</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Category Filter & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
            <Compass className="h-5 w-5 text-emerald-400" />
            <span>Available Ayush Career Pathways ({filteredRoles.length})</span>
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Select an official NCISM/AIIA trajectory to re-calibrate your target benchmarks.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-emerald-500/20 text-xs">
          {["All", "Clinical", "Research", "Data & Tech", "Entrepreneurship", "Industry", "Academia"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                filterCategory === cat
                  ? "bg-emerald-500 text-slate-950 font-bold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Role Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRoles.map((role) => {
          const isSelected = activeGoal.toLowerCase() === role.title.toLowerCase();

          return (
            <div
              key={role.id}
              className={`rounded-2xl p-5 transition-all flex flex-col justify-between border ${
                isSelected
                  ? "bg-[#042417] border-amber-400/80 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400/40"
                  : "bg-[#03190f]/80 border-emerald-500/25 hover:border-emerald-500/50 hover:bg-[#031d12]"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <Badge variant={isSelected ? "gold" : "outline"} size="sm" className="text-[10px] font-mono">
                    {role.category}
                  </Badge>
                  {role.isCustom && (
                    <Badge variant="secondary" size="sm" className="text-[10px]">
                      Custom Role
                    </Badge>
                  )}
                  {isSelected && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Active Goal
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="text-lg font-serif font-bold text-white leading-snug">
                    {role.title}
                  </h4>
                  {role.sanskritDomain && (
                    <p className="text-xs text-amber-300/80 font-serif italic mt-0.5">
                      {role.sanskritDomain}
                    </p>
                  )}
                </div>

                <p className="text-xs text-gray-300/80 leading-relaxed line-clamp-3">
                  {role.description}
                </p>

                {/* Key CTC & Growth */}
                <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] uppercase text-muted-foreground block">Typical CTC</span>
                    <span className="font-bold text-emerald-400">{formatINR(role.averageStartingCtcInr)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase text-muted-foreground block">Industry Demand</span>
                    <span className="font-semibold text-amber-300">{role.projectedGrowth}</span>
                  </div>
                </div>

                {/* Required Skills Chips */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold block">
                    Core Prerequisites:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {role.requiredSkills.map((req, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-gray-300"
                      >
                        {req.skillName.split(" ")[0]} ({req.minimumProficiency}%)
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 mt-4 border-t border-emerald-500/20 flex items-center justify-between gap-2">
                <Button
                  onClick={() => handleSelectGoal(role.title)}
                  variant={isSelected ? "gold" : "outline"}
                  size="sm"
                  className={`w-full text-xs font-bold ${
                    isSelected ? "shadow-md" : "border-emerald-500/30 text-emerald-300 hover:text-white"
                  }`}
                >
                  {isSelected ? "Active Target Goal" : "Select as Target Goal"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Custom Role Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#031a10] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20">
              <div className="space-y-1">
                <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                  <Plus className="h-5 w-5 text-amber-400" />
                  Define Custom Career Trajectory
                </h3>
                <p className="text-xs text-muted-foreground">
                  Administrators and scholars can configure emerging roles in Ayush healthcare.
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCustomRole} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-gray-300 font-semibold">Role Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ayush Telemedicine Lead / Panchakarma Hospital Assessor"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-emerald-500/30 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-gray-300 font-semibold">Sanskrit Domain (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. दूरचिकित्सा विशेषज्ञ"
                    value={newSanskrit}
                    onChange={(e) => setNewSanskrit(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-emerald-500/30 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-gray-300 font-semibold">Category *</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-emerald-500/30 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Clinical">Clinical</option>
                    <option value="Research">Research</option>
                    <option value="Data & Tech">Data & Tech</option>
                    <option value="Entrepreneurship">Entrepreneurship</option>
                    <option value="Industry">Industry</option>
                    <option value="Academia">Academia</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-gray-300 font-semibold">Role Overview & Responsibilities</label>
                <textarea
                  rows={3}
                  placeholder="Briefly describe clinical focus, day-to-day duties, and patient/institutional impact..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-emerald-500/30 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-gray-300 font-semibold">Required Skills (Comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Nadi Pariksha, Telemedicine Protocols, Clinical Documentation"
                  value={newSkillsStr}
                  onChange={(e) => setNewSkillsStr(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-emerald-500/30 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-gray-300 font-semibold">Target Starting CTC (INR)</label>
                <input
                  type="number"
                  step="50000"
                  value={newCtc}
                  onChange={(e) => setNewCtc(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-emerald-500/30 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-3 border-t border-emerald-500/20 flex items-center justify-end gap-2">
                <Button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  variant="outline"
                  size="sm"
                  className="text-xs border-emerald-500/30"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="gold" size="sm" className="text-xs font-bold">
                  Save & Calibrate Goal
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
