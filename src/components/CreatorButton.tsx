
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import AnimatedShinyText from "@/components/ui/animated-shiny-text";

export function AnimatedShinyTextDemo() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center justify-center">
      <div
        className={cn(
          "backdrop-blur-xl group flex items-center space-x-2 rounded-full border bg-secondary/15  border-white/5 bg-neutral-900 px-4 py-2 text-base text-white transition-all ease-in-out hover:cursor-pointer hover:bg-neutral-800"
        )}
      >
        <GitHubLogoIcon className="w-5 h-5 text-gray-300" />
        <AnimatedShinyText className="inline-flex items-center transition ease-out text-white/65 hover:duration-300 hover:text-neutral-400">
          <span>created by @1palermo(Aman Deep)</span>
        </AnimatedShinyText>
      </div>
    </div>
  );
}
