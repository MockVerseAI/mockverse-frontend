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

export interface IInterviewWorkspace {
  _id: string;
  companyName: string;
  jobRole: string;
  jobDescription: string;
  userId: string;
  isDeleted: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface IInterview {
  _id: string;
  duration: number;
  difficulty: string;
  interviewWorkspaceId: string;
  interviewTemplateId: IInterviewTemplate;
  resumeId: string;
  userId: string;
  isCompleted: boolean;
  isDeleted: boolean;
  isAgentMode: boolean;
  isVideoEnabled: boolean;
  recordings: {
    voice: {
      combined: string;
      assistant: string;
      user: string;
    };
    video?: string;
  };
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

export interface ISkillAnalysis {
  skill: string;
  level: string;
  evidence?: string;
  priority?: string;
  impact?: string;
  recommendation?: string;
  timeline?: string;
  resources?: string[];
}

export interface IProblemSolving {
  analytical: string;
  design: string;
  scalability: string;
}

export interface ITechnicalCommunication {
  clarity: string;
  depth: string;
}

export interface ILeadershipInitiative {
  example: string;
  impact: string;
  context: string;
}

export interface ILeadership {
  decisionMaking: string;
  teamInfluence: string;
  initiative: ILeadershipInitiative[];
}

export interface IAdaptability {
  changeResponse: string;
  learning: string;
  growth: string;
}

export interface ICollaboration {
  teamwork: string;
  communication: string;
  crossTeam: string[];
}

export interface IResponseStructure {
  clarity: number;
  organization: string;
  improvement: string[];
}

export interface IStarMethod {
  situation: string;
  task: string;
  action: string;
  result: string;
  tips: string[];
}

export interface IRoleRequirement {
  requirement: string;
  met: boolean;
  notes: string;
}

export interface ISkillMatch {
  match: number;
  notes: string;
}

export interface IRoleAlignment {
  requirements: {
    essential: IRoleRequirement[];
    experience: string;
    skills: Record<string, ISkillMatch>;
  };
  potential: {
    growth: string;
    advancement: string;
    development: string[];
  };
  cultural: {
    values: string;
    workStyle: string;
    fit: string[];
  };
}

export interface IPerformanceMetrics {
  scores: {
    overall: number;
    technical: number;
    behavioral: number;
    communication: number;
  };
  benchmarks: {
    industry: string;
    role: string;
    level: string;
  };
}

export interface IDevelopmentAction {
  area: string;
  importance: string;
  action: string;
}

export interface IDevelopmentExercise {
  type: string;
  description: string;
  goal: string;
}

export interface IDevelopmentResource {
  type: string;
  description: string;
  link: string;
}

export interface IDevelopmentGoal {
  timeline: string;
  objective: string;
  success_criteria: string;
}

export interface IDevelopmentSkill {
  skill: string;
  current_level: string;
  target_level: string;
  timeline: string;
}

export interface IPreparationQuestion {
  question: string;
  category: string;
  preparation_tips: string[];
}

export interface IPreparationScenario {
  situation: string;
  expected_response: string;
  evaluation_criteria: string[];
}

export interface IInterviewReport {
  technicalAssessment: {
    skillsAnalysis: {
      demonstrated: ISkillAnalysis[];
      required: ISkillAnalysis[];
      gaps: ISkillAnalysis[];
      growthPath: ISkillAnalysis[];
    };
    problemSolving: IProblemSolving;
    technicalCommunication: ITechnicalCommunication;
  };
  behavioralAnalysis: {
    leadership: ILeadership;
    adaptability: IAdaptability;
    collaboration: ICollaboration;
  };
  responseQuality: {
    structure: IResponseStructure;
    starMethod: IStarMethod;
  };
  roleAlignment: IRoleAlignment;
  performanceMetrics: IPerformanceMetrics;
  developmentPlan: {
    immediate: {
      priorities: IDevelopmentAction[];
      exercises: IDevelopmentExercise[];
      resources: IDevelopmentResource[];
    };
    shortTerm: {
      goals: IDevelopmentGoal[];
      skills: IDevelopmentSkill[];
      actions: string[];
    };
    preparation: {
      questions: IPreparationQuestion[];
      responses: Record<string, any>;
      scenarios: IPreparationScenario[];
    };
  };
  videoAnalysis: {
    analysis?: string;
  };
  _id: string;
  interviewId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IResponseQuality {
  structure: IResponseStructure;
  starMethod: IStarMethod;
}

export interface ITechnicalAssessment {
  skillsAnalysis: {
    demonstrated: ISkillAnalysis[];
    required: ISkillAnalysis[];
    gaps: ISkillAnalysis[];
  };
  problemSolving: IProblemSolving;
  technicalCommunication: ITechnicalCommunication;
}

export interface IBehavioralAnalysis {
  leadership: ILeadership;
  adaptability: IAdaptability;
  collaboration: ICollaboration;
}

export interface IDevelopmentPlan {
  immediate: {
    priorities: IDevelopmentAction[];
    resources: IDevelopmentResource[];
  };
  shortTerm: {
    goals: IDevelopmentGoal[];
    skills: IDevelopmentSkill[];
  };
}

export interface IInterviewTemplate {
  _id: string;
  name: string;
  description: string;
  category: string;
  relevanceScore?: number;
}

export interface IRelevantTemplatesResponse {
  templates: IInterviewTemplate[];
  recommendedDifficulty: string;
  experienceLevel: string;
  jobContext: {
    role: string;
    description: string;
  };
}
