# Itinerary Customization Plan

## Overview
When `?itinerary=` matches a known destination, the form adapts its visual and copy to feel destination-specific rather than generic.

Supported destinations: `south_africa`, `botswana`, `kenya`, `tanzania`

---

## 1. Background Image

**Treatment:** Full-page background image (behind the form card), with a dark overlay to keep the card legible.

```
page bg → destination photo (fixed, cover)
overlay → rgba(18, 52, 56, 0.72)  // deep green tint
card    → bg-card at ~85% opacity (slight transparency to let bg breathe)
```

**Assets needed (Andy to supply or source):**
| Destination    | Suggested image                  | File name                  |
|----------------|----------------------------------|----------------------------|
| `south_africa` | Cape/Kruger landscape            | `/bg-south_africa.jpg`     |
| `botswana`     | Okavango Delta aerial or elephant| `/bg-botswana.jpg`         |
| `kenya`        | Masai Mara plains/wildebeest     | `/bg-kenya.jpg`            |
| `tanzania`     | Serengeti/Kilimanjaro            | `/bg-tanzania.jpg`         |
| *(default)*    | Generic African landscape        | `/bg-default.jpg`          |

Images go in `public/` — Next.js serves them statically.

---

## 2. Destination Badge (under logo)

A small pill label above the form heading on Step 1:

```
[ SOUTH AFRICA SAFARI ]     // or BOTSWANA · OKAVANGO, etc.
```

Style: Atyp Display 600, 0.65rem, uppercase, wide tracking, accent orange color — signals context immediately.

---

## 3. Step 1 Subtitle (contextual copy)

Replace the generic "Help us plan the perfect trip" with destination-specific copy:

| Destination    | Subtitle                                              |
|----------------|-------------------------------------------------------|
| `south_africa` | "Plan your South Africa safari adventure"             |
| `botswana`     | "Discover Botswana's Okavango Delta"                  |
| `kenya`        | "Experience the Great Migration in Kenya"             |
| `tanzania`     | "Explore Tanzania — Serengeti to Zanzibar"            |
| *(default)*    | "Help us plan the perfect trip"                       |

---

## 4. Confirmation Screen (destination-specific closing)

The success message gets a destination-specific closing line:

| Destination    | Closing line                                                      |
|----------------|-------------------------------------------------------------------|
| `south_africa` | "Your Travel Designer will be in touch to begin crafting your South Africa itinerary." |
| `botswana`     | "Your Travel Designer will be in touch about your Botswana experience." |
| `kenya`        | "Your Travel Designer will start planning your Kenya safari."     |
| `tanzania`     | "Your Travel Designer will reach out about your Tanzania journey."|
| *(default)*    | "Your Travel Designer will be in touch within 1–2 business days." |

---

## 5. Implementation

### New file: `src/lib/destinations.ts`
```ts
export interface DestinationConfig {
  label: string;         // badge text
  subtitle: string;      // step 1 subtitle
  bgImage: string;       // /bg-*.jpg
  confirmClose: string;  // confirmation closing line
}

const destinations: Record<string, DestinationConfig> = {
  south_africa: { ... },
  botswana: { ... },
  kenya: { ... },
  tanzania: { ... },
};

export function getDestination(itinerary: string): DestinationConfig | null {
  return destinations[itinerary.toLowerCase()] ?? null;
}
```

### Updated components
- **`page.tsx`** — resolves `itinerary` → `DestinationConfig`, passes down to `FormWizard`
- **`FormWizard.tsx`** — accepts `destination?: DestinationConfig`, applies bg image + overlay to outer wrapper, passes config to children
- **`StepDates.tsx`** — receives `subtitle` + `destinationLabel`, renders badge + custom subtitle
- **`StepConfirmation.tsx`** — receives `confirmClose`, uses it in closing copy

### No changes needed to
- `StepTravelers`, `StepBudget`, `StepDetails` — destination-neutral
- Webhook payload — `itinerary` param already sends the raw value to Zapier

---

## 6. Fallback behavior
- Unknown or missing `?itinerary=` param → default config (no badge, generic copy, default bg or solid `#123438`)
- Graceful — nothing breaks; it just looks generic

---

## Open questions for Andy
1. **Images** — do you have destination photos, or should I source free-use ones (Unsplash)?
2. **Badge text** — "SOUTH AFRICA SAFARI" or just "SOUTH AFRICA"? Should it include the itinerary name/code?
3. **Any other customizations?** e.g. showing a specific camp/lodge name if the `itinerary` value is more specific (like `botswana_okavango_2026`)
4. **Logo variant** — same itrvl × Wilderness lockup for all, or destination-specific?
