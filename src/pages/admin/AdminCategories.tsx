/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, FolderTree, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Id } from "../../../convex/_generated/dataModel";

const AdminCategories = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  // @ts-ignore
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    parent_id: "",
    is_active: true,
  });

  const categories = useQuery(api.categories.getCategories);
  const isLoading = categories === undefined;

  // @ts-ignore
  const parentCategories = categories?.filter((c) => !c.parent_id) || [];

  const createCategory = useMutation(api.categories.createCategory);
  const updateCategory = useMutation(api.categories.updateCategory);
  const deleteCategoryMutation = useMutation(api.categories.deleteCategory);

  const resetForm = () => {
    setFormData({ name: "", slug: "", parent_id: "", is_active: true });
    setEditingCategory(null);
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      parent_id: category.parent_id || "",
      is_active: category.is_active,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const categoryData = {
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
      // @ts-ignore
      parent_id: formData.parent_id ? (formData.parent_id as Id<"categories">) : undefined,
      is_active: formData.is_active,
    };

    try {
      if (editingCategory) {
        await updateCategory({
          id: editingCategory._id,
          name: categoryData.name,
          slug: categoryData.slug,
          parent_id: categoryData.parent_id,
          is_active: categoryData.is_active,
        });
        toast.success("Category updated successfully");
      } else {
        await createCategory(categoryData);
        toast.success("Category created successfully");
      }
      setDialogOpen(false);
      resetForm();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: Id<"categories">) => {
     if (confirm("Delete this category?")) {
        try {
          await deleteCategoryMutation({ id });
          toast.success("Category deleted successfully");
        } catch (error: any) {
          toast.error(error.message);
        }
     }
  };

  const getCategoryTree = () => {
    if (!categories) return [];
    const tree: any[] = [];
    
    // @ts-ignore
    parentCategories.forEach((parent) => {
      // @ts-ignore
      const children = categories.filter((c) => c.parent_id === parent._id);
      tree.push({ ...parent, children });
    });

    // Add orphan categories
    const orphans = categories.filter(
      // @ts-ignore
      (c) => c.parent_id && !categories.find((p) => p._id === c.parent_id)
    );
    orphans.forEach((orphan) => {
      tree.push({ ...orphan, children: [] });
    });

    return tree;
  };

  const categoryTree = getCategoryTree();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Categories</h1>
            <p className="text-muted-foreground mt-1">Organize your product catalog</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Category Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="auto-generated-from-name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parent">Parent Category</Label>
                  <Select
                    value={formData.parent_id || "__none__"}
                    onValueChange={(value) => setFormData({ ...formData, parent_id: value === "__none__" ? "" : value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="None (Top Level)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__none__">None (Top Level)</SelectItem>
                      {parentCategories
                        // @ts-ignore
                        .filter((cat) => cat._id !== editingCategory?._id)
                        // @ts-ignore
                        .map((cat) => (
                          <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {/* Convex mutations don't expose loading state directly here unless using specific hooks, we can assume fast or add state */}
                    {editingCategory ? "Update" : "Create"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderTree className="h-5 w-5" />
              Category Tree
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : categoryTree.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No categories yet</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden sm:table-cell">Slug</TableHead>
                      <TableHead className="hidden sm:table-cell">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categoryTree.map((parent) => (
                      <>
                        <TableRow key={parent._id}>
                          <TableCell>
                            <span className="font-medium">{parent.name}</span>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-muted-foreground">
                            {parent.slug}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <span
                              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                parent.is_active
                                  ? "bg-primary/20 text-primary"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {parent.is_active ? "Active" : "Inactive"}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleEdit(parent)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(parent._id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        {parent.children.map((child: any) => (
                          <TableRow key={child._id} className="bg-secondary/30">
                            <TableCell>
                              <span className="pl-6 text-muted-foreground">└</span>
                              <span className="ml-2">{child.name}</span>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell text-muted-foreground">
                              {child.slug}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <span
                                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                  child.is_active
                                    ? "bg-primary/20 text-primary"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {child.is_active ? "Active" : "Inactive"}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon" onClick={() => handleEdit(child)}>
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDelete(child._id)}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminCategories;
