import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '../../../theme/contract.css';

// Animation keyframes
const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const contentShow = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translate(-50%, -48%) scale(0.96)',
  },
  '100%': {
    opacity: 1,
    transform: 'translate(-50%, -50%) scale(1)',
  },
});

// Dialog Overlay - the backdrop
export const dialogOverlay = style({
  position: 'fixed',
  inset: 0, // Shorthand for top, right, bottom, left: 0
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
});

// Dialog Content - the modal itself
export const dialogContent = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '500px',
  maxHeight: '85vh',
  padding: '25px',
  backgroundColor: vars.color.button.light.backgroundTop,
  borderRadius: vars.radius.button,
  boxShadow: vars.shadow.button,
  border: `1px solid ${vars.color.button.light.border}`,
  animation: `${contentShow} 200ms cubic-bezier(0.16, 1, 0.3, 1)`,

  ':focus': {
    outline: 'none',
  },

  backgroundImage: `linear-gradient(to bottom, ${vars.color.button.light.backgroundTop}, ${vars.color.button.light.backgroundBottom})`,
});

// Dialog Title
export const dialogTitle = style({
  margin: 0,
  fontSize: '18px',
  fontWeight: '600',
  color: vars.color.button.light.text,
  marginBottom: '10px',
});

// Dialog Description
export const dialogDescription = style({
  margin: '10px 0 20px',
  fontSize: '14px',
  color: '#555', // Slightly lighter than the main text
  lineHeight: '1.5',
});

// Close button (X icon)
export const closeButton = style({
  position: 'absolute',
  top: '10px',
  right: '10px',
  padding: '4px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  color: vars.color.button.light.text,
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',

  // Hover state
  ':hover': {
    backgroundColor: vars.color.button.light.borderDark,
  },
});

// Button container for the bottom buttons
export const buttonContainer = style({
  display: 'flex',
  marginTop: '25px',
  justifyContent: 'flex-end',
});

// For the save button - you can reuse your existing button styles
// Just add this class to import them in your component
export const saveButton = style({});
