import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, FolderTree, MessageSquare, Eye } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const AdminDashboard = () => {
  const stats = useQuery(api.dashboard.getStats);
  const recentInquiries = useQuery(api.dashboard.getRecentInquiries);
  const isLoading = stats === undefined;
  const loadingInquiries = recentInquiries === undefined;

  const statCards = [
    { title: "Total Products", value: stats?.products || 0, icon: Package, color: "bg-primary" },
    { title: "Categories", value: stats?.categories || 0, icon: FolderTree, color: "bg-accent" },
    { title: "Total Inquiries", value: stats?.inquiries || 0, icon: MessageSquare, color: "bg-muted" },
    { title: "New Inquiries", value: stats?.newInquiries || 0, icon: Eye, color: "bg-destructive" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back to your admin panel</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <Icon className="h-4 w-4 text-primary-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <Skeleton className="h-8 w-16" />
                  ) : (
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Inquiries */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingInquiries ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : recentInquiries?.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No inquiries yet</p>
            ) : (
              <div className="space-y-3">
                {recentInquiries?.map((inquiry) => (
                  <div
                    key={inquiry._id}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{inquiry.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{inquiry.email}</p>
                    </div>
                    <div className="text-right ml-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          inquiry.status === "new"
                            ? "bg-primary/20 text-primary"
                            : inquiry.status === "contacted"
                            ? "bg-accent/20 text-accent-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {inquiry.status}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(inquiry.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
