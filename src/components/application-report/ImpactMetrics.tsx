import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IApplicationFeedback } from "@/lib/types";

interface ImpactMetricsProps {
  impactMetrics: IApplicationFeedback["impact_metrics"];
}

const ImpactMetrics: React.FC<ImpactMetricsProps> = ({ impactMetrics }) => {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Additions Needed</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-decimal pl-4">
            {impactMetrics.additions_needed.map((addition, index) => (
              <li key={index} className="mb-6 last:mb-0">
                <h3 className="mb-2 font-semibold">{addition.achievement}</h3>
                <p className="mb-2">Suggested metrics:</p>
                <ul className="mb-2 list-disc pl-4">
                  {addition.suggested_metrics.map((metric, idx) => (
                    <li key={idx}>{metric}</li>
                  ))}
                </ul>
                <p className="mb-2">Data points to gather:</p>
                <ul className="list-disc pl-4">
                  {addition.data_points_to_gather.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Metrics to Enhance</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-4">
            {impactMetrics.metrics_to_enhance.map((metric, index) => (
              <li key={index} className="mb-6 last:mb-0">
                <p className="mb-2">
                  <span className="font-medium">Current metric:</span> {metric.current_metric}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Enhanced version:</span> {metric.enhanced_version}
                </p>
                <p>
                  <span className="font-medium">Improvement rationale:</span> {metric.improvement_rationale}
                </p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImpactMetrics;
