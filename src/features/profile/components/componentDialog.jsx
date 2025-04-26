import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const ComponentDialog = ({
  trigger,
  title,
  description,
  content,
  btnClick,
  btnVariant,
  isLoading,
  btnLabel,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild className="w-fit">
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-sm:w-5/6 w-[400px] gap-7">
        <DialogHeader>
          <DialogTitle className="text-left text-colorPrimary">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-colorText text-left">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {content && <main className="flex flex-col gap-4">{content}</main>}

        {/* FOOTER */}
        <section className="flex flex-col justify-end gap-2">
          <Button onClick={btnClick} size={"sm"} variant={btnVariant}>
            {isLoading ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              `${btnLabel}`
            )}
          </Button>

          <DialogClose asChild>
            <Button
              type="button"
              className="w-full"
              size={"sm"}
              variant="ghost"
            >
              Cancelar
            </Button>
          </DialogClose>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default ComponentDialog;
