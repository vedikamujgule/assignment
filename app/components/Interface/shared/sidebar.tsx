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
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import * as Tooltip from "@radix-ui/react-tooltip";

const navItems = [
  { icon: Layers, label: "Models", highlight: true },
  { icon: Database, label: "Datasources" },
  { icon: Workflow, label: "Workflows", comingSoon: true },
  { icon: Settings, label: "Settings" },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const renderLogo = () => (
    <div className="flex flex-col items-start px-4 pt-4">
      <img
        src="https://cdn.prod.website-files.com/678a7f2dda7bdd45b1e4d835/678a823b1dac4db544e05b75_logo.svg"
        alt="Zams Logo"
        className="h-4"
      />
      <span className="mt-1 text-sm font-semibold text-gray-600">
        Platform UI
      </span>
    </div>
  );

  const NavContent = (collapsed: boolean) => (
    <Tooltip.Provider delayDuration={100}>
      <>
        {/* CTA Button */}
        <div className="p-4 flex justify-center">
          <Button
            variant="outline"
            className={`gap-2 text-md ${
              collapsed ? "p-2 w-10 justify-center" : "w-full justify-center"
            }`}
          >
            <Plus className="w-4 h-4" />
            {!collapsed && "Build a Model"}
          </Button>
        </div>

        {/* Navigation */}
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

          {navItems.map(({ icon: Icon, label, highlight, comingSoon }) => (
            <Tooltip.Root key={label}>
              <Tooltip.Trigger asChild>
                <Button
                  variant="ghost"
                  className={`gap-2 text-md w-full justify-start ${
                    collapsed ? "p-2 w-10 justify-center" : ""
                  } ${highlight ? "font-semibold" : ""}`}
                >
                  <Icon className="w-5 h-5" />
                  {!collapsed && (
                    <>
                      {label}
                      {comingSoon && (
                        <span className="ml-2 text-muted-foreground bg-sidebar-accent px-2 py-0.5 text-xs rounded">
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
          ))}
        </nav>

        {/* Footer */}
        <div
          className={`mt-auto p-4 flex items-center gap-3 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex flex-col">
              <p className="text-md font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john.doe@zams.com</p>
            </div>
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
        {/* Header */}
        {/* Header */}
        <div className="h-16 flex items-center justify-between p-4">
          <div className="flex flex-col items-start leading-tight">
            <div className="flex items-center gap-1">
              <img
                src="https://cdn.prod.website-files.com/678a7f2dda7bdd45b1e4d835/678a823b1dac4db544e05b75_logo.svg"
                alt="Zams Logo"
                className="h-4"
              />
            </div>
            {isOpen && (
              <span className="text-xs text-gray-600 font-medium">
                Platform UI
              </span>
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
