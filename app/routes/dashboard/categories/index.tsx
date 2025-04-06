import React, { useState } from "react";
import {
  useLoaderData,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
import { prisma } from "~/lib/prisma";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TableFooter,
} from "~/components/ui/table";
import { formatCurrency } from "~/lib/currency";
import { ChevronDown, ChevronUp, Folder } from "lucide-react";

export type CategoryData = {
  totalCategoriesCount: number | null;
  totalProductsCount: number | null;
  totalProductPrice: number | null;
  isActiveCount: number | null;
  isInactiveCount: number | null;
};

export async function loader() {
  const categories = await prisma.category.findMany();
  const totalProductsInCategory = await prisma.product.groupBy({
    by: ["categoryId"],
    _count: {
      id: true,
    },
  });
  const totalProductsPriceInCategory = await prisma.product.groupBy({
    by: ["categoryId"],
    _sum: {
      price: true,
    },
  });
  const totalCategoriesCount = await prisma.category.count();
  const totalProductsCount = await prisma.product.count();
  const isActiveCount = await prisma.category.count({
    where: {
      isActive: true,
    },
  });

  const isInactiveCount = await prisma.category.count({
    where: {
      isActive: false,
    },
  });
  const products = await prisma.product.findMany({
    select: {
      price: true,
      stock: true,
    },
  });

  const totalProductPrice = products.reduce((acc, product) => {
    const stock = product.stock ?? 0;
    const price = product.price ?? 0;
    return acc + price * stock;
  }, 0);

  return {
    categories,
    totalProductsInCategory,
    totalProductsPriceInCategory,
    totalCategoriesCount,
    totalProductsCount,
    totalProductPrice,
    isActiveCount,
    isInactiveCount,
  };
}

export default function DashboardCategories() {
  const {
    categories,
    totalProductsInCategory,
    totalProductsPriceInCategory,
    totalCategoriesCount,
    totalProductsCount,
    totalProductPrice,
    isActiveCount,
    isInactiveCount,
  } = useLoaderData<typeof loader>();
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortColumn, setSortColumn] = useState("name");

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedCategories = [...categories].sort((a, b) => {
    let valueA = a[sortColumn];
    let valueB = b[sortColumn];
    // console.log(valueA);
    // console.log(valueB);

    if (typeof valueA === "string" && typeof valueB === "string") {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }
    // console.log(valueA);
    // console.log(valueB);
    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="p-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalCategoriesCount}</div>
            <CardDescription className="flex gap-2">
              {isActiveCount} Active, {isInactiveCount} Inactive
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalProductsCount}</div>
            <CardDescription>Across all categories</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Inventory Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {formatCurrency(totalProductPrice?.toFixed(2))}
            </div>
            <CardDescription>Combined value of all products</CardDescription>
          </CardContent>
        </Card>
      </div>
      <div className="mt-3.5">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Category Management</CardTitle>
            <CardDescription>
              Manage and organize your product categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => {
                        handleSort("name");
                      }}
                    >
                      Category
                      {sortColumn === "name" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="inline h-4 w-4  ml-1" />
                        ) : (
                          <ChevronDown className="inline h-4 w-4  ml-1" />
                        ))}
                    </TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Total Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedCategories.map((category) => {
                    const productGroup = totalProductsInCategory.find(
                      (group) => group.categoryId === category.id
                    );
                    const totalValueGroup = totalProductsPriceInCategory.find(
                      (group) => group.categoryId === category.id
                    );

                    const productCount = productGroup?._count.id ?? 0;

                    const totalProductPrice = totalValueGroup?._sum.price ?? 0;

                    return (
                      <TableRow key={category.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded bg-muted mr-2 flex items-center justify-center">
                              <Folder className="h-4 w-4 text-muted-foreground" />
                            </div>
                            {category.name}
                          </div>
                        </TableCell>
                        <TableCell>{category.description}</TableCell>
                        <TableCell>{productCount}</TableCell>
                        <TableCell>
                          {formatCurrency(totalProductPrice)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* <div>Categories</div> */}
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = request.formData();
}
