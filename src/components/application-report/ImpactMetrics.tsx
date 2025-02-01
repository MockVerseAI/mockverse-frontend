import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IApplicationFeedback } from "@/lib/types";

interface ImpactMetricsProps {
  impactMetrics: IApplicationFeedback["impact_metrics"];
}

const ImpactMetrics: React.FC<ImpactMetricsProps> = ({ impactMetrics }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Additions Needed</CardTitle>
        </CardHeader>
        <CardContent>
          {impactMetrics.additions_needed.map((addition, index) => (
            <div key={index} className="mb-6 last:mb-0">
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
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Metrics to Enhance</CardTitle>
        </CardHeader>
        <CardContent>
          {impactMetrics.metrics_to_enhance.map((metric, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <p className="mb-2">Current metric: {metric.current_metric}</p>
              <p className="mb-2">Enhanced version: {metric.enhanced_version}</p>
              <p>Improvement rationale: {metric.improvement_rationale}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ImpactMetrics;
