import React from "react";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
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
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";

export type CategoryData = {
  totalCategories: number | null;
  totalProducts: number | null;
  totalProductPrice: number | null;
  isActiveCount: number | null;
  isInactiveCount: number | null;
};

export async function loader() {
  const totalCategories = await prisma.category.count();
  const totalProducts = await prisma.product.count();
  const totalProductPrice = await prisma.product.aggregate({
    _sum: {
      price: true,
    },
  });
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

  return {
    totalCategories,
    totalProducts,
    totalProductPrice: totalProductPrice._sum.price || 0,
    isActiveCount,
    isInactiveCount,
  };
}

export default function DashboardCategories() {
  const {
    totalCategories,
    totalProducts,
    totalProductPrice,
    isActiveCount,
    isInactiveCount,
  } = useLoaderData() as CategoryData;
  return (
    <div className="p-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalCategories}</div>
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
            <div className="text-3xl font-bold">{totalProducts}</div>
            <CardDescription>Across all categories</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Inventory Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {totalProductPrice?.toFixed(2)}
            </div>
            <CardDescription>Combined value of all products</CardDescription>
          </CardContent>
        </Card>
      </div>
      {/* <div>Categories</div> */}
    </div>
  );
}
