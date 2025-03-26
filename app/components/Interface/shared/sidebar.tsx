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

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const NavContent = (
    <>
      <div className="p-4 flex justify-center">
        <Button
          variant="outline"
          className={`text-sm gap-2 ${
            isOpen ? "w-full justify-center" : "p-2"
          }`}
        >
          <Plus className="w-4 h-4" />
          {isOpen && "Build a Model"}
        </Button>
      </div>

      <nav
        className={`flex flex-col w-[240px] h-8 gap-2 p-2 rounded-md text-sm text-gray-700 ${
          !isOpen ? "items-center" : ""
        }`}
      >
        <div
          className={`
    w-[240px] h-8 px-2 flex justify-between items-center 
    opacity-70 text-xs text-muted-foreground rounded-md
    ${!isOpen && "hidden"}
  `}
        >
          Pages
        </div>
        <Button
          variant="ghost"
          className={`justify-start gap-2 bg-sidebar-accent text-base font-semibold ${
            !isOpen ? "p-2" : ""
          }`}
        >
          <Layers className="w-4 h-4" />
          {isOpen && "Models"}
        </Button>

        <Button
          variant="ghost"
          className={`justify-start gap-2 ${!isOpen ? "p-2" : ""}`}
        >
          <Database className="w-4 h-4" /> {isOpen && "Datasources"}
        </Button>
        <Button
          variant="ghost"
          className={`justify-start gap-2 ${!isOpen ? "p-2" : ""}`}
        >
          <Workflow className="w-4 h-4" />
          {isOpen && "Workflows"}
          {isOpen && (
            <span className="ml-2 p-2 text-xs">
              {isOpen && (
                <span className="bg-sidebar-accent w-[97px] h-[20px] px-[10px] py-[2px] rounded-md text-muted-foreground font-sans font-semibold text-xs leading-4 tracking-normal">
                  Coming soon
                </span>
              )}
            </span>
          )}
        </Button>
        <Button
          variant="ghost"
          className={`justify-start gap-2 ${!isOpen ? "p-2" : ""}`}
        >
          <Settings className="w-4 h-4" /> {isOpen && "Settings"}
        </Button>
      </nav>

      <div
        className={`mt-auto p-4 flex items-center gap-3 ${
          !isOpen ? "justify-center" : ""
        }`}
      >
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        {isOpen && (
          <div className="flex items-start gap-2">
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <p className="text-sm font-medium">John Doe</p>
              </div>
              <p className="text-xs text-base">john.doe@zams.com</p>
            </div>
            <ChevronsUpDown className="ml-6 w-4 h-4 text-base mt-2" />
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex md:flex-col bg-gray-50 border-r transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="h-16 flex items-center justify-between p-4">
          <div className="flex flex-col items-start">
            <img
              src="https://cdn.prod.website-files.com/678a7f2dda7bdd45b1e4d835/678a823b1dac4db544e05b75_logo.svg"
              alt="Zams Logo"
              className={`transition-all duration-200 h-3 ${
                !isOpen ? "mx-auto" : ""
              }`}
            />
            {isOpen && (
              <span className="mt-1 font-semibold text-sm text-gray-600">
                Platform UI
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={`text-base ${!isOpen && "hidden"}`}
            onClick={() => setIsOpen(false)}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          {!isOpen && (
            <Button
              variant="ghost"
              size="icon"
              className="text-base"
              onClick={() => setIsOpen(true)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
        {NavContent}
      </aside>

      {/* Mobile Sidebar (Sheet) */}
      <Sheet>
        <SheetTrigger className="md:hidden absolute top-4 left-4 z-50">
          <VisuallyHidden>Open Menu</VisuallyHidden>
          <Menu className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
          {NavContent}
        </SheetContent>
      </Sheet>
    </>
  );
};
