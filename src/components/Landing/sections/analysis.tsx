import { DownloadIcon, FilterIcon, TrendingUpIcon } from "lucide-react";
import Container from "../global/container";
import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/ui/magic-card";

const Analysis = () => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center py-20">
      <Container>
        <div className="mx-auto mb-16 flex max-w-3xl flex-col items-center text-center">
          <h2 className="font-heading text-2xl font-medium !leading-snug md:text-4xl lg:text-5xl">
            Intelligent marketing <br />
            <span className="font-subheading italic">dashboard</span>
          </h2>
          <p className="mt-4 text-base text-accent-foreground/80 md:text-lg">
            Gain detailed insights into your marketing performance and campaign metrics with our advanced analytics
            tools.
          </p>
        </div>
      </Container>

      <div className="relative grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        <Container delay={0.2}>
          <div className="relative rounded-2xl border border-border/50 bg-background/40">
            <MagicCard
              gradientFrom="#38bdf8"
              gradientTo="#3b82f6"
              gradientColor="rgba(59,130,246,0.1)"
              className="w-full overflow-hidden p-4 lg:p-8"
            >
              <div className="absolute bottom-0 right-0 z-20 h-1/4 w-1/4 bg-blue-500 blur-[8rem]"></div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Campaign Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Track your campaign performance with data-driven insights.
                </p>

                <div className="space-y-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-3xl font-semibold">$12,834</div>
                      <div className="mt-2 flex items-center gap-1 text-sm text-green-500">
                        <TrendingUpIcon className="h-4 w-4" />
                        +25% from last month
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
                    <div className="grid grid-cols-4 py-2 text-sm text-muted-foreground">
                      <div>Campaign</div>
                      <div>Status</div>
                      <div>Reach</div>
                      <div>ROI</div>
                    </div>
                    {[
                      { name: "Sales", status: "Active", reach: "45K", roi: "+32%" },
                      { name: "Emails", status: "Done", reach: "28K", roi: "+18%" },
                      { name: "Ads", status: "Active", reach: "62K", roi: "+45%" },
                    ].map((campaign) => (
                      <div key={campaign.name} className="grid grid-cols-4 border-t border-border/50 py-2 text-sm">
                        <div>{campaign.name}</div>
                        <div>{campaign.status}</div>
                        <div>{campaign.reach}</div>
                        <div className="font-semibold">{campaign.roi}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </MagicCard>
          </div>
        </Container>

        <Container delay={0.2}>
          <div className="relative rounded-2xl border border-border/50 bg-background/40">
            <MagicCard
              gradientFrom="#38bdf8"
              gradientTo="#3b82f6"
              gradientColor="rgba(59,130,246,0.1)"
              className="w-full overflow-hidden p-4 lg:p-8"
            >
              <div className="absolute bottom-0 right-0 z-20 h-1/4 w-1/4 bg-sky-500 blur-[8rem]"></div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Audience Metrics</h3>
                <p className="text-sm text-muted-foreground">
                  Understand your audience behavior and engagement patterns.
                </p>

                <div className="space-y-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-3xl font-semibold">84,392</div>
                      <div className="mt-2 flex items-center gap-1 text-sm text-green-500">
                        <TrendingUpIcon className="h-4 w-4" />
                        +12% engagement rate
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

                  {/* Audience Table */}
                  <div className="space-y-2">
                    <div className="grid grid-cols-4 py-2 text-sm text-muted-foreground">
                      <div>Channel</div>
                      <div>Users</div>
                      <div>Sessions</div>
                      <div>Conv. Rate</div>
                    </div>
                    {[
                      { channel: "Social", users: "32K", sessions: "45K", rate: "3.2%" },
                      { channel: "Email", users: "28K", sessions: "36K", rate: "4.5%" },
                      { channel: "Direct", users: "15K", sessions: "22K", rate: "5.1%" },
                    ].map((metric) => (
                      <div key={metric.channel} className="grid grid-cols-4 border-t border-border/50 py-2 text-sm">
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
