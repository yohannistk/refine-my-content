"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ParaphraserMode } from "@/custom";
import { cn } from "@/lib/utils";

const modes = [
  { label: "Standard", value: "standard" },
  { label: "Fluency", value: "fluency" },
  { label: "Academic", value: "academic" },
  { label: "Creative", value: "creative" },
  { label: "Simple", value: "simple" },
  { label: "Shorten", value: "shorten" },
  { label: "Formal", value: "formal" },
];

interface Props {
  mode: ParaphraserMode;
  setMode: React.Dispatch<React.SetStateAction<ParaphraserMode>>;
}

export default function ParaphraserModeChooser({ mode, setMode }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {mode ? modes.find((m) => m.value === mode)?.label : "Select Mode..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <ul>
          {modes.map((mode) => {
            return (
              <li key={mode.value} className="my-2">
                <Button
                  onClick={(e) => {
                    setMode(mode.value as ParaphraserMode);
                    setOpen(false);
                  }}
                  variant={"outline"}
                  className={cn(
                    "flex w-full justify-start border-0 text-sm font-medium"
                  )}
                >
                  {mode.label}
                </Button>
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
