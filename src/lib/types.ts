export interface User {
  _id: string;
  avatar: string;
  username: string;
  email: string;
  loginType: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Resume {
  _id: string;
  fileName: string;
  content: string;
  url: string;
  hash: string;
  parsedContent: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IMessage {
  content: string;
  role: "user" | "assistant";
}

export interface IInterview {
  _id: string;
  jobRole: string;
  jobDescription: string;
  resumeId: string;
  userId: string;
  isCompleted: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface IApplication {
  _id: string;
  companyName: string;
  jobRole: string;
  jobDescription: string;
  resumeId: string;
  userId: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface IApplicationFeedback {
  core_alignment_analysis: {
    role_fit_score: number;
    key_matches: string[];
    critical_gaps: string[];
  };
  keyword_optimization: {
    missing_critical_terms: {
      keyword: string;
      importance_level: "Critical" | "High" | "Medium";
      context_in_job: string;
      suggested_addition: string;
      placement_location: string;
    }[];
    terms_to_strengthen: {
      existing_term: string;
      current_usage: string;
      improved_phrasing: string;
      rationale: string;
    }[];
  };
  experience_enhancement: {
    achievements_optimization: {
      current_bullet: string;
      enhanced_version: string;
      improvements_made: string[];
      alignment_with_role: string;
    }[];
    missing_experiences: {
      required_experience: string;
      relevant_existing_experience: string;
      reframing_suggestion: string;
    }[];
  };
  skills_optimization: {
    technical_skills: {
      priority_additions: string[];
      skills_to_emphasize: string[];
      skills_to_reframe: {
        current: string;
        suggested: string;
        strategic_reason: string;
      }[];
    };
    soft_skills: {
      missing_critical: string[];
      enhancement_suggestions: {
        skill: string;
        demonstration_suggestion: string;
      }[];
    };
  };
  impact_metrics: {
    additions_needed: {
      achievement: string;
      suggested_metrics: string[];
      data_points_to_gather: string[];
    }[];
    metrics_to_enhance: {
      current_metric: string;
      enhanced_version: string;
      improvement_rationale: string;
    }[];
  };
  professional_narrative: {
    summary_optimization: {
      current: string;
      enhanced_version: string;
      key_improvements: string[];
    };
    story_strengthening: {
      career_element: string;
      current_presentation: string;
      suggested_narrative: string;
      strategic_value: string;
    }[];
  };
  competitive_advantages: {
    unique_selling_points: string[];
    differentiation_opportunities: {
      area: string;
      current_state: string;
      enhancement_suggestion: string;
      expected_impact: string;
    }[];
  };
  industry_alignment: {
    domain_expertise: {
      highlighted_areas: string[];
      areas_to_emphasize: string[];
      knowledge_gaps: string[];
    };
    company_culture_fit: {
      alignment_points: string[];
      areas_to_highlight: string[];
    };
  };
  action_priorities: {
    immediate_changes: string[];
    high_impact_updates: string[];
    strategic_enhancements: string[];
  };
  applicationId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export type PLAN = {
  id: string;
  title: string;
  desc: string;
  monthlyPrice: number;
  annuallyPrice: number;
  badge?: string;
  buttonText: string;
  features: string[];
  link: string;
};
