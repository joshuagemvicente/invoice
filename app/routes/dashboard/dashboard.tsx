import { Form, redirect, type LoaderFunctionArgs } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "~/components/ui/dialog";
import { getSession } from "~/sessions.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request);
  const userId = session.get("userId");

  if (!userId) {
    return redirect("/login");
  }

  return { userId };
}

export default function Dashboard() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div>Dashboard</div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Logout</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              Are you sure you want to logout? You will need to sign in again.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
            <Form method="post" action="/logout">
              <Button type="submit" variant="destructive">
                Logout
              </Button>
            </Form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
