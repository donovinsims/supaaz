"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Loader2, Globe, FileText, Image as ImageIcon } from "lucide-react";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const CATEGORIES = [
  "Productivity",
  "Design",
  "Marketing",
  "AI",
  "Utility",
  "Software",
  "Podcast & Media",
  "Personal Development",
  "Solopreneurship",
  "Creator Growth",
  "Writing & AI",
  "Business & Finance",
  "SaaS & Tools",
];

const STEPS = [
  { id: 1, title: "Basic Info", icon: Globe },
  { id: 2, title: "Details", icon: FileText },
  { id: 3, title: "Media", icon: ImageIcon },
];

interface FormData {
  title: string;
  url: string;
  category: string;
  tagline: string;
  description: string;
  images: string;
}

function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export default function SubmitPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [formData, setFormData] = useState<FormData>({
    title: "",
    url: "",
    category: "",
    tagline: "",
    description: "",
    images: "",
  });

  function updateField(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function validateStep(currentStep: number): boolean {
    const newErrors: Partial<FormData> = {};

    if (currentStep === 1) {
      if (!formData.title.trim()) {
        newErrors.title = "Name is required";
      }
      if (!formData.url.trim()) {
        newErrors.url = "URL is required";
      } else if (!isValidUrl(formData.url)) {
        newErrors.url = "Please enter a valid URL (e.g., https://example.com)";
      }
      if (!formData.category) {
        newErrors.category = "Category is required";
      }
    }

    if (currentStep === 2) {
      if (!formData.tagline.trim()) {
        newErrors.tagline = "Tagline is required";
      }
      if (!formData.description.trim()) {
        newErrors.description = "Description is required";
      }
    }

    if (currentStep === 3) {
      if (!formData.images.trim()) {
        newErrors.images = "Image URL is required";
      } else if (!isValidUrl(formData.images)) {
        newErrors.images = "Please enter a valid image URL";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleNext() {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 3));
    }
  }

  function handleBack() {
    setStep((prev) => Math.max(prev - 1, 1));
  }

  async function handleSubmit() {
    if (!validateStep(3)) return;

    setIsSubmitting(true);

    try {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          images: [formData.images],
          slug,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit");
      }

      toast.success("Submission Received", {
        description: "Your website has been submitted for review.",
      });

      router.push("/dashboard");
    } catch (error) {
      toast.error("Submission Failed", {
        description: error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-page">
      <DashboardSidebar />

      <main className="lg:pl-[240px] pt-14 lg:pt-0">
        <div className="p-6 lg:p-8 max-w-2xl">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-[13px] text-text-secondary hover:text-text-primary mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <header className="mb-8">
            <h1 className="text-2xl font-semibold text-text-primary">
              Submit a Website
            </h1>
            <p className="text-text-secondary mt-1">
              Share a website or creator with our community
            </p>
          </header>

          <div className="flex items-center gap-2 mb-8">
            {STEPS.map((s, index) => (
              <div key={s.id} className="flex items-center">
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                    step === s.id
                      ? "bg-text-primary text-page"
                      : step > s.id
                      ? "bg-green-500/10 text-green-500"
                      : "bg-ui-2 text-text-secondary"
                  }`}
                >
                  {step > s.id ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <s.icon className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">{s.title}</span>
                </div>
                {index < STEPS.length - 1 && (
                  <div className="w-8 h-px bg-border-1 mx-2" />
                )}
              </div>
            ))}
          </div>

          <div className="rounded-[12px] border border-border-1 bg-ui-1 p-6">
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <Label htmlFor="title" className="text-[13px] font-medium text-text-primary">
                    Website / Creator Name *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    placeholder="e.g., Raycast"
                    className="mt-1.5"
                    aria-invalid={!!errors.title}
                  />
                  {errors.title && (
                    <p className="text-[12px] text-red-500 mt-1">{errors.title}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="url" className="text-[13px] font-medium text-text-primary">
                    Website URL *
                  </Label>
                  <Input
                    id="url"
                    type="url"
                    value={formData.url}
                    onChange={(e) => updateField("url", e.target.value)}
                    placeholder="https://example.com"
                    className="mt-1.5"
                    aria-invalid={!!errors.url}
                  />
                  {errors.url && (
                    <p className="text-[12px] text-red-500 mt-1">{errors.url}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="category" className="text-[13px] font-medium text-text-primary">
                    Category *
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => updateField("category", value)}
                  >
                    <SelectTrigger className="mt-1.5 w-full" aria-invalid={!!errors.category}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-[12px] text-red-500 mt-1">{errors.category}</p>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <Label htmlFor="tagline" className="text-[13px] font-medium text-text-primary">
                    Tagline *
                  </Label>
                  <Input
                    id="tagline"
                    value={formData.tagline}
                    onChange={(e) => updateField("tagline", e.target.value)}
                    placeholder="A short catchy description"
                    className="mt-1.5"
                    aria-invalid={!!errors.tagline}
                  />
                  {errors.tagline && (
                    <p className="text-[12px] text-red-500 mt-1">{errors.tagline}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="description" className="text-[13px] font-medium text-text-primary">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    placeholder="Tell us more about this website or creator..."
                    className="mt-1.5 min-h-[120px]"
                    aria-invalid={!!errors.description}
                  />
                  {errors.description && (
                    <p className="text-[12px] text-red-500 mt-1">{errors.description}</p>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <Label htmlFor="images" className="text-[13px] font-medium text-text-primary">
                      Logo / Screenshot URL *
                    </Label>
                    <Input
                      id="images"
                      type="url"
                      value={formData.images}
                      onChange={(e) => updateField("images", e.target.value)}
                      placeholder="https://example.com/logo.png"
                      className="mt-1.5"
                      aria-invalid={!!errors.images}
                    />
                    {errors.images && (
                      <p className="text-[12px] text-red-500 mt-1">{errors.images}</p>
                    )}
                    <p className="text-[12px] text-text-secondary mt-2">
                      Provide a direct link to the logo or a screenshot of the website.
                    </p>
                  </div>

                  {formData.images && isValidUrl(formData.images) && (
                    <div className="rounded-[8px] border border-border-1 overflow-hidden">
                      <img
                        src={formData.images}
                        alt="Preview"
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  )}

                  <div className="rounded-[8px] bg-ui-2 p-4">
                    <h3 className="text-[14px] font-medium text-text-primary mb-2">
                      Review Your Submission
                    </h3>
                    <dl className="space-y-2 text-[13px]">
                      <div className="flex">
                        <dt className="text-text-secondary w-24">Name:</dt>
                        <dd className="text-text-primary">{formData.title}</dd>
                      </div>
                      <div className="flex">
                        <dt className="text-text-secondary w-24">URL:</dt>
                        <dd className="text-text-primary truncate">{formData.url}</dd>
                      </div>
                      <div className="flex">
                        <dt className="text-text-secondary w-24">Category:</dt>
                        <dd className="text-text-primary">{formData.category}</dd>
                      </div>
                      <div className="flex">
                        <dt className="text-text-secondary w-24">Tagline:</dt>
                        <dd className="text-text-primary">{formData.tagline}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              )}

            <div className="flex items-center justify-between mt-6 pt-6 border-t border-border-1">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={step === 1}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>

              {step < 3 ? (
                <Button onClick={handleNext} className="gap-2">
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Submit
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
