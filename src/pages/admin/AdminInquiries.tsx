/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Eye, Mail, Phone, Building, Globe } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Id } from "../../../convex/_generated/dataModel";

const statusOptions = [
  { value: "new", label: "New", color: "bg-primary/20 text-primary" },
  { value: "contacted", label: "Contacted", color: "bg-accent/20 text-accent-foreground" },
  { value: "quoted", label: "Quoted", color: "bg-muted text-muted-foreground" },
  { value: "closed", label: "Closed", color: "bg-secondary text-secondary-foreground" },
];

const AdminInquiries = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  // @ts-ignore
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);

  const inquiries = useQuery(api.inquiries.getInquiries);
  const isLoading = inquiries === undefined;

  const updateStatusMutation = useMutation(api.inquiries.updateInquiryStatus);

  const handleUpdateStatus = async (id: Id<"inquiries">, status: string) => {
    try {
      await updateStatusMutation({ id, status });
      toast.success("Status updated");
      if (selectedInquiry && selectedInquiry._id === id) {
        setSelectedInquiry({ ...selectedInquiry, status });
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const filteredInquiries = inquiries?.filter((i: any) => {
    const matchesSearch =
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.email.toLowerCase().includes(search.toLowerCase()) ||
      (i.company && i.company.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = !statusFilter || statusFilter === "__all__" || i.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status: string) => {
    return statusOptions.find((s) => s.value === status)?.color || "bg-muted text-muted-foreground";
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inquiries</h1>
          <p className="text-muted-foreground mt-1">Manage customer inquiries and RFQs</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search inquiries..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter || "__all__"} onValueChange={(value) => setStatusFilter(value === "__all__" ? "" : value)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__all__">All Status</SelectItem>
                  {statusOptions.map((s) => (
                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : filteredInquiries?.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No inquiries found</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contact</TableHead>
                      <TableHead className="hidden md:table-cell">Product</TableHead>
                      <TableHead className="hidden sm:table-cell">Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInquiries?.map((inquiry: any) => (
                      <TableRow key={inquiry._id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{inquiry.name}</p>
                            <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {inquiry.product_name || inquiry.subject || "-"}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-muted-foreground">
                          {new Date(inquiry.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={inquiry.status}
                            onValueChange={(value) => handleUpdateStatus(inquiry._id, value)}
                          >
                            <SelectTrigger className="w-28 h-8">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(inquiry.status)}`}>
                                {inquiry.status}
                              </span>
                            </SelectTrigger>
                            <SelectContent>
                              {statusOptions.map((s) => (
                                <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => setSelectedInquiry(inquiry)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Detail Dialog */}
        <Dialog open={!!selectedInquiry} onOpenChange={() => setSelectedInquiry(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Inquiry Details</DialogTitle>
            </DialogHeader>
            {selectedInquiry && (
              <div className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold">
                        {selectedInquiry.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{selectedInquiry.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(selectedInquiry.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <a href={`mailto:${selectedInquiry.email}`} className="hover:text-primary">
                        {selectedInquiry.email}
                      </a>
                    </div>
                    {selectedInquiry.phone && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <a href={`tel:${selectedInquiry.phone}`} className="hover:text-primary">
                          {selectedInquiry.phone}
                        </a>
                      </div>
                    )}
                    {selectedInquiry.company && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building className="h-4 w-4" />
                        <span>{selectedInquiry.company}</span>
                      </div>
                    )}
                    {selectedInquiry.country && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Globe className="h-4 w-4" />
                        <span>{selectedInquiry.country}</span>
                      </div>
                    )}
                  </div>
                </div>

                {(selectedInquiry.product_name || selectedInquiry.subject) && (
                  <div className="p-3 rounded-lg bg-secondary/50 border border-border">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      {selectedInquiry.product_name ? "Product" : "Subject"}
                    </p>
                    <p className="font-medium">{selectedInquiry.product_name || selectedInquiry.subject}</p>
                  </div>
                )}

                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Message</p>
                  <p className="text-foreground whitespace-pre-wrap">{selectedInquiry.message}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <Select
                      value={selectedInquiry.status}
                      onValueChange={(value) => handleUpdateStatus(selectedInquiry._id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((s) => (
                          <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline" onClick={() => setSelectedInquiry(null)}>
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminInquiries;
