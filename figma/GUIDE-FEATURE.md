# Interactive Guide / Tutorial System

A click-through tutorial system for first-time users that shows contextual tooltips pointing to important page elements.

**Note**: This feature is automatically excluded from the mobile build to optimize file size and user experience.

## Features

- ✅ **Smart Positioning**: Automatically positions tooltips (top, bottom, left, right) based on available viewport space
- ✅ **Pointed Arrows**: Visual arrows point directly to target elements
- ✅ **High Z-Index**: Appears above iframes and other content (z-index: 9999)
- ✅ **Consistent Styling**: Matches the Sanskrit glossary modal design (blue-dark background, white text)
- ✅ **LocalStorage Persistence**: Remembers if user has seen the tutorial
- ✅ **Configurable Steps**: Easy-to-edit array of guide steps
- ✅ **User Controls**: Skip button and step-through navigation
- ✅ **Accessibility**: Keyboard support (Escape to close), ARIA attributes
- ✅ **Mobile Responsive**: Adapts to smaller screens
- ✅ **Visual Feedback**: Highlights target elements with pulsing animation
- ✅ **Auto-Scroll**: Brings target elements into view automatically

## Quick Start

### 1. Enable the Guide

Add this element to any page where you want the guide to appear:

```html
<div class="ylms-guide"></div>
```

### 2. Configure Guide Steps

Edit the `guideSteps` array in `module-components.js`:

```javascript
var guideSteps = [
    {
        selector: '#modules-link',
        message: 'Click this to view the full course module and lessons overview',
        position: 'auto' // auto, top, bottom, left, right
    },
    {
        selector: '.ylms-pb_circle',
        message: 'Track your progress through each module with this visual indicator',
        position: 'auto'
    },
    {
        selector: '.ylms-sg_header-btn',
        message: 'Access the Sanskrit Glossary anytime to learn yoga terminology',
        position: 'auto'
    }
    // Add more steps as needed
];
```

### 3. Customize Settings

Adjust these constants in `module-components.js`:

```javascript
var GUIDE_STORAGE_KEY = 'ylms-guide-completed';  // LocalStorage key
var GUIDE_DELAY_MS = 20000;                       // 20 seconds delay
var GUIDE_DISABLE_ON_MOBILE = true;               // Disable on mobile devices
```

**Note**: The guide code is automatically stripped from `module-components.mobile.min.js` during the build process, so it won't add any overhead to mobile deployments.

### 4. Build Process

The compress script creates separate desktop and mobile builds:

```bash
node compress.mjs
```

This generates:
- `module-components.desktop.min.js` - Full version with guide feature
- `module-components.mobile.min.js` - Optimized version without guide code
- `module-components.desktop.min.css` - Full CSS with guide styles
- `module-components.mobile.min.css` - Optimized CSS without guide styles

The guide code is wrapped in `[DESKTOP-ONLY-START]` and `[DESKTOP-ONLY-END]` markers and automatically removed from mobile builds.

## Configuration Options

### Step Object Properties

| Property | Type | Description |
|----------|------|-------------|
| `selector` | string | CSS selector for the target element (e.g., `#modules-link`, `.button-class`) |
| `message` | string | The tooltip message to display |
| `position` | string | Preferred position: `'auto'`, `'top'`, `'bottom'`, `'left'`, or `'right'` |

### Position Behavior

- **`auto`** (recommended): Automatically chooses the best position based on available space
- **`top`**: Forces tooltip above the element
- **`bottom`**: Forces tooltip below the element
- **`left`**: Forces tooltip to the left of the element
- **`right`**: Forces tooltip to the right of the element

## How It Works

1. **Detection**: Checks for `<div class="ylms-guide"></div>` on page load
2. **Storage Check**: Verifies if user has seen the guide via localStorage
3. **Delay**: Waits 20 seconds (configurable) before showing
4. **Step Display**: Shows tooltips one at a time with navigation
5. **Completion**: Marks as seen in localStorage when finished or skipped

## User Experience

### First-Time Users
- Page loads normally
- After 20 seconds, the first tooltip appears
- Semi-transparent overlay dims the page
- Target element is highlighted with a pulsing animation
- User can click "Next >" to proceed or "Skip tutorial" to dismiss

### Returning Users
- Guide does not appear (localStorage check)
- No interruption to their workflow

## Testing

### Reset the Guide

To test the guide again after completing it:

**Option 1: Browser Console**
```javascript
localStorage.removeItem('ylms-guide-completed');
```

**Option 2: JavaScript Function**
```javascript
function resetGuide() {
    localStorage.removeItem('ylms-guide-completed');
    location.reload();
}
```

**Option 3: Reduce Delay (for development)**
```javascript
var GUIDE_DELAY_MS = 2000; // 2 seconds instead of 20
```

## Styling

The guide uses these CSS classes (defined in `module-components.scss`):

- `.ylms-guide_overlay` - Semi-transparent backdrop
- `.ylms-guide_tooltip` - Main tooltip container
- `.ylms-guide_arrow` - Pointed arrow (with position modifiers)
- `.ylms-guide_content` - Tooltip content wrapper
- `.ylms-guide_message` - Message text
- `.ylms-guide_actions` - Button container
- `.ylms-guide_btn` - Button styles
- `.ylms-guide_progress` - Step indicator
- `.ylms-guide_highlight` - Target element highlight

### Color Scheme

Matches the Sanskrit glossary modal:
- Background: `$blue-dark` (#023f94)
- Text: White with slight transparency
- Buttons: White background with blue-dark text
- Overlay: Black with 40% opacity

## Advanced Usage

### Conditional Steps

Skip steps if elements don't exist:

```javascript
var guideSteps = [
    {
        selector: '#optional-element',
        message: 'This step will be skipped if element is not found',
        position: 'auto'
    }
];
```

The guide automatically skips to the next step if a selector doesn't match any element.

### Custom Delay Per Page

```javascript
// Short delay for simple pages
var GUIDE_DELAY_MS = 5000;

// Longer delay for complex pages with animations
var GUIDE_DELAY_MS = 30000;
```

### Multiple Guides

Use different storage keys for different sections:

```javascript
// Module 1 guide
var GUIDE_STORAGE_KEY = 'ylms-guide-module1-completed';

// Module 2 guide
var GUIDE_STORAGE_KEY = 'ylms-guide-module2-completed';
```

## Browser Compatibility

- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ Graceful degradation if localStorage is unavailable

## Accessibility

- ARIA attributes: `role="dialog"`, `aria-live="polite"`
- Keyboard navigation: Escape key to close
- Focus management: Focuses on close button when opened
- Screen reader friendly: Proper labeling and announcements

## Performance

- Minimal impact: Only initializes if `.ylms-guide` element exists
- Lazy execution: Waits for delay before any processing
- Efficient positioning: Uses `requestAnimationFrame` for smooth rendering
- No external dependencies: Pure vanilla JavaScript

## Troubleshooting

### Guide doesn't appear
1. Check if `<div class="ylms-guide"></div>` exists on the page
2. Verify localStorage is not blocking the guide
3. Check browser console for errors
4. Ensure CSS and JS files are loaded

### Tooltip positioning is off
1. Try using `position: 'auto'` instead of fixed positions
2. Check if target element is visible and has dimensions
3. Verify no CSS transforms are affecting positioning

### Guide appears every time
1. Check if localStorage is enabled in the browser
2. Verify the storage key is consistent
3. Check if localStorage is being cleared by other scripts

## Examples

### Simple 3-Step Guide

```javascript
var guideSteps = [
    {
        selector: '#start-button',
        message: 'Click here to begin your journey',
        position: 'auto'
    },
    {
        selector: '.progress-indicator',
        message: 'Track your progress here',
        position: 'auto'
    },
    {
        selector: '#help-menu',
        message: 'Need help? Click here anytime',
        position: 'auto'
    }
];
```

### Guide for Video Player

```javascript
var guideSteps = [
    {
        selector: '.video-player',
        message: 'Watch the lesson video here',
        position: 'top'
    },
    {
        selector: '.cc-button',
        message: 'Enable captions for better understanding',
        position: 'left'
    },
    {
        selector: '.playback-speed',
        message: 'Adjust playback speed to your preference',
        position: 'right'
    }
];
```

## Demo

See `guide-demo.html` for a working example with all features demonstrated.

## Support

For issues or questions, check:
1. Browser console for JavaScript errors
2. Network tab to ensure CSS/JS files are loading
3. localStorage in DevTools Application tab
