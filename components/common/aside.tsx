import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  FileCheck,
  FileText,
  Home,
  LineChart,
  Package,
  Package2,
  ScanText,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { ImSpellCheck } from "react-icons/im";
import { TbFilePencil } from "react-icons/tb";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getURL } from "@/utils/helpers";

// const Aside = () => {
//   return (
//     <aside className="bg-background fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r sm:flex">
//       <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
//         <Link
//           href="#"
//           className="bg-primary text-primary-foreground group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:h-8 md:w-8 md:text-base"
//         >
//           <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
//           <span className="sr-only">RefineMyContent</span>
//         </Link>
//         <TooltipProvider>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <Link
//                 href="/"
//                 className={cn(
//                   "text-muted-foreground hover:text-foreground flex flex-col items-center justify-center rounded-lg transition-colors"
//                 )}
//               >
//                 <ImSpellCheck size={24} />
//                 <span className="text-wrap text-sm">Grammar Checker</span>
//               </Link>
//             </TooltipTrigger>
//             <TooltipContent side="right">Grammar Checker</TooltipContent>
//           </Tooltip>
//         </TooltipProvider>
//         <TooltipProvider>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <Link
//                 href="/paraphraser"
//                 className="bg-accent text-accent-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
//               >
//                 <TbFilePencil size={24} />
//                 <span className="sr-only">Paraphraser</span>
//               </Link>
//             </TooltipTrigger>
//             <TooltipContent side="right">Paraphraser</TooltipContent>
//           </Tooltip>
//         </TooltipProvider>
//         <TooltipProvider>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <Link
//                 href="/summarizer"
//                 className="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
//               >
//                 <FileText className="h-5 w-5" />
//                 <span className="sr-only">Summarizer</span>
//               </Link>
//             </TooltipTrigger>
//             <TooltipContent side="right">Summarizer</TooltipContent>
//           </Tooltip>
//         </TooltipProvider>
//         <TooltipProvider>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <Link
//                 href="/image-to-text"
//                 className="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
//               >
//                 <ScanText className="h-5 w-5" />
//                 <span className="sr-only">Analytics</span>
//               </Link>
//             </TooltipTrigger>
//             <TooltipContent side="right">Image to text</TooltipContent>
//           </Tooltip>
//         </TooltipProvider>
//       </nav>
//       <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
//         <TooltipProvider>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <Link
//                 href="#"
//                 className="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
//               >
//                 <Settings className="h-5 w-5" />
//                 <span className="sr-only">Settings</span>
//               </Link>
//             </TooltipTrigger>
//             <TooltipContent side="right">Settings</TooltipContent>
//           </Tooltip>
//         </TooltipProvider>
//       </nav>
//     </aside>
//   );
// };

const Aside = () => {
  return (
    <aside className="bg-background fixed inset-y-0 left-0 z-10 hidden w-20 flex-col border-r sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <Link
          href="#"
          className="bg-primary text-primary-foreground group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">RefineMyContent</span>
        </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/"
                className="bg-accent text-accent-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
              >
                <ImSpellCheck size={24} />
                {/* <span className="text-wrap text-xs font-bold">
                  Grammar Checker
                </span> */}
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Grammar Checker</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/paraphraser"
                className="bg-accent text-accent-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
              >
                <TbFilePencil size={24} />
                <span className="sr-only">Paraphraser</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Paraphraser</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/summarizer"
                className="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
              >
                <FileText className="h-5 w-5" />
                <span className="sr-only">Summarizer</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Summarizer</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/image-to-text"
                className="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
              >
                <ScanText className="h-5 w-5" />
                <span className="sr-only">Analytics</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Image to text</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
};

export default Aside;
