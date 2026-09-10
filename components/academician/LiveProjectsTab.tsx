"use client";

import * as React from "react";
import {
  Layers,
  PlusCircle,
  Users,
  CheckCircle2,
  Clock,
  Building2,
  Calendar,
  CheckSquare,
  DollarSign,
  ChevronRight,
  Send,
  Download,
  Search,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/cards/Card";
import { FacultyLiveProject } from "@/lib/services/academicianPortalService";

interface LiveProjectsTabProps {
  liveProjects: FacultyLiveProject[];
  onCreateLiveProject: (project: Omit<FacultyLiveProject, "id" | "progressPercentage">) => void;
  showToast: (msg: string) => void;
}

export function LiveProjectsTab({
  liveProjects,
  onCreateLiveProject,
  showToast,
}: LiveProjectsTabProps) {
  const [showModal, setShowModal] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState<FacultyLiveProject | null>(null);

  // Form State
  const [title, setTitle] = React.useState("");
  const [sponsor, setSponsor] = React.useState("Ministry of Ayush & Dabur Collaborative");
  const [domain, setDomain] = React.useState<FacultyLiveProject["domain"]>("Clinical Pharmacology");
  const [budget, setBudget] = React.useState("₹15,00,000");
  const [leadStudent, setLeadStudent] = React.useState("Dr. Aarav Sharma (Senior Research Fellow)");
  const [completionDate, setCompletionDate] = React.useState("2026-12-15");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast("Please enter live project title");
      return;
    }

    onCreateLiveProject({
      title,
      sponsor,
      domain,
      stage: "Proposal",
      leadStudentName: leadStudent,
      teamMembers: [
        { studentId: "s-01", studentName: leadStudent.split("(")[0].trim(), role: "Lead Research Fellow" },
        { studentId: "s-02", studentName: "Rohan Verma", role: "Clinical Data Collector" },
      ],
      tasks: [
        { id: "t1", title: "Project initiation & ethical blueprint", assignedTo: leadStudent.split("(")[0].trim(), dueDate: "2026-10-15", isDone: true },
        { id: "t2", title: "Sample procurement and literature extraction", assignedTo: "Rohan Verma", dueDate: "2026-11-15", isDone: false },
      ],
      budget,
      startDate: new Date().toISOString().split("T")[0],
      expectedCompletion: completionDate,
    });

    setShowModal(false);
    setTitle("");
    showToast(`✓ Live Student Project "${title}" launched!`);
  };

  const stages: FacultyLiveProject["stage"][] = [
    "Proposal",
    "Literature Review",
    "Lab Trials",
    "Clinical Validation",
    "Final Report",
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-accent/15 via-card to-card border border-accent/25">
        <div className="space-y-1 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-accent/15 text-accent text-xs font-semibold">
            <Layers className="h-3.5 w-3.5" /> Real-World Research & Industry Live Projects
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Supervised Live Projects
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Faculty-supervised student research teams executing industry-sponsored investigations, bio-informatics repositories, and pharmacovigilance surveys.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowModal(true)}
            leftIcon={<PlusCircle className="h-4 w-4" />}
          >
            Launch Live Project
          </Button>
        </div>
      </div>

      {/* Projects Kanban / Stage Cards */}
      <div className="grid grid-cols-1 gap-4">
        {liveProjects.map((project) => (
          <Card
            key={project.id}
            variant="default"
            className="p-5 hover:border-accent/40 transition-all space-y-4"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" size="sm" className="font-semibold text-accent">
                    {project.domain}
                  </Badge>
                  <span className="text-xs font-bold text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-accent" /> Sponsor: <strong>{project.sponsor}</strong>
                  </span>
                </div>
                <h3 className="text-base font-bold text-foreground leading-snug">{project.title}</h3>
                <p className="text-xs text-muted-foreground">
                  Lead Scholar: <strong className="text-foreground">{project.leadStudentName}</strong> • Team Size:{" "}
                  <strong>{project.teamMembers.length} Scholars</strong>
                </p>
              </div>

              <div className="flex flex-col sm:items-end gap-1 shrink-0">
                <Badge variant="gold" size="sm">
                  Stage: {project.stage}
                </Badge>
                <span className="text-xs font-bold text-emerald-600">Budget: {project.budget}</span>
                <span className="text-[11px] text-muted-foreground">
                  Completion: {project.expectedCompletion}
                </span>
              </div>
            </div>

            {/* Visual Stage Stepper */}
            <div className="space-y-2 pt-2 border-t border-border">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-muted-foreground">Phased Milestone Progress</span>
                <span className="font-bold text-foreground">{project.progressPercentage}% Completed</span>
              </div>

              <div className="grid grid-cols-5 gap-1 pt-1">
                {stages.map((stg, idx) => {
                  const stageIndex = stages.indexOf(project.stage);
                  const isPast = idx < stageIndex;
                  const isCurrent = idx === stageIndex;

                  return (
                    <div key={stg} className="space-y-1 text-center">
                      <div
                        className={`h-1.5 rounded-full transition-all ${
                          isPast
                            ? "bg-emerald-500"
                            : isCurrent
                            ? "bg-accent"
                            : "bg-muted"
                        }`}
                      />
                      <span
                        className={`text-[10px] font-medium block truncate ${
                          isCurrent
                            ? "text-accent font-bold"
                            : isPast
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {stg}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Team Members & Tasks Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {/* Team Members */}
              <div className="p-3 rounded-xl bg-muted/40 border border-border space-y-1.5 text-xs">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                  Student Research Team
                </span>
                <div className="space-y-1">
                  {project.teamMembers.map((m, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-foreground">{m.studentName}</span>
                      <span className="text-[11px] text-muted-foreground">{m.role}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tasks Checklist */}
              <div className="p-3 rounded-xl bg-muted/40 border border-border space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Work Packages & Tasks
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {project.tasks.filter((t) => t.isDone).length} of {project.tasks.length} Completed
                  </span>
                </div>
                <div className="space-y-1">
                  {project.tasks.slice(0, 3).map((task) => (
                    <div key={task.id} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        {task.isDone ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        ) : (
                          <Clock className="h-3.5 w-3.5 text-accent shrink-0" />
                        )}
                        <span className={task.isDone ? "line-through text-muted-foreground" : "text-foreground"}>
                          {task.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-muted-foreground shrink-0">{task.assignedTo}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                Supervised by Prof. Dr. Anand Kulkarni (PI)
              </span>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => showToast(`✓ Transmitting interim milestone dossier to ${project.sponsor}...`)}
                  leftIcon={<Send className="h-3.5 w-3.5" />}
                >
                  Submit Sponsor Report
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-primary"
                  onClick={() => setSelectedProject(project)}
                >
                  Manage Project <ChevronRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in">
          <Card variant="elevated" className="w-full max-w-xl p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                  {selectedProject.domain} • Sponsor: {selectedProject.sponsor}
                </span>
                <h3 className="text-base font-bold text-foreground mt-1">{selectedProject.title}</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedProject(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </Button>
            </div>

            <div className="p-3 rounded-xl bg-muted/40 border border-border grid grid-cols-3 gap-2 text-xs text-center">
              <div>
                <span className="text-muted-foreground">Current Stage</span>
                <p className="font-bold text-accent">{selectedProject.stage}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Sanctioned Budget</span>
                <p className="font-bold text-emerald-600">{selectedProject.budget}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Completion Date</span>
                <p className="font-bold text-foreground">{selectedProject.expectedCompletion}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                Full Task Breakdown
              </h4>
              <div className="space-y-2">
                {selectedProject.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-2.5 rounded-xl border border-border flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      {task.isDone ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      ) : (
                        <Clock className="h-4 w-4 text-accent shrink-0" />
                      )}
                      <span className={task.isDone ? "line-through text-muted-foreground" : "font-medium text-foreground"}>
                        {task.title}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[11px] font-semibold text-foreground block">{task.assignedTo}</span>
                      <span className="text-[10px] text-muted-foreground">Due: {task.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-border flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setSelectedProject(null)}>
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Launch Live Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in">
          <Card variant="elevated" className="w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <PlusCircle className="h-4 w-4 text-accent" /> Launch Student Live Research Project
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}>
                ✕
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. In-Silico Molecular Docking of Ashwagandha Withanolides..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Sponsoring Body / Industry</label>
                  <input
                    type="text"
                    value={sponsor}
                    onChange={(e) => setSponsor(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Research Domain</label>
                  <select
                    value={domain}
                    onChange={(e) => setDomain(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="Clinical Pharmacology">Clinical Pharmacology</option>
                    <option value="Phytochemistry">Phytochemistry</option>
                    <option value="AI Diagnostics">AI Diagnostics</option>
                    <option value="Formulation Standardization">Formulation Standardization</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Lead Student / Fellow</label>
                  <input
                    type="text"
                    value={leadStudent}
                    onChange={(e) => setLeadStudent(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Sanctioned Budget</label>
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Target Completion Date</label>
                <input
                  type="date"
                  value={completionDate}
                  onChange={(e) => setCompletionDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="pt-3 border-t border-border flex justify-end gap-2">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Launch Project Board
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
