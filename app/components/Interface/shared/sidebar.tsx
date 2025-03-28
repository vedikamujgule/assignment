"use client";

import {
  Menu,
  ChevronLeft,
  ChevronRight,
  Plus,
  Layers,
  Database,
  Workflow,
  Settings,
  ChevronsUpDown,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import * as Tooltip from "@radix-ui/react-tooltip";

const navItems = [
  { icon: Layers, label: "Models", highlight: true, selected: true },
  { icon: Database, label: "Datasources" },
  { icon: Workflow, label: "Workflows", comingSoon: true },
  { icon: Settings, label: "Settings" },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const renderLogo = () => (
    <div
      onClick={() => router.push("/")}
      className="flex flex-rowitems-start px-4 pt-4 cursor-pointer"
    >
      <Image
        src="/logos/logo.png"
        alt="Zams Logo"
        width={30}
        height={30}
        className="mb-2"
      />
      <div className="flex flex-col items-start leading-tight pl-2">
        <span className="text-xs font-semibold">Zams</span>
        <span className="text-xs">Platform UI</span>
      </div>
    </div>
  );

  const NavContent = (collapsed: boolean) => (
    <Tooltip.Provider delayDuration={100}>
      <>
        <div className="p-4 flex justify-center">
          <Button
            variant="outline"
            className={`gap-2 text-md ${
              collapsed
                ? "p-2 w-10 justify-center cursor-pointer"
                : "w-full justify-center cursor-pointer"
            }`}
          >
            <Plus className="w-4 h-4" />
            {!collapsed && "Build a Model"}
          </Button>
        </div>

        <nav
          className={`flex flex-col gap-2 p-2 text-md text-gray-700 ${
            collapsed ? "items-center" : ""
          }`}
        >
          {!collapsed && (
            <div className="px-2 text-sm text-muted-foreground opacity-70">
              Pages
            </div>
          )}

          {navItems.map(
            ({ icon: Icon, label, highlight, comingSoon, selected }) => (
              <Tooltip.Root key={label}>
                <Tooltip.Trigger asChild>
                  <Button
                    variant="ghost"
                    className={`gap-2 text-md w-full justify-start rounded-md ${
                      collapsed ? "p-2 w-10 justify-center" : "px-3 py-2"
                    } ${highlight ? "font-semibold" : ""} ${
                      selected ? "bg-gray-100 text-black" : ""
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {!collapsed && (
                      <>
                        {label}
                        {comingSoon && (
                          <span className="ml-2 text-xs bg-sidebar-accent px-2 py-0.5 rounded text-muted-foreground">
                            Coming soon
                          </span>
                        )}
                      </>
                    )}
                  </Button>
                </Tooltip.Trigger>
                {collapsed && (
                  <Tooltip.Portal>
                    <Tooltip.Content
                      side="right"
                      sideOffset={8}
                      className="bg-black text-white px-2 py-1 text-xs rounded shadow"
                    >
                      {label}
                    </Tooltip.Content>
                  </Tooltip.Portal>
                )}
              </Tooltip.Root>
            )
          )}
        </nav>

        <div
          className={`mt-auto p-4 flex items-center justify-between ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex flex-col">
                <p className="text-sm font-semibold">John Doe</p>
                <p className="text-xs text-muted-foreground">
                  john.doe@zams.com
                </p>
              </div>
            )}
          </div>

          {!collapsed && (
            <ChevronsUpDown className="w-4 h-4 text-gray-500 ml-auto" />
          )}
        </div>
      </>
    </Tooltip.Provider>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-gray-50 border-r min-h-screen transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="h-16 flex items-center justify-between p-4">
          <div
            onClick={() => router.push("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Image
              src="/logos/logo.png"
              alt="Zams Logo"
              width={32}
              height={32}
            />
            {isOpen && (
              <div className="flex flex-col items-start leading-tight">
                <span className="text-xs font-semibold">Zams</span>
                <span className="text-xs">Platform UI</span>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-base"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>
        </div>

        {NavContent(!isOpen)}
      </aside>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger className="md:hidden absolute top-4 left-4 z-50">
          <VisuallyHidden>Open Menu</VisuallyHidden>
          <Menu className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          {renderLogo()}
          {NavContent(false)}
        </SheetContent>
      </Sheet>
    </>
  );
};
