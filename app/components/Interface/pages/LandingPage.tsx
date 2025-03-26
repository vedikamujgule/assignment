"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Feather, ChevronDown, CirclePlus, ArrowRight } from "lucide-react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const GradientText = ({ children }: { children: ReactNode }) => (
  <span className="bg-gradient-to-r from-[#512A51] via-[#8C417D] to-[#5E49DB] text-transparent bg-clip-text">
    {children}
  </span>
);

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50 px-4">
      <div className="w-full max-w-4xl mx-auto flex-grow flex flex-col justify-center">
        <Card className="p-10 bg-white shadow-lg rounded-2xl">
          <div className="mb-8">
            <span className="text-2xl font-bold flex items-center mb-2">
              <img
                src="https://cdn.prod.website-files.com/678a7f2dda7bdd45b1e4d835/678a823b1dac4db544e05b75_logo.svg"
                alt="Zams Logo"
                className="h-4 mb-4"
              />{" "}
            </span>
            <h2 className="text-5xl font-extrabold leading-tight">
              <GradientText>Hey there</GradientText>,
            </h2>
            <h3 className="text-5xl font-extrabold leading-tight">
              <GradientText> What’d you like to ask today?</GradientText>
            </h3>
          </div>

          <div className="border rounded-xl shadow-sm bg-white">
            <textarea
              rows={4}
              className="w-full p-5 text-lg focus:outline-none resize-none border-none rounded-t-xl"
              placeholder="Ask whatever you want.."
            />

            <div className="flex items-center justify-between text-sm text-base px-4 py-3">
              <div className="flex gap-6 items-center">
                <span className="cursor-pointer flex items-center">
                  <Feather size={16} className="mr-1" />
                  Response Type
                  <ChevronDown size={16} className="ml-1" />
                </span>
                <span className="cursor-pointer flex items-center">
                  <CirclePlus size={16} className="mr-1" />
                  Add Attachment
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span>0/1000</span>
                <Button className="p-2 rounded-full bg-black text-white">
                  <ArrowRight />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              className="bg-black text-white px-4 py-2 text-sm rounded-full"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </Button>
          </div>
        </Card>
      </div>
      <p className="mt-4 text-gray-400 text-xs text-center pb-6">
        Your chats aren’t used to train our models. Obviously AI may make
        mistakes, so please double-check. Your privacy is our priority.
      </p>
    </div>
  );
};

export default LandingPage;
