"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function Loading() {
  useEffect(() => {
    const loadingToast = toast.loading("Loading ...", {
      position: "bottom-right",
    });

    // Clean up by dismissing the toast when the component unmounts
    return () => {
      toast.dismiss(loadingToast);
    };
  }, []);

  return null;
}
