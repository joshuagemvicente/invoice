import React, { useState } from "react";
import {
  Download,
  Edit,
  Filter,
  MoreHorizontal,
  Trash2,
  LayoutGrid,
  LayoutList,
} from "lucide-react";
import { type LoaderFunctionArgs } from "react-router";
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
  TableCaption,
  TableCell,
  TableFooter,
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

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    sku: "WH-100",
    category: "Electronics",
    price: 89.99,
    stock: 45,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Office Chair",
    sku: "OC-200",
    category: "Furniture",
    price: 199.99,
    stock: 12,
    status: "In Stock",
  },
  {
    id: 3,
    name: "Desk Lamp",
    sku: "DL-150",
    category: "Furniture",
    price: 34.99,
    stock: 8,
    status: "Low Stock",
  },
  {
    id: 4,
    name: "Smartphone Case",
    sku: "SC-300",
    category: "Accessories",
    price: 19.99,
    stock: 67,
    status: "In Stock",
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    sku: "BS-250",
    category: "Electronics",
    price: 59.99,
    stock: 23,
    status: "In Stock",
  },
  {
    id: 6,
    name: "Mechanical Keyboard",
    sku: "MK-400",
    category: "Electronics",
    price: 129.99,
    stock: 5,
    status: "Low Stock",
  },
  {
    id: 7,
    name: "Monitor Stand",
    sku: "MS-350",
    category: "Furniture",
    price: 49.99,
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: 8,
    name: "Wireless Mouse",
    sku: "WM-500",
    category: "Electronics",
    price: 39.99,
    stock: 31,
    status: "In Stock",
  },
  {
    id: 9,
    name: "USB-C Cable",
    sku: "UC-600",
    category: "Accessories",
    price: 14.99,
    stock: 102,
    status: "In Stock",
  },
  {
    id: 10,
    name: "External SSD",
    sku: "ES-700",
    category: "Electronics",
    price: 149.99,
    stock: 18,
    status: "In Stock",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {}

export default function DashboardProducts() {
  const [viewMode, setViewMode] = useState("table");

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
                  <AddProduct />
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
                      <TableHead>SKU</TableHead>
                      <TableHead className="cursor-pointer">Category</TableHead>
                      <TableHead className="cursor-pointer text-right">
                        Price
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
                        <TableCell>{product.sku}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell className="text-right">
                          ${product.price.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          {product.stock}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`
                                  ${
                                    product.status === "In Stock"
                                      ? "bg-green-50 text-green-700 border-green-200"
                                      : product.status === "Low Stock"
                                      ? "bg-amber-50 text-amber-700 border-amber-200"
                                      : "bg-red-50 text-red-700 border-red-200"
                                  }
                                `}
                          >
                            {product.status}
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
