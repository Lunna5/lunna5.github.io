import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../theme/contract.css';

export const buttonGroup = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
});

const base = style({
  display: 'inline-flex',
  padding: '4px 12px',
  fontSize: 14,
  lineHeight: 1.4,
  textAlign: 'center',
  textShadow: '0 1px 1px rgba(255, 255, 255, 0.5)',
  borderRadius: vars.radius.button,
  border: '1px solid transparent',
  boxShadow: vars.shadow.button,
  cursor: 'pointer',
  transition: 'background-position 0.3s ease, box-shadow 0.2s ease, transform 0.15s ease',
  ':hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 6px rgba(0,0,0,0.15)',
  },
  ':active': {
    transform: 'translateY(0)',
    boxShadow: '0 2px 3px rgba(0,0,0,0.2)',
  },

  selectors: {
    [`${buttonGroup} &`]: {
      borderRadius: 0,
      marginLeft: -1,
    },
    [`${buttonGroup} &:first-child`]: {
      borderTopLeftRadius: vars.radius.button,
      borderBottomLeftRadius: vars.radius.button,
      marginLeft: 0,
    },
    [`${buttonGroup} &:last-child`]: {
      borderTopRightRadius: vars.radius.button,
      borderBottomRightRadius: vars.radius.button,
    },
    [`${buttonGroup} &:hover`]: {
      zIndex: 1, // Bring hovered button above others
    },
  },
});

export const buttonColor = styleVariants({
  primary: {
    color: vars.color.button.primary.text,
    background: `linear-gradient(to bottom, ${vars.color.button.primary.backgroundTop}, ${vars.color.button.primary.backgroundBottom})`,
    borderColor: vars.color.button.primary.border,
    borderBottomColor: vars.color.button.primary.borderDark,
  },
  lavender: {
    color: vars.color.button.lavender.text,
    background: `linear-gradient(to bottom, ${vars.color.button.lavender.backgroundTop}, ${vars.color.button.lavender.backgroundBottom})`,
    borderColor: vars.color.button.lavender.border,
  },
  light: {
    color: vars.color.button.light.text,
    background: `linear-gradient(to bottom, ${vars.color.button.light.backgroundTop}, ${vars.color.button.light.backgroundBottom})`,
    borderColor: vars.color.button.light.border,
  },
});

export const buttonStyle = styleVariants({
  normal: [base],
  small: [
    base,
    {
      padding: '2px 8px',
      fontSize: 12,
    },
  ],
  large: [
    base,
    {
      padding: '6px 16px',
      fontSize: 16,
    },
  ],
});
