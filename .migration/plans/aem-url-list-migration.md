Let me check the current project state to inform the migration plan.# Kingston Website Migration Plan

## Overview

Migrate 2 pages from kingston.com to AEM Edge Delivery Services, including content structure and design system adaptation.

### Source URLs

1. **Homepage**: https://www.kingston.com/en
2. **Product Page (SSD)**: https://www.kingston.com/en/ssd/dual-portable-solid-state-drive-spsd

## Approach

This migration will use the site migration workflow to:
- Analyze both pages for content structure and block patterns
- Create page templates with URL classification
- Map content sections to EDS blocks (leveraging the 16 blocks already available in the project)
- Extract and adapt the Kingston design system (colors, typography, spacing)
- Generate import infrastructure (parsers + transformers)
- Execute content import and verify output

## Available Project Blocks

The project already includes: accordion, cards, carousel, columns, embed, footer, form, fragment, header, hero, modal, quote, search, table, tabs, video

## Migration Phases

### Phase 1: Site Analysis & Page Templates
- Analyze URL patterns and classify pages into templates
- Create page-templates.json with template skeletons

### Phase 2: Page Analysis
- Analyze each page's DOM structure, sections, and content patterns
- Identify block variants needed per page
- Capture screenshots and cleaned HTML for reference

### Phase 3: Block Mapping
- Map discovered content sections to available EDS blocks
- Create new block variants where existing blocks don't match
- Update page-templates.json with DOM selectors

### Phase 4: Design Migration
- Extract Kingston's design tokens (colors, fonts, spacing, layout)
- Adapt global styles (styles.css) for EDS compatibility
- Generate block-level CSS for each variant

### Phase 5: Import Infrastructure
- Generate block parsers for each variant
- Generate page transformers (cleanup + sections)
- Build and validate the import script

### Phase 6: Content Import & Verification
- Execute the import for both URLs
- Verify rendered output against original pages
- Fix any visual discrepancies

## Checklist

- [ ] Run site analysis to create page templates for both URLs
- [ ] Analyze homepage (kingston.com/en) structure and blocks
- [ ] Analyze product page (kingston.com/en/ssd/dual-portable-solid-state-drive-spsd) structure and blocks
- [ ] Map blocks to page templates with DOM selectors
- [ ] Migrate site design system (colors, typography, spacing)
- [ ] Generate block parsers for all identified variants
- [ ] Generate page transformers (cleanup + sections)
- [ ] Build import script combining templates, parsers, and transformers
- [ ] Execute content import for both pages
- [ ] Verify rendered pages against originals and fix issues
- [ ] Migrate block-level styles for visual fidelity

## Notes

- Execution requires exiting Plan mode
- The homepage will likely have more complex block patterns (hero, navigation, cards, etc.)
- The product page will focus on product-specific content blocks
- Design migration covers both site-level tokens and per-block styling
