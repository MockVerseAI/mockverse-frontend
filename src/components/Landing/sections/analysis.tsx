import { DownloadIcon, FilterIcon, TrendingUpIcon } from "lucide-react";
import Container from "../global/container";
import { Button } from "@/components/ui/button1";
import { MagicCard } from "@/components/ui/magic-card";

const Analysis = () => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center py-20">
      <Container>
        <div className="mx-auto mb-16 flex max-w-3xl flex-col items-center text-center">
          <h2 className="font-heading text-2xl leading-snug! font-medium md:text-4xl lg:text-5xl">
            Comprehensive Interview <br />
            <span className="font-subheading italic">Analytics</span>
          </h2>
          <p className="text-accent-foreground/80 mt-4 text-base md:text-lg">
            Track your interview performance and progress with detailed analytics. Get insights into your strengths and
            areas for improvement.
          </p>
        </div>
      </Container>

      <div className="relative grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        <Container delay={0.2}>
          <div className="border-border/50 bg-background/40 relative rounded-2xl border">
            <MagicCard
              gradientFrom="#38bdf8"
              gradientTo="#3b82f6"
              gradientColor="rgba(59,130,246,0.1)"
              className="w-full overflow-hidden p-4 lg:p-8"
            >
              <div className="absolute right-0 bottom-0 z-20 h-1/4 w-1/4 bg-blue-500 blur-[8rem]"></div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Performance Metrics</h3>
                <p className="text-muted-foreground text-sm">
                  Track your interview performance across different skills and categories.
                </p>

                <div className="space-y-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-3xl font-semibold">85%</div>
                      <div className="mt-2 flex items-center gap-1 text-sm text-green-500">
                        <TrendingUpIcon className="h-4 w-4" />
                        +15% improvement
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost">
                        <FilterIcon className="h-5 w-5" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <DownloadIcon className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-muted-foreground grid grid-cols-4 py-2 text-sm">
                      <div>Skill</div>
                      <div>Level</div>
                      <div>Sessions</div>
                      <div>Progress</div>
                    </div>
                    {[
                      { name: "Communication", status: "Advanced", reach: "12", roi: "+22%" },
                      { name: "Technical", status: "Intermediate", reach: "8", roi: "+15%" },
                      { name: "Behavioral", status: "Expert", reach: "15", roi: "+30%" },
                    ].map((metric) => (
                      <div key={metric.name} className="border-border/50 grid grid-cols-4 border-t py-2 text-sm">
                        <div>{metric.name}</div>
                        <div>{metric.status}</div>
                        <div>{metric.reach}</div>
                        <div className="font-semibold">{metric.roi}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </MagicCard>
          </div>
        </Container>

        <Container delay={0.2}>
          <div className="border-border/50 bg-background/40 relative rounded-2xl border">
            <MagicCard
              gradientFrom="#38bdf8"
              gradientTo="#3b82f6"
              gradientColor="rgba(59,130,246,0.1)"
              className="w-full overflow-hidden p-4 lg:p-8"
            >
              <div className="absolute right-0 bottom-0 z-20 h-1/4 w-1/4 bg-sky-500 blur-[8rem]"></div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Interview History</h3>
                <p className="text-muted-foreground text-sm">
                  Review your past interview sessions and performance trends.
                </p>

                <div className="space-y-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-3xl font-semibold">35</div>
                      <div className="mt-2 flex items-center gap-1 text-sm text-green-500">
                        <TrendingUpIcon className="h-4 w-4" />
                        +8 this month
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost">
                        <FilterIcon className="h-5 w-5" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <DownloadIcon className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-muted-foreground grid grid-cols-4 py-2 text-sm">
                      <div>Type</div>
                      <div>Duration</div>
                      <div>Questions</div>
                      <div>Score</div>
                    </div>
                    {[
                      { channel: "Technical", users: "45m", sessions: "15", rate: "92%" },
                      { channel: "Behavioral", users: "30m", sessions: "10", rate: "88%" },
                      { channel: "System Design", users: "60m", sessions: "8", rate: "85%" },
                    ].map((metric) => (
                      <div key={metric.channel} className="border-border/50 grid grid-cols-4 border-t py-2 text-sm">
                        <div>{metric.channel}</div>
                        <div>{metric.users}</div>
                        <div>{metric.sessions}</div>
                        <div className="font-semibold">{metric.rate}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </MagicCard>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Analysis;
