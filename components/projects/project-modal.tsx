"use client";

import { useEffect } from "react";
import Image from "next/image";
import {
  X,
  ExternalLink,
  GitBranch,
  Calendar,
  Tag,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project as ProjectWithCategory, ProjectCategory } from "@/data";

export type Project = ProjectWithCategory;

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  categoryColors: Record<ProjectCategory, string> & { todos: string };
}

export function ProjectModal({
  project,
  onClose,
  categoryColors,
}: ProjectModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [project, onClose]);

  if (!project) return null;

  const color = project.category ? categoryColors[project.category] : "#f97316";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md animate-in fade-in duration-200" />

      {/* Modal */}
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl bg-card border border-border shadow-2xl animate-in zoom-in-95 fade-in duration-300 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm text-foreground transition-all duration-300 border border-border/50"
          style={{
            transitionProperty: "background-color, color, border-color",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = color;
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.borderColor = color;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "";
            e.currentTarget.style.color = "";
            e.currentTarget.style.borderColor = "";
          }}
          aria-label="Fechar modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Image */}
        <div className="relative aspect-video w-full overflow-hidden bg-secondary shrink-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

          {/* Badges on image */}
          <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-lg text-xs font-bold backdrop-blur-md bg-background/80 text-foreground border border-border/60">
              {project.context || "Profissional"}
            </span>
            <span className="px-3 py-1 rounded-lg text-xs font-bold backdrop-blur-md bg-emerald-500/80 text-white border border-emerald-400/30">
              {project.status || "Em produção"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto max-h-[55vh] scrollbar-thin space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                {project.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Layers className="h-3.5 w-3.5" /> {project.context}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />{" "}
                  {project.status}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> {project.year}
                </span>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="h-4 w-4 text-muted-foreground shrink-0" />
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium border"
                style={{
                  backgroundColor: `${color}10`,
                  borderColor: `${color}25`,
                  color: color,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-2">
            {project.liveUrl && (
              <Button
                render={
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                nativeButton={false}
                className="gap-2 font-semibold text-white transition-all duration-300"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 4px 14px ${color}30`,
                }}
              >
                <ExternalLink className="h-4 w-4" />
                Ver Projeto
              </Button>
            )}
            {project.githubUrl && (
              <Button
                render={
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                nativeButton={false}
                variant="outline"
                className="gap-2 font-semibold"
              >
                <GitBranch className="h-4 w-4" />
                Ver Código
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
