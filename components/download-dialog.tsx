"use client";

import {
  AlertCircle,
  CheckCircle2,
  Download,
  ExternalLink,
  Send,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Category,
  CATEGORY_ENTRY_ID,
  DESCRIPTION_ENTRY_ID,
  EMAIL_ENTRY_ID,
  GOOGLE_FORM_URL,
} from "@/config/form";

interface DownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DOWNLOAD_PATH = "/updates";
const DOWNLOAD_VERSION = "XCut-0.9.4-beta.dmg";

type DownloadStatus = "downloading" | "success" | "failed";

export default function DownloadDialog({
  open,
  onOpenChange,
}: DownloadDialogProps) {
  const t = useTranslations("downloadSignup");
  const [downloadStatus, setDownloadStatus] =
    useState<DownloadStatus>("downloading");
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setDownloadStatus("downloading");
      setIsSubmitSuccessful(false);

      fetch(`${DOWNLOAD_PATH}/${DOWNLOAD_VERSION}`, {
        method: "HEAD",
      })
        .then((response) => {
          if (!response.ok) {
            setDownloadStatus("failed");
            return;
          }

          const link = document.createElement("a");
          link.href = `${DOWNLOAD_PATH}/${DOWNLOAD_VERSION}`;
          link.download = DOWNLOAD_VERSION;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          setTimeout(() => {
            setDownloadStatus("success");
          }, 500);
        })
        .catch((error) => {
          console.error("Download failed:", error);
          setDownloadStatus("failed");
        });
    }
  }, [open]);

  type SignupFormValues = {
    email?: string;
    subscribe: boolean;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<SignupFormValues>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: SignupFormValues) {
    const emailValidation = z.string().email().safeParse(data.email);
    if (!emailValidation.success) {
      setError("email", {
        type: "manual",
        message: t("form.validation.email"),
      });
      return;
    }

    const formData = new FormData();
    if (data.email) {
      formData.append(EMAIL_ENTRY_ID, data.email);
      formData.append(CATEGORY_ENTRY_ID, Category.other);
      formData.append(DESCRIPTION_ENTRY_ID, "updates");
    }

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });
      setIsSubmitSuccessful(true);
      reset();
    } catch (error) {
      console.error("Error submitting:", error);
      setErrorOpen(true);
    }
  }

  const handleClose = () => {
    setIsSubmitSuccessful(false);
    setErrorOpen(false);
    onOpenChange(false);
    reset();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          {isSubmitSuccessful ? (
            <div className="flex flex-col items-center justify-center space-y-4 py-6 text-center">
              <CheckCircle2 className="h-16 w-16 text-primary" />
              <DialogHeader>
                <DialogTitle className="text-2xl text-center">
                  {t("emailSuccess.title")}
                </DialogTitle>
                <DialogDescription className="text-base">
                  {t("emailSuccess.description")}
                </DialogDescription>
              </DialogHeader>
              <Button onClick={handleClose} className="mt-4">
                {t("emailSuccess.close")}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col space-y-6 py-6">
              {/* Download Status */}
              <div className="flex flex-col items-center space-y-4 text-center">
                {downloadStatus === "downloading" && (
                  <>
                    <Download className="h-16 w-16 text-primary animate-pulse" />
                    <DialogHeader>
                      <DialogTitle className="text-2xl text-center">
                        {t("downloading.title")}
                      </DialogTitle>
                      <DialogDescription className="text-center">
                        {t.rich("downloading.description", {
                          file: DOWNLOAD_VERSION,
                        })}
                      </DialogDescription>
                    </DialogHeader>
                  </>
                )}

                {downloadStatus === "success" && (
                  <>
                    <CheckCircle2 className="h-16 w-16 text-primary" />
                    <DialogHeader>
                      <DialogTitle className="text-2xl text-center">
                        {t("success.title")}
                      </DialogTitle>
                      <DialogDescription>
                        {t("success.description")}
                      </DialogDescription>
                    </DialogHeader>
                  </>
                )}

                {downloadStatus === "failed" && (
                  <>
                    <AlertCircle className="h-16 w-16 text-destructive" />
                    <DialogHeader>
                      <DialogTitle className="text-2xl text-center">
                        {t("failed.title")}
                      </DialogTitle>
                      <DialogDescription className="space-y-3">
                        <p>{t("failed.description")}</p>
                        <a
                          href={`${DOWNLOAD_PATH}/${DOWNLOAD_VERSION}`}
                          download
                          className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                        >
                          <ExternalLink className="h-4 w-4" />
                          {t.rich("failed.directLink", {
                            file: DOWNLOAD_VERSION,
                          })}
                        </a>
                      </DialogDescription>
                    </DialogHeader>
                  </>
                )}
              </div>

              {/* Email Signup Form */}
              {downloadStatus !== "downloading" && (
                <>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {t("emailDescription")}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Input
                        id="email"
                        type="email"
                        placeholder={t("form.email.placeholder")}
                        {...register("email")}
                        className="w-full"
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleClose}
                        className="flex-1"
                      >
                        {t("form.skip")}
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        {isSubmitting ? t("form.submitting") : t("form.submit")}
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Error Dialog */}
      <Dialog open={errorOpen} onOpenChange={setErrorOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("error.title")}</DialogTitle>
            <DialogDescription>{t("error.description")}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setErrorOpen(false)}>
              {t("error.confirm")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
