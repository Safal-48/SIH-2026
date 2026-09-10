"use client";

import * as React from "react";
import {
  Upload,
  FileCheck,
  ShieldCheck,
  AlertCircle,
  FileText,
  Lock,
  X,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils/cn";

export interface SecureDocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess?: (doc: any) => void;
  defaultDocType?: string;
}

const DOC_TYPES = [
  { id: "CLINICAL_LOGBOOK", label: "Clinical Inpatient Logbook", desc: "Supervised hospital rounds & case procedures" },
  { id: "NCISM_REGISTRATION", label: "NCISM Council Registration", desc: "Official state council / NCISM enrollment certificate" },
  { id: "DEGREE_CERTIFICATE", label: "BAMS / MD Degree Certificate", desc: "University awarded degree or provisional diploma" },
  { id: "RESEARCH_PAPER", label: "Research Manuscript / GCP Paper", desc: "Published classical or clinical trial paper" },
  { id: "IDENTITY_PROOF", label: "Government Photo ID (Redacted)", desc: "Aadhaar / Voter ID (auto-redacted PII)" },
];

export function SecureDocumentUploadModal({
  isOpen,
  onClose,
  onUploadSuccess,
  defaultDocType = "CLINICAL_LOGBOOK",
}: SecureDocumentUploadModalProps) {
  const [docType, setDocType] = React.useState(defaultDocType);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [uploadResult, setUploadResult] = React.useState<any | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    setUploadResult(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("File exceeds maximum permitted size of 10 MB.");
      setSelectedFile(null);
      return;
    }

    // Validate type
    const allowed = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowed.includes(file.type)) {
      setErrorMsg("Invalid file type. Only PDF, JPEG, and PNG files are allowed.");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setErrorMsg(null);
    setUploadProgress(25);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("documentType", docType);

      setUploadProgress(65);

      const res = await fetch("/api/documents/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setUploadProgress(100);

      if (!res.ok) {
        throw new Error(data.message || data.error || "Upload failed");
      }

      setUploadResult(data.document);
      if (onUploadSuccess) {
        onUploadSuccess(data.document);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to upload document securely.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setUploadResult(null);
    setErrorMsg(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Secure Document Vault Upload"
      description="All files are protected with AES-256 encryption, SHA-256 tamper-evident checksums, and strict Row-Level Security."
      size="lg"
    >
      <div className="space-y-5">
        {/* Document Type Selector */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
            Select Document Category
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {DOC_TYPES.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDocType(d.id)}
                className={cn(
                  "p-3 rounded-xl border text-left transition-all",
                  docType === d.id
                    ? "border-primary bg-primary/10 shadow-sm"
                    : "border-border hover:border-border/80 bg-card"
                )}
              >
                <div className="text-xs font-bold text-foreground">{d.label}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{d.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Upload Drop Zone */}
        {!uploadResult ? (
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={handleFileChange}
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "p-6 rounded-2xl border-2 border-dashed transition-all text-center cursor-pointer",
                selectedFile
                  ? "border-primary/60 bg-primary/5"
                  : "border-border hover:border-primary/40 bg-muted/20"
              )}
            >
              {selectedFile ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <FileCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-foreground block">{selectedFile.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type}
                    </span>
                  </div>
                  <span className="text-xs text-primary font-semibold underline mt-1">
                    Click to choose a different file
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-2xl bg-muted border border-border flex items-center justify-center text-muted-foreground">
                    <Upload className="h-6 w-6" />
                  </div>
                  <div className="text-sm font-semibold text-foreground">
                    Click to browse or drag and drop document
                  </div>
                  <div className="text-xs text-muted-foreground max-w-sm">
                    PDF, JPEG, or PNG files only (Maximum 10 MB). Disguised binaries are rejected at the byte level.
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Upload Success Screen */
          <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-3">
            <div className="flex items-center gap-2.5 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="h-5 w-5" />
              <span>Document Cryptographically Sealed & Stored</span>
            </div>
            <div className="text-xs text-muted-foreground space-y-1 bg-card/80 p-3 rounded-xl border border-border">
              <div><strong className="text-foreground">Document ID:</strong> {uploadResult.id}</div>
              <div><strong className="text-foreground">File Name:</strong> {uploadResult.fileName}</div>
              <div className="font-mono text-[10px] break-all">
                <strong className="text-foreground font-sans text-xs">SHA-256 Hash:</strong> {uploadResult.checksumSha256}
              </div>
              <div className="text-[11px] text-primary pt-1 flex items-center gap-1 font-semibold">
                <ShieldCheck className="h-3.5 w-3.5" />
                Logged to Ministry Tamper-Evident Audit Trail
              </div>
            </div>
          </div>
        )}

        {/* Upload Progress Bar */}
        {isUploading && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-muted-foreground">
              <span>Hashing & Encrypting...</span>
              <span>{uploadProgress}%</span>
            </div>
            <ProgressBar value={uploadProgress} variant="gradient" />
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2 font-medium">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Security Stamp Notice */}
        <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-primary" />
            Protected by Ayush Grid Digital Health Security
          </span>
          <Badge variant="verified" size="sm">RLS Enabled</Badge>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>

          {uploadResult ? (
            <Button variant="gold" size="sm" onClick={handleReset}>
              Upload Another Document
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              disabled={!selectedFile || isUploading}
              onClick={handleUpload}
              leftIcon={<ShieldCheck className="h-4 w-4" />}
            >
              {isUploading ? "Encrypting & Storing..." : "Encrypt & Store Document"}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
