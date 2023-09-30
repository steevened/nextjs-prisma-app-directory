"use client";

import * as z from "zod";
import { useStoreModal } from "@/hooks/useStore.modal.hook";
import { Modal } from "../ui/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(3).max(255),
});

export const StoreModal = () => {
  const { isOpen, onClose } = useStoreModal();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await fetch("/api/stores", {
        method: "POST",
        body: JSON.stringify(values),
      });
      console.log(response);
      if (response.ok) {
        toast.success("Store created");
        onClose();
      } else {
        toast.error("Error creating store");
      }
    } catch (error) {
      toast.error(error as string);
      throw new Error(error as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-4 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel id="name">Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Add a name"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end w-full gap-2 pt-4">
              <Button disabled={loading} variant={"outline"} onClick={onClose}>
                Cancel
              </Button>
              <Button disabled={loading} type="submit">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
