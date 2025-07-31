# Live Preview Disabled

The live preview functionality has been temporarily disabled to focus on wizard development and functionality.

## How to Re-enable Live Preview

To re-enable the live preview, you need to change **two** variables from `false` to `true`:

### 1. In `wizard.js` (line ~235)
```javascript
const PREVIEW_ENABLED = false; // Change to true
```

### 2. In `preview.js` (line ~5)
```javascript
const PREVIEW_ENABLED = false; // Change to true
```

## What This Does

When re-enabled, the live preview will:
- Show from step 2 onwards (business type selection)
- Update in real-time as users make selections
- Display industry-specific website previews
- Show design styles, colors, and content changes

## Current State

- ✅ Preview panel is completely hidden
- ✅ Preview update calls are skipped (no unnecessary processing)
- ✅ All preview functionality is preserved
- ✅ Easy to re-enable with simple flag changes
- ✅ Responsive design maintained (preview hidden on all screen sizes)

## Files Modified

- `wizard.js` - Added `PREVIEW_ENABLED` flag and conditional logic
- `preview.js` - Added `PREVIEW_ENABLED` flag and early return
- `consult.html` - Updated title to show "(Disabled)"
- `styles.css` - Added CSS rules to ensure complete hiding

## Benefits of This Approach

1. **No Code Loss**: All preview functionality is preserved
2. **Easy Re-enable**: Just change two boolean flags
3. **Performance**: No unnecessary preview processing
4. **Clean UI**: Preview panel is completely hidden
5. **Development Focus**: Can focus on wizard functionality without preview distractions 