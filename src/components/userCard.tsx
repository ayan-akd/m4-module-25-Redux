import { IUser } from "@/types";
import { Trash2 } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { removeUser } from "@/redux/features/user/userSlice";

interface IProps {
  user: IUser;
}

export default function UserCard({ user }: IProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="p-5 border-white border rounded-md">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <h1>{user.name}</h1>
        </div>
        <div className="flex gap-3 items-center">
          <div>
            <AlertDialog>
              <AlertDialogTrigger>
                <Trash2 className="text-red-500 size-5" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-center">
                    Are you sure you want to delete this user?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center">
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex gap-3 justify-center">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => dispatch(removeUser(user.id))}
                  >
                    Delete
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div>{/* <EditTaskModal task={task} /> */}</div>
        </div>
      </div>
    </div>
  );
}
