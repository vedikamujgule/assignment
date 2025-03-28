"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Feather, ChevronDown, CirclePlus, ArrowRight } from "lucide-react";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const GradientText = ({ children }: { children: ReactNode }) => (
  <span className="bg-[linear-gradient(to_right,_#512A51_2%,_#8C417D_12%,_#B7549B_25%,_#5E49DB_90%)] text-transparent bg-clip-text">
    {children}
  </span>
);

const LandingPage = () => {
  const router = useRouter();

  return (
    <div className="pt-10 md:pt-20 lg:pt-28 xl:pt-32 min-h-screen flex flex-col justify-between bg-gray-50 px-4 py-6">
      <div className="w-full max-w-2xl mx-auto flex flex-col justify-center items-start text-left">
        <Image
          src="/logos/logo1.png"
          alt="Zams Logo"
          width={90}
          height={30}
          className="mb-2"
        />

        <h2 className="font-sherpa font-bold text-[30px] leading-[44px] tracking-[-0.25px] align-middle mb-5">
          Hey <GradientText>there</GradientText>,<br />
          What’d you like to <GradientText>ask today?</GradientText>
        </h2>

        <Card className="w-full bg-white shadow-sm rounded-lg overflow-hidden px-3 py-4">
          <textarea
            rows={2}
            maxLength={1000}
            className="w-full text-md focus:outline-none resize-none"
            placeholder="Ask whatever you want.."
          />

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mt-5">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-gray-600 text-md">
              <span className="cursor-pointer flex items-center">
                <Feather size={14} className="mr-1" />
                Response Type
                <ChevronDown size={14} className="ml-1" />
              </span>
              <span className="cursor-pointer flex items-center">
                <CirclePlus size={14} className="mr-1" />
                Add Attachment
              </span>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 text-gray-500">
              <span className="text-xs sm:text-md">0/1000</span>
              <Button className="w-8 h-8 p-0 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800">
                <ArrowRight size={14} />
              </Button>
            </div>
          </div>
        </Card>
        <div className="mt-4 w-full flex justify-end">
          <Button
            className="bg-black text-white px-4 py-1.5 text-md rounded-full transition-all duration-200 hover:bg-gray-800 hover:shadow-md hover:scale-[1.02]"
            onClick={() => router.push("/dashboard")}
          >
            Go to Dashboard
          </Button>
        </div>
      </div>

      <p className="text-gray-400 text-[10px] text-center mt-6 pb-4">
        Your chats aren’t used to train our models. Obviously AI may make
        mistakes, so please double-check. Your privacy is our priority.
      </p>
    </div>
  );
};

export default LandingPage;
