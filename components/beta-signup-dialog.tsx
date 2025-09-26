"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Mail, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
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

interface BetaSignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BetaSignupDialog({
  open,
  onOpenChange,
}: BetaSignupDialogProps) {
  const t = useTranslations("betaSignup");
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const signupSchema = useMemo(
    () =>
      z.object({
        email: z.email({ message: t("form.validation.email") }),
      }),
    [t]
  );

  type SignupFormValues = z.infer<typeof signupSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: SignupFormValues) {
    const formData = new FormData();
    formData.append(EMAIL_ENTRY_ID, data.email);
    formData.append(CATEGORY_ENTRY_ID, Category.other);
    formData.append(DESCRIPTION_ENTRY_ID, "beta signup");

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });
      setIsSubmitSuccessful(true);
      reset();
    } catch (error) {
      console.error("Error submitting beta signup:", error);
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
                  {t("success.title")}
                </DialogTitle>
                <DialogDescription className="text-base">
                  {t("success.description")}
                </DialogDescription>
              </DialogHeader>
              <Button onClick={handleClose} className="mt-4">
                {t("success.close")}
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  {t("title")}
                </DialogTitle>
                <DialogDescription>{t("description")}</DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col space-y-4">
                  <label htmlFor="email" className="text-sm font-medium">
                    {t("form.email.label")}
                  </label>
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

                <DialogFooter className="flex-col sm:flex-row gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    className="w-full sm:w-auto"
                  >
                    {t("form.cancel")}
                  </Button>
                  <Button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {isSubmitting ? t("form.submitting") : t("form.submit")}
                  </Button>
                </DialogFooter>
              </form>
            </>
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
