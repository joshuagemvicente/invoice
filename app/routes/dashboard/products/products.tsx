import { useEffect, useState } from "react";
import {
  Download,
  Edit,
  Filter,
  MoreHorizontal,
  Trash2,
  LayoutGrid,
  LayoutList,
} from "lucide-react";
import {
  data,
  useActionData,
  useLoaderData,
  type ActionFunctionArgs,
} from "react-router";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Checkbox } from "~/components/ui/checkbox";
import { Badge } from "~/components/ui/badge";
import {
  DialogTrigger,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from "~/components/ui/dialog";
import { AddProduct } from "~/components/dashboard/products/form";
import { prisma } from "~/lib/prisma";
import { createProductSchema } from "~/validations/dashboard/products";
import { formatCurrency } from "~/lib/currency";
import { toast } from "sonner";

export async function loader() {
  const categories = await prisma.category.findMany();
  const products = await prisma.product.findMany({
    take: 10,
    select: {
      id: true,
      name: true,
      description: true,
      stock: true,
      price: true,
      status: true,
      Category: {
        select: {
          name: true,
        },
      },
    },
  });

  return { products, categories };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const stock = Number(formData.get("stock"));
  const price = Number(formData.get("price"));
  const category = formData.get("category");

  let status: "inStock" | "lowStock" | "outOfStock";
  if (stock <= 0) {
    status = "outOfStock";
  } else if (stock < 3) {
    status = "lowStock";
  } else {
    status = "inStock";
  }

  const parse = createProductSchema.safeParse({
    name,
    description,
    category,
    price,
    stock,
  });

  if (!parse.success) {
    const errorMessages = parse.error.format();
    return { errorMessages };
  }

  const {
    name: pName,
    description: pDescription,
    stock: pStock,
    price: pPrice,
    category: pCategory,
  } = parse.data;

  if (!name || !description || !stock || !price || !category) {
    return data({ error: "Fields are all required." });
  }

  const existingProduct = await prisma.product.findFirst({
    where: {
      name: pName,
    },
  });

  if (existingProduct) {
    return data({ error: "This product already exists." });
  }

  await prisma.product.create({
    data: {
      name: pName,
      description: pDescription,
      stock: pStock,
      price: pPrice,
      status,
      Category: { connect: { id: pCategory } },
    },
  });

  return data({ success: "Product has been created." });
}

export default function DashboardProducts() {
  const { products, categories } = useLoaderData();
  const actionData = useActionData();
  const [viewMode, setViewMode] = useState("table");

  function getReadableStatus(status: string) {
    switch (status) {
      case "inStock":
        return "In Stock";
      case "lowStock":
        return "Low Stock";
      case "outOfStock":
        return "Out of Stock";
      default:
        return status;
    }
  }

  useEffect(() => {
    if (actionData) {
      if (actionData.error) {
        toast.error(actionData.error);
      } else {
        toast.success(actionData.success);
      }
    }
  }, [actionData]);

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Products</CardTitle>
              <CardDescription>Manage your product catalog.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Add Product</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add a Product</DialogTitle>
                    <DialogDescription>
                      Input a name, description, current stock, price, and
                      status
                    </DialogDescription>
                  </DialogHeader>
                  {/* Start of Component Add Form */}
                  <AddProduct categories={categories} />
                  {/* End of Component Add Form */}
                </DialogContent>
              </Dialog>
              <Button variant="outline" className="h-8" size="sm">
                <Filter />
                Filter
              </Button>
              <Button variant="outline" className="h-8" size="sm">
                <Download />
                Export
              </Button>
              <div className="flex border  rounded-md">
                <Button
                  variant={viewMode === "table" ? "secondary" : "ghost"}
                  onClick={() => setViewMode("table")}
                >
                  {/* <Button variant="ghost" onClick={viewMode === "table"}> */}
                  <LayoutGrid />
                </Button>
                {/* <Button variant="ghost"> */}
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  onClick={() => setViewMode("grid")}
                >
                  {/* <Button variant="ghost" onClick={viewMode === "grid"}> */}
                  <LayoutList />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === "table" ? (
            <>
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox />
                      </TableHead>
                      <TableHead className="cursor-pointer">
                        Product Name
                      </TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="cursor-pointer">Category</TableHead>
                      <TableHead className="cursor-pointer text-right">
                        Base Price
                      </TableHead>
                      <TableHead className="cursor-pointer text-right">
                        Stock
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-12">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell className="font-medium cursor-pointer hover:text-primary">
                          {product.name}
                        </TableCell>
                        <TableCell>{product.description}</TableCell>
                        <TableCell>{product.Category?.name}</TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(product.price.toFixed(2))}
                        </TableCell>
                        <TableCell className="text-right">
                          {product.stock}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`
                                  ${
                                    product.status === "inStock"
                                      ? "bg-green-50 text-green-700 border-green-200"
                                      : product.status === "lowStock"
                                      ? "bg-amber-50 text-amber-700 border-amber-200"
                                      : "bg-red-50 text-red-700 border-red-200"
                                  }
                                `}
                          >
                            {getReadableStatus(product.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Product
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Product
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          ) : (
            <div>Grid</div>
          )}
        </CardContent>
        {/* <CardContent></CardContent> */}
        {/* viewMode === table use table component */}
        {/* viewMode === grid use grid layout */}
      </Card>
      <div>Products</div>
    </div>
  );
}
