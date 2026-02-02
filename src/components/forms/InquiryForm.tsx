/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send, CheckCircle } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
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
import { COMPANY } from "@/lib/constants";

import { Id } from "../../../convex/_generated/dataModel";

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

  const productsRaw = useQuery(api.products.getProducts);
  const products = productsRaw
    // @ts-ignore
    ?.filter((p) => p.is_active)
    // @ts-ignore
    .sort((a, b) => a.name.localeCompare(b.name));

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

  const createInquiry = useMutation(api.inquiries.createInquiry);

  const onSubmit = async (data: InquiryFormData) => {
    try {
      const productName = data.productId
        // @ts-ignore
        ? products?.find((p) => p._id === data.productId)?.name || preselectedProductName
        : preselectedProductName;

      await createInquiry({
        name: data.name,
        company: data.company,
        email: data.email,
        phone: data.phone,
        country: data.country,
        product_id: (data.productId || preselectedProductId) as Id<"products"> | undefined,
        product_name: productName,
        message: data.message,
      });

      // Redirect to WhatsApp
      const whatsappNumber = COMPANY.whatsapp.replace(/\D/g, ""); // Remove non-digits
      const messageText = `*New Inquiry via Website*
      
*Name:* ${data.name}
${data.company ? `*Company:* ${data.company}` : ""}
${productName ? `*Product:* ${productName}` : ""}
*Email:* ${data.email}
${data.phone ? `*Phone:* ${data.phone}` : ""}

*Message:*
${data.message}`;

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`;
      window.open(whatsappUrl, "_blank");

      setSubmitted(true);
      reset();
      toast.success("Inquiry submitted successfully! Redirecting to WhatsApp...");
    } catch (error) {
      toast.error("Failed to submit inquiry. Please try again.");
    }
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
              {products?.map((product: any) => (
                <SelectItem key={product._id} value={product._id}>
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
        // Disabled logic for Convex mutation pending state is different.
        // useMutation doesn't provide isPending directly in the returned function, 
        // unlike TanStack Query's useMutation object.
        // We can manage loading state manually or use the `useMutation` hook from `convex/react` 
        // which returns `[mutate, { loading, ... }]`? No, Convex `useMutation` returns just the mutate function.
        // We have to manage loading state manually if we want to show spinner.
      >
        <Send className="h-4 w-4 mr-2" />
        Submit Inquiry
      </Button>
    </form>
  );
}
