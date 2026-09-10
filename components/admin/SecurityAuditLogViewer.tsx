"use client";

import * as React from "react";
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Search,
  Filter,
  Eye,
  Activity,
  FileCheck,
  AlertTriangle,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/cards/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { auditLogService, AuditLogEntry, AuditAction } from "@/lib/services/auditLogService";
import { cn } from "@/lib/utils/cn";

export function SecurityAuditLogViewer() {
  const [logs, setLogs] = React.useState<AuditLogEntry[]>([]);
  const [selectedAction, setSelectedAction] = React.useState<string>("ALL");
  const [inspectingEntry, setInspectingEntry] = React.useState<AuditLogEntry | null>(null);
  const [summary, setSummary] = React.useState(auditLogService.getSecuritySummary());

  const refreshLogs = React.useCallback(() => {
    const data = auditLogService.getLogs({
      action: selectedAction === "ALL" ? undefined : (selectedAction as AuditAction),
      limit: 50,
    });
    setLogs(data);
    setSummary(auditLogService.getSecuritySummary());
  }, [selectedAction]);

  React.useEffect(() => {
    refreshLogs();
  }, [refreshLogs]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return <Badge variant="verified" size="sm">SUCCESS</Badge>;
      case "BLOCKED":
        return <Badge variant="destructive" size="sm">BLOCKED</Badge>;
      case "FLAGGED":
        return <Badge variant="warning" size="sm">FLAGGED</Badge>;
      default:
        return <Badge variant="outline" size="sm">{status}</Badge>;
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "PASSPORT_ATTESTATION":
        return <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />;
      case "DOCUMENT_UPLOAD":
        return <FileCheck className="h-4 w-4 text-primary" />;
      case "SECURITY_RATE_LIMIT_EXCEEDED":
      case "UNAUTHORIZED_ACCESS_BLOCKED":
        return <ShieldAlert className="h-4 w-4 text-destructive" />;
      case "AUTH_LOGIN":
        return <Lock className="h-4 w-4 text-accent" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Security KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="default" className="p-4 bg-card/80 border-border/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase text-muted-foreground">Total Events</span>
            <Activity className="h-4 w-4 text-primary" />
          </div>
          <div className="text-2xl font-black text-foreground">{summary.totalEvents}</div>
          <div className="text-[11px] text-muted-foreground mt-1">Logged to immutable buffer</div>
        </Card>

        <Card variant="default" className="p-4 bg-card/80 border-border/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase text-muted-foreground">Threats Blocked</span>
            <ShieldAlert className="h-4 w-4 text-destructive" />
          </div>
          <div className="text-2xl font-black text-destructive">{summary.blockedThreats}</div>
          <div className="text-[11px] text-muted-foreground mt-1">Rate limits & spoofing filtered</div>
        </Card>

        <Card variant="default" className="p-4 bg-card/80 border-border/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase text-muted-foreground">Attestations</span>
            <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400">{summary.verifiedAttestations}</div>
          <div className="text-[11px] text-muted-foreground mt-1">Cryptographically signed</div>
        </Card>

        <Card variant="default" className="p-4 bg-card/80 border-border/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase text-muted-foreground">Encryption Standard</span>
            <Lock className="h-4 w-4 text-accent" />
          </div>
          <div className="text-sm font-bold text-foreground mt-1">{summary.encryptionStandard}</div>
          <div className="text-[11px] text-muted-foreground mt-1">DPDP Act & RLS Active</div>
        </Card>
      </div>

      {/* Main Audit Stream Table */}
      <Card variant="default" className="p-6 border-border/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-foreground">
                Tamper-Evident Security & Audit Stream
              </h3>
              <Badge variant="gold" size="sm">Ministry Audit Ready</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Live chronological record of all authentication attempts, procedural attestations, and security blocks.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={refreshLogs}
              leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Action Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-border/60">
          {[
            { id: "ALL", label: "All Audit Actions" },
            { id: "PASSPORT_ATTESTATION", label: "Attestations" },
            { id: "DOCUMENT_UPLOAD", label: "Document Uploads" },
            { id: "SECURITY_RATE_LIMIT_EXCEEDED", label: "Rate Limit Exceeded" },
            { id: "UNAUTHORIZED_ACCESS_BLOCKED", label: "Blocked Access" },
            { id: "AUTH_LOGIN", label: "Logins" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedAction(f.id)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-semibold transition-all",
                selectedAction === f.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:text-foreground border border-border"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Audit Log Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border/80 text-muted-foreground uppercase text-[10px] tracking-wider">
                <th className="py-3 px-3">Timestamp (UTC)</th>
                <th className="py-3 px-3">Actor / Role</th>
                <th className="py-3 px-3">Action Type</th>
                <th className="py-3 px-3">Resource</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">IP Address</th>
                <th className="py-3 px-3 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-3 font-mono text-[11px] text-muted-foreground">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour12: false })}
                    <span className="text-[10px] block opacity-70">
                      {new Date(log.timestamp).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-foreground block">{log.userName}</span>
                    <span className="text-[10px] text-muted-foreground font-mono">{log.userRole}</span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5 font-medium text-foreground">
                      {getActionIcon(log.action)}
                      <span>{log.action.replace(/_/g, " ")}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-muted-foreground">
                    {log.resourceType}
                  </td>
                  <td className="py-3 px-3">
                    {getStatusBadge(log.status)}
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-muted-foreground">
                    {log.ipAddress}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setInspectingEntry(log)}
                      className="h-7 text-xs px-2"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Inspect Audit Entry Modal */}
      {inspectingEntry && (
        <Modal
          isOpen={!!inspectingEntry}
          onClose={() => setInspectingEntry(null)}
          title={`Audit Log Record: ${inspectingEntry.id}`}
          description="Detailed cryptographic telemetry and metadata captured for this security event."
          size="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-muted/40 border border-border">
              <div><strong className="text-muted-foreground block text-[10px] uppercase">Timestamp</strong> {inspectingEntry.timestamp}</div>
              <div><strong className="text-muted-foreground block text-[10px] uppercase">Status</strong> {getStatusBadge(inspectingEntry.status)}</div>
              <div><strong className="text-muted-foreground block text-[10px] uppercase">Actor</strong> {inspectingEntry.userName} ({inspectingEntry.userRole})</div>
              <div><strong className="text-muted-foreground block text-[10px] uppercase">Client IP</strong> {inspectingEntry.ipAddress}</div>
              <div><strong className="text-muted-foreground block text-[10px] uppercase">Action</strong> {inspectingEntry.action}</div>
              <div><strong className="text-muted-foreground block text-[10px] uppercase">Resource Type</strong> {inspectingEntry.resourceType}</div>
            </div>

            {inspectingEntry.metadata && (
              <div>
                <span className="text-xs font-bold text-foreground block mb-1">
                  Captured Event Metadata & Cryptographic Hashes:
                </span>
                <pre className="p-3 rounded-xl bg-card border border-border font-mono text-[11px] overflow-x-auto text-foreground/90">
                  {JSON.stringify(inspectingEntry.metadata, null, 2)}
                </pre>
              </div>
            )}

            <div className="flex justify-end pt-3">
              <Button variant="outline" size="sm" onClick={() => setInspectingEntry(null)}>
                Close Audit Record
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
