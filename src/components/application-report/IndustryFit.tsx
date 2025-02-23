import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IApplicationFeedback } from "@/lib/types";

interface IndustryFitProps {
  industryAlignment: IApplicationFeedback["industry_alignment"];
}

const IndustryFit: React.FC<IndustryFitProps> = ({ industryAlignment }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Domain Expertise</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="mb-2 font-semibold">Highlighted Areas:</h3>
          <div className="mb-4 flex flex-wrap gap-2">
            {industryAlignment.domain_expertise.highlighted_areas.map((area) => (
              <Badge key={area}>{area}</Badge>
            ))}
          </div>
          <h3 className="mb-2 font-semibold">Areas to Emphasize:</h3>
          <div className="mb-4 flex flex-wrap gap-2">
            {industryAlignment.domain_expertise.areas_to_emphasize.map((area) => (
              <Badge variant="secondary" key={area}>
                {area}
              </Badge>
            ))}
          </div>
          <h3 className="mb-2 font-semibold">Knowledge Gaps:</h3>
          <div className="flex flex-wrap gap-2">
            {industryAlignment.domain_expertise.knowledge_gaps.map((gap) => (
              <Badge variant="destructive" key={gap}>
                {gap}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Company Culture Fit</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="mb-2 font-semibold">Alignment Points:</h3>
          <ul className="mb-4 list-disc pl-4">
            {industryAlignment.company_culture_fit.alignment_points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <h3 className="mb-2 font-semibold">Areas to Highlight:</h3>
          <ul className="list-disc pl-4">
            {industryAlignment.company_culture_fit.areas_to_highlight.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndustryFit;
