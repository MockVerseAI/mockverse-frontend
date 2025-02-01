import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IApplicationFeedback } from "@/lib/types";

interface ProfessionalNarrativeProps {
  professionalNarrative: IApplicationFeedback["professional_narrative"];
  competitiveAdvantages: IApplicationFeedback["competitive_advantages"];
}

const ProfessionalNarrative: React.FC<ProfessionalNarrativeProps> = ({
  professionalNarrative,
  competitiveAdvantages,
}) => {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Professional Narrative</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="mb-2 font-semibold">Summary Optimization:</h3>
          <p className="mb-2">
            <strong>Current:</strong> {professionalNarrative.summary_optimization.current}
          </p>
          <p className="mb-2">
            <strong>Enhanced version:</strong> {professionalNarrative.summary_optimization.enhanced_version}
          </p>
          <p>
            <strong>Key improvements:</strong>
          </p>
          <ul className="mb-4 list-disc pl-4">
            {professionalNarrative.summary_optimization.key_improvements.map((improvement) => (
              <li key={improvement}>{improvement}</li>
            ))}
          </ul>

          <h3 className="mb-2 font-semibold">Story Strengthening:</h3>
          {professionalNarrative.story_strengthening.map((story, index) => (
            <div key={index} className="mb-4">
              <p className="mb-2">
                <strong>Career element:</strong> {story.career_element}
              </p>
              <p className="mb-2">
                <strong>Current presentation:</strong> {story.current_presentation}
              </p>
              <p className="mb-2">
                <strong>Suggested narrative:</strong> {story.suggested_narrative}
              </p>
              <p>
                <strong>Strategic value:</strong> {story.strategic_value}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Competitive Advantages</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="mb-2 font-semibold">Unique Selling Points:</h3>
          <ul className="mb-4 list-disc pl-4">
            {competitiveAdvantages.unique_selling_points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>

          <h3 className="mb-2 font-semibold">Differentiation Opportunities:</h3>
          {competitiveAdvantages.differentiation_opportunities.map((opportunity, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <p className="mb-2">
                <strong>Area:</strong> {opportunity.area}
              </p>
              <p className="mb-2">
                <strong>Current state:</strong> {opportunity.current_state}
              </p>
              <p className="mb-2">
                <strong>Enhancement suggestion:</strong> {opportunity.enhancement_suggestion}
              </p>
              <p>
                <strong>Expected impact:</strong> {opportunity.expected_impact}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfessionalNarrative;
