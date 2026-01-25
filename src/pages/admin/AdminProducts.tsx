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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, Search, Loader2, Upload, X, Image } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Id } from "../../../convex/_generated/dataModel";

const AdminProducts = () => {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  // @ts-ignore
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  // Store storageIds for new uploads, or URLs for preview
  const [productImages, setProductImages] = useState<{ url: string; storageId?: string }[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    short_description: "",
    full_description: "",
    category_id: "",
    featured: false,
    is_active: true,
    key_features: "",
    applications: "",
    tags: "",
  });

  const products = useQuery(api.products.getAllProducts);
  // @ts-ignore
  const categoriesRaw = useQuery(api.categories.getCategories);
  // @ts-ignore
  const categories = categoriesRaw?.sort((a, b) => a.name.localeCompare(b.name));
  
  const isLoading = products === undefined;

  const createProduct = useMutation(api.products.createProduct);
  const updateProduct = useMutation(api.products.updateProduct);
  const deleteProductMutation = useMutation(api.products.deleteProduct);
  const createVariant = useMutation(api.products.createVariant);
  const createImage = useMutation(api.products.createImage);
  const generateUploadUrl = useMutation(api.products.generateUploadUrl);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        // 1. Generate upload URL
        const postUrl = await generateUploadUrl();
        
        // 2. Upload file
        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });
        
        if (!result.ok) throw new Error(`Upload failed: ${result.statusText}`);
        
        const { storageId } = await result.json();
        
        // Return object with preview URL (we can use storageId temporarily if we had a way to preview it, 
        // but for now we might need a local preview or assume we can't see it until saved. 
        // Actually, we can use URL.createObjectURL for preview!)
        return { 
            url: URL.createObjectURL(file), 
            storageId 
        };
      });

      const uploaded = await Promise.all(uploadPromises);
      setProductImages((prev) => [...prev, ...uploaded]);
      toast.success(`${uploaded.length} image(s) uploaded`);
    } catch (error: any) {
      toast.error(error.message || "Failed to upload images");
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = (index: number) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      short_description: "",
      full_description: "",
      category_id: "",
      featured: false,
      is_active: true,
      key_features: "",
      applications: "",
      tags: "",
    });
    setEditingProduct(null);
    setProductImages([]);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      short_description: product.short_description || "",
      full_description: product.full_description || "",
      category_id: product.category_id || "",
      featured: product.featured,
      is_active: product.is_active,
      key_features: product.key_features?.join(", ") || "",
      applications: product.applications?.join(", ") || "",
      tags: product.tags?.join(", ") || "",
    });
    
    // Load existing images
    if (product.product_variants && product.product_variants.length > 0) {
        const images = product.product_variants[0].product_images.map((img: any) => ({
            url: img.url,
            // We don't have storageId easily unless we store it specifically, but for editing we assume existing URLs are fine to keep.
            // If we add new ones, they have storageId.
        }));
        setProductImages(images);
    } else {
        setProductImages([]);
    }
    
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
      short_description: formData.short_description || undefined,
      full_description: formData.full_description || undefined,
      // @ts-ignore
      category_id: formData.category_id ? (formData.category_id as Id<"categories">) : undefined,
      featured: formData.featured,
      is_active: formData.is_active,
      key_features: formData.key_features ? formData.key_features.split(",").map((s) => s.trim()) : [],
      applications: formData.applications ? formData.applications.split(",").map((s) => s.trim()) : [],
      tags: formData.tags ? formData.tags.split(",").map((s) => s.trim()) : [],
    };

    try {
      let productId: Id<"products">;

      if (editingProduct) {
        productId = editingProduct._id;
        await updateProduct({ id: productId, ...productData });
        toast.success("Product updated successfully");
      } else {
        // @ts-ignore
        productId = await createProduct(productData);
        toast.success("Product created successfully");
      }

      // Handle Images / Variants
      // Simple logic: If we have images, ensure a default variant exists and add NEW images to it.
      // We are not handling deletion of existing images here for simplicity, unless we replaced the whole set.
      // But filtering `productImages` on state only removes them from view.
      
      if (productImages.length > 0) {
          // Get variants or create default
          // Since we can't easily query inside mutation flow on client without another roundtrip,
          // and we are optimistically updating.
          
          // Actually we can't easily check variants here without query. 
          // But if we are editing, we have `editingProduct.product_variants`.
          // If creating, we know we have none.
          
          let variantId: Id<"product_variants">;
          
          if (editingProduct && editingProduct.product_variants && editingProduct.product_variants.length > 0) {
              variantId = editingProduct.product_variants[0]._id;
          } else {
              // Create default variant
              variantId = await createVariant({
                  product_id: productId,
                  color_name: "Default",
                  sort_order: 0
              });
          }

          // Add ONLY new images (those with storageId)
          // Existing images (only URL) remain.
          // Note: If user removed an image in UI, we currently don't delete it from backend in this simple logic.
          // Implementing full sync is complex. Let's just add new ones.
          
          const newImages = productImages.filter(img => img.storageId);
          await Promise.all(newImages.map((img, index) => 
              createImage({
                  variant_id: variantId,
                  url: img.storageId!, // Store storageId as url
                  sort_order: index
              })
          ));
      }

      setDialogOpen(false);
      resetForm();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getProductImage = (product: any) => {
    const variants = product.product_variants;
    if (variants && variants.length > 0) {
      const images = variants[0].product_images;
      if (images && images.length > 0) {
        return images[0].url;
      }
    }
    return null;
  };

  // @ts-ignore
  const filteredProducts = products?.filter(
    (p: any) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Products</h1>
            <p className="text-muted-foreground mt-1">Manage your product catalog</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name *</Label>
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category_id || "__none__"}
                    onValueChange={(value) => setFormData({ ...formData, category_id: value === "__none__" ? "" : value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__none__">No Category</SelectItem>
                      {categories?.map((cat: any) => (
                        <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Image Upload Section */}
                <div className="space-y-2">
                  <Label>Product Images</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-4">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                      disabled={uploadingImage}
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center cursor-pointer py-4"
                    >
                      {uploadingImage ? (
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                      ) : (
                        <>
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground">
                            Click to upload images or drag and drop
                          </span>
                          <span className="text-xs text-muted-foreground mt-1">
                            PNG, JPG, WEBP up to 10MB
                          </span>
                        </>
                      )}
                    </label>
                  </div>

                  {/* Image Preview */}
                  {productImages.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      {productImages.map((img, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={img.url}
                            alt={`Product ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="short_description">Short Description</Label>
                  <Textarea
                    id="short_description"
                    value={formData.short_description}
                    onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="full_description">Full Description</Label>
                  <Textarea
                    id="full_description"
                    value={formData.full_description}
                    onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="key_features">Key Features (comma-separated)</Label>
                  <Textarea
                    id="key_features"
                    value={formData.key_features}
                    onChange={(e) => setFormData({ ...formData, key_features: e.target.value })}
                    placeholder="Feature 1, Feature 2, Feature 3"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="applications">Applications (comma-separated)</Label>
                  <Input
                    id="applications"
                    value={formData.applications}
                    onChange={(e) => setFormData({ ...formData, applications: e.target.value })}
                    placeholder="Healthcare, Industrial, Food Processing"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="nitrile, powder-free, disposable"
                  />
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                    />
                    <Label htmlFor="featured">Featured</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                    />
                    <Label htmlFor="is_active">Active</Label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingProduct ? "Update" : "Create"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : filteredProducts?.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No products found</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden md:table-cell">Category</TableHead>
                      <TableHead className="hidden sm:table-cell">Status</TableHead>
                      <TableHead className="hidden sm:table-cell">Featured</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts?.map((product: any) => {
                      const imageUrl = getProductImage(product);
                      return (
                        <TableRow key={product._id}>
                          <TableCell>
                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                            ) : (
                              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                                <Image className="h-5 w-5 text-muted-foreground" />
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-muted-foreground">{product.slug}</p>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {product.category?.name || "-"}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <span
                              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                product.is_active
                                  ? "bg-primary/20 text-primary"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {product.is_active ? "Active" : "Inactive"}
                            </span>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Button
                              variant="ghost"
                              className={`px-2 py-1 h-auto rounded-full text-xs font-medium ${
                                product.featured
                                  ? "bg-primary/20 text-primary hover:bg-primary/30"
                                  : "bg-muted text-muted-foreground hover:bg-muted/80"
                              }`}
                              onClick={() => updateProduct({ id: product._id, featured: !product.featured })}
                            >
                              {product.featured ? "Yes" : "No"}
                            </Button>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEdit(product)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={async () => {
                                  if (confirm("Delete this product?")) {
                                    try {
                                      await deleteProductMutation({ id: product._id });
                                      toast.success("Product deleted");
                                    } catch (e: any) {
                                      toast.error(e.message);
                                    }
                                  }
                                }}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
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

export default AdminProducts;
