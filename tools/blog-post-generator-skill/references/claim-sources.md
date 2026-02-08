# Claim Verification Sources

Verify product/spec claims against repository sources before including them.

## Primary Repo Sources

- `src/components/showcase/ProductDetails.tsx`
  - Product-detail content used on the site.
- `messages/en.json`
  - English localized product and marketing copy.
- `messages/tr.json`
  - Turkish localized product and marketing copy.
- `src/lib/resources.json`
  - Resource metadata and related internal content.

## Verification Rule

For Kermit-specific claims:

1. Find support in at least one repo source above.
2. Use wording that stays consistent with verified content.
3. If not verified, either:
   - remove the claim, or
   - rewrite it as generic, non-quantified advice.

## Examples

- Allowed after verification:
  - Material category fit, product usage context, collection-level positioning.
- Not allowed without verification:
  - Numeric durability claims, guarantee/warranty statements, unsupported compliance claims.
