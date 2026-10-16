export interface ComparisonSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface ComparisonPage {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  headline: string;
  introduction: string;
  sections: ComparisonSection[];
  takeaway: string;
}

export const comparisons: ComparisonPage[] = [
  {
    slug: "flexirule-vs-server-scripts",
    eyebrow: "Approaches to automation",
    title: "FlexiRule vs Server Scripts",
    description:
      "Understand when visual, declarative business automation with FlexiRule can complement server scripts in Frappe and ERPNext.",
    headline: "FlexiRule vs Server Scripts",
    introduction:
      "Server scripts are useful for focused server-side logic. FlexiRule offers a different approach when a process benefits from a visible execution path, reusable steps, and a place to inspect how the workflow is connected.",
    sections: [
      {
        heading: "Different tools for different jobs",
        paragraphs: [
          "Server-side scripts provide direct control and are well suited to compact pieces of logic. As requirements grow, teams may need to understand how many scripts, hooks, controllers, and conditions work together.",
          "FlexiRule models supported business logic as a visual execution graph. The intention is not to remove the need for code, but to make workflow structure easier to review and maintain where a declarative model is a good fit.",
        ],
      },
      {
        heading: "Where FlexiRule can help",
        paragraphs: [
          "A central, visual model is useful when a process has branching, shared logic, data operations, or a need for execution tracing. Teams can review the path of a rule without first reconstructing every step from separate code locations.",
        ],
        bullets: [
          "Show the intended execution path and its branches.",
          "Reuse Processes across multiple rules instead of duplicating the same business routine.",
          "Inspect execution traces when investigating a rule's outcome.",
          "Keep custom Python available for work that genuinely requires it.",
        ],
      },
      {
        heading: "When a server script is still the right choice",
        paragraphs: [
          "A small, framework-specific operation may be clearest as ordinary server-side code. Choose based on the complexity of the process, operational requirements, permissions, and the skills of the team maintaining it.",
        ],
      },
    ],
    takeaway:
      "Use the simplest mechanism that keeps the business behavior clear. FlexiRule is especially worth evaluating when logic benefits from explicit orchestration, reuse, and visual observability.",
  },
  {
    slug: "flexirule-vs-custom-hooks",
    eyebrow: "Architecture and maintainability",
    title: "FlexiRule vs Custom Hooks",
    description:
      "Compare direct Frappe hooks with a visual rule orchestration layer, including trade-offs for maintainability, reuse, and debugging.",
    headline: "FlexiRule vs Custom Hooks",
    introduction:
      "Frappe hooks are a core extension mechanism and remain essential for many application-level integrations. FlexiRule complements that mechanism by providing a visual way to model supported business workflows and their execution paths.",
    sections: [
      {
        heading: "Hooks are the extension point; workflows are the behavior",
        paragraphs: [
          "Hooks let applications connect code to framework events and extension points. They are powerful and often the correct choice for integration, framework customization, and behavior that must remain close to application code.",
          "FlexiRule focuses on the orchestration of business logic inside a rule model. It can reduce the need to scatter every decision across hand-written routines when a visual representation is more useful to the people who build and maintain the process.",
        ],
      },
      {
        heading: "Make complex business paths easier to inspect",
        paragraphs: [
          "As business rules gain conditions, branching, reusable operations, and error paths, a visual graph can give developers and reviewers a shared view of what the process is intended to do.",
        ],
        bullets: [
          "Review the rule graph and connected actions in one place.",
          "Share reusable Processes across multiple workflows.",
          "Use execution tracing to investigate the path taken by a rule.",
          "Keep native hooks for lifecycle integration and other framework-level responsibilities.",
        ],
      },
      {
        heading: "Choose based on the boundary",
        paragraphs: [
          "Do not move every hook into a rule engine. Framework plumbing, low-level integrations, and performance-sensitive code may be better implemented directly. Consider FlexiRule where the business behavior benefits from declarative composition and centralized visibility.",
        ],
      },
    ],
    takeaway:
      "Custom hooks and FlexiRule solve related but different problems. Keep hooks where they fit naturally, and use visual orchestration where it improves clarity, reuse, and observability.",
  },
];
