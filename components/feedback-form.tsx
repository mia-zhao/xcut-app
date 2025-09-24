"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Send } from "lucide-react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const GOOGLE_FORM_ID =
  "1FAIpQLSeVVypmp7esgKhZHLahNGyVnDVGR4rvGzUM6loVb8dJ5CYJNg";
const GOOGLE_FORM_URL = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;
const EMAIL_ENTRY_ID = "entry.456719025";
const CATEGORY_ENTRY_ID = "entry.898720960";
const DESCRIPTION_ENTRY_ID = "entry.1729187564";

export default function FeedbackForm() {
  const t = useTranslations("feedback");
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const feedbackSchema = useMemo(
    () =>
      z.object({
        email: z.email({ message: t("form.validation.email") }),
        category: z.enum(["feature", "bug", "other"]),
        message: z.string().min(1, { message: t("form.validation.message") }),
      }),
    [t]
  );

  type FeedbackFormValues = z.infer<typeof feedbackSchema>;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      category: "feature",
      message: "",
    },
  });

  async function onSubmit(data: FeedbackFormValues) {
    const formData = new FormData();
    formData.append(EMAIL_ENTRY_ID, data.email);
    formData.append(CATEGORY_ENTRY_ID, data.category);
    formData.append(DESCRIPTION_ENTRY_ID, data.message);

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });
      setIsSubmitSuccessful(true);
      reset();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setErrorOpen(true);
    }
  }

  if (isSubmitSuccessful) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center space-y-4 py-8 text-center">
        <CheckCircle2 className="h-16 w-16 text-primary" />
        <h3 className="text-2xl font-semibold">{t("success.title")}</h3>
        <p className="text-muted-foreground max-w-md">
          {t("success.description")}
        </p>
        <Button
          variant="outline"
          onClick={() => setIsSubmitSuccessful(false)}
          className="mt-4"
        >
          {t("success.next")}
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6 mb-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-muted-foreground">{t("description")}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            fieldId="email"
            label={t("form.email.label")}
            description={t("form.email.description")}
            field={
              <Input
                id="email"
                type="email"
                placeholder={t("form.email.placeholder")}
                {...register("email")}
              />
            }
            isRequired
            error={errors.email?.message}
          />

          <FormField
            fieldId="category"
            label={t("form.category.label")}
            field={
              <Select
                defaultValue={control._defaultValues.category}
                onValueChange={(value) =>
                  setValue("category", value as "feature" | "bug" | "other")
                }
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder={t("form.category.placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="feature">
                    {t("form.category.options.feature")}
                  </SelectItem>
                  <SelectItem value="bug">
                    {t("form.category.options.bug")}
                  </SelectItem>
                  <SelectItem value="other">
                    {t("form.category.options.other")}
                  </SelectItem>
                </SelectContent>
              </Select>
            }
            isRequired
          />

          <FormField
            fieldId="message"
            label={t("form.message.label")}
            description={t("form.message.description")}
            field={
              <Textarea
                id="message"
                placeholder={t("form.message.placeholder")}
                {...register("message")}
                rows={5}
              />
            }
            isRequired
            error={errors.message?.message}
          />

          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full"
          >
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? t("form.submitting") : t("form.submit")}
          </Button>
        </form>
      </div>

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

const FormField = ({
  fieldId,
  label,
  description,
  field,
  isRequired = false,
  error,
}: {
  fieldId: string;
  label: string;
  description?: string;
  field: React.ReactNode;
  isRequired?: boolean;
  error?: string;
}) => {
  return (
    <div className="space-y-2">
      <div className="flex flex-col space-y-1">
        <label htmlFor={fieldId} className="font-medium">
          {label}
          {isRequired && <span className="text-destructive ml-1">*</span>}
        </label>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {field}
      {error && (
        <p
          id={`${fieldId}-error`}
          role="alert"
          className="text-sm text-destructive mt-1"
        >
          {error}
        </p>
      )}
    </div>
  );
};
