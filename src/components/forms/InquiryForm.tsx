import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send, CheckCircle } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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

const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().optional(),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  country: z.string().optional(),
  productId: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

interface InquiryFormProps {
  preselectedProductId?: string;
  preselectedProductName?: string;
}

export function InquiryForm({ preselectedProductId, preselectedProductName }: InquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const { data: products } = useQuery({
    queryKey: ["products-for-inquiry"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id, name")
        .eq("is_active", true)
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      productId: preselectedProductId || "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InquiryFormData) => {
      const productName = data.productId
        ? products?.find((p) => p.id === data.productId)?.name || preselectedProductName
        : preselectedProductName;

      const { error } = await supabase.from("inquiries").insert({
        name: data.name,
        company: data.company || null,
        email: data.email,
        phone: data.phone || null,
        country: data.country || null,
        product_id: data.productId || preselectedProductId || null,
        product_name: productName || null,
        message: data.message,
        status: "new",
      });

      if (error) throw error;
    },
    onSuccess: () => {
      setSubmitted(true);
      reset();
      toast.success("Inquiry submitted successfully!");
    },
    onError: () => {
      toast.error("Failed to submit inquiry. Please try again.");
    },
  });

  const onSubmit = (data: InquiryFormData) => {
    mutation.mutate(data);
  };

  if (submitted) {
    return (
      <div className="rounded-xl bg-card border border-border p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-success" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Thank You!
        </h3>
        <p className="text-muted-foreground mb-6">
          Your inquiry has been submitted successfully. Our export team will contact you within 24 business hours.
        </p>
        <Button onClick={() => setSubmitted(false)} variant="outline">
          Submit Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-xl bg-card border border-border p-6 md:p-8 space-y-6"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            placeholder="John Doe"
            {...register("name")}
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        {/* Company */}
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            placeholder="Company Name"
            {...register("company")}
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@company.com"
            {...register("email")}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            placeholder="+1 234 567 8900"
            {...register("phone")}
          />
        </div>

        {/* Country */}
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            placeholder="United States"
            {...register("country")}
          />
        </div>

        {/* Product Interest */}
        <div className="space-y-2">
          <Label htmlFor="productId">Product Interest</Label>
          <Select
            value={watch("productId") || ""}
            onValueChange={(value) => setValue("productId", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a product" />
            </SelectTrigger>
            <SelectContent>
              {products?.map((product) => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          placeholder="Tell us about your requirements, quantities, and any specific needs..."
          rows={5}
          {...register("message")}
          className={errors.message ? "border-destructive" : ""}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" />
            Submit Inquiry
          </>
        )}
      </Button>
    </form>
  );
}
