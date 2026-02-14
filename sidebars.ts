import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    // GETTING STARTED - Beginner-friendly entry point
    {
      type: 'doc',
      id: 'intro',
      label: 'What is RoleLogic?',
    },
    {
      type: 'doc',
      id: 'quick-start',
      label: 'Quick Start',
    },

    // CORE CONCEPTS - Foundation knowledge
    {
      type: 'category',
      label: 'Core Concepts',
      collapsed: false,
      items: [
        'concepts/rules',
        'concepts/conditions',
        'concepts/actions',
        'concepts/role-hierarchy',
      ],
    },

    // FEATURES - Using RoleLogic
    {
      type: 'category',
      label: 'Features',
      collapsed: false,
      items: [
        'features/rule-builder',
        'features/testing-sandbox',
        'features/webhooks-logging',
        'features/cross-guild',
        'features/activity-log',
      ],
    },

    // GUIDES - Practical examples
    {
      type: 'category',
      label: 'Guides',
      collapsed: true,
      items: [
        'guides/common-scenarios',
        'guides/best-practices',
      ],
    },

    // REFERENCE - Technical details
    {
      type: 'category',
      label: 'Reference',
      collapsed: true,
      items: [
        'reference/conditions-reference',
        'reference/placeholders-reference',
        'reference/limits-reference',
        'reference/role-link-api',
      ],
    },

    // PLANS & SUPPORT
    {
      type: 'doc',
      id: 'plans',
      label: 'Plans & Pricing',
    },
    {
      type: 'doc',
      id: 'faq',
      label: 'FAQ',
    },
    {
      type: 'doc',
      id: 'glossary',
      label: 'Glossary',
    },
    {
      type: 'doc',
      id: 'support',
      label: 'Support',
    },
  ],
};

export default sidebars;
