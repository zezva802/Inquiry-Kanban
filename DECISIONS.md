# Technical Decisions

## Drag and Drop

Used @dnd-kit because it gives full control over behavior without a rigid API. Added 8px activation constraint on PointerSensor so clicks don't accidentally trigger drags.

## State Management

Chose Zustand over React Context because all operations were on inquiries anyway — combining state and actions in one store means any component can access what it needs without prop drilling.

## Optimistic Updates

Phase changes update Zustand immediately so UI feels instant. PATCH request happens in background. If it fails, state reverts to original phase.

## UX Decisions

- Debounced search (500ms) to avoid filtering on every keystroke
- High value badge (>50k CHF) for quick visual scanning
- URL params for filter persistence so users can share filtered views
- Horizontal scroll on tablet instead of squishing columns

## What I Would Improve

- Skeleton loading instead of plain text
- Unit tests for store actions
- Smoother drop animations with @dnd-kit/sortable
