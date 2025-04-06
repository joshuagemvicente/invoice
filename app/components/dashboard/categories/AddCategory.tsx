import { useState } from "react";
import { Form } from "react-router";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "~/components/ui/dialog";

export function AddCategory() {
  return (
    <Form method="post">
      <div className="space-y-1">
        <Label htmlFor="name"></Label>
      </div>
    </Form>
  );
}
