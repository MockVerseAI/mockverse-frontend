import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Headphones, Volume2 } from "lucide-react";

const ConsentCard = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Ready to Begin Your Interview?</CardTitle>
          <CardDescription className="pt-2 text-center">
            Let's make sure you're prepared for the best experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <h3 className="flex items-center gap-2 font-medium">
              <Headphones className="h-5 w-5" />
              Before we start:
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>• Find a quiet place without distractions</li>
              <li>• Ensure your device's sound is turned on</li>
              <li>• You'll hear the interviewer's questions spoken out loud</li>
              <li>• Take your time to think and respond</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button size="lg" onClick={onStart} className="gap-2">
            <Volume2 className="h-5 w-5" />
            Start Interview
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ConsentCard;
