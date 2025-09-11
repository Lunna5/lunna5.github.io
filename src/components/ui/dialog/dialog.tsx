import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Button } from '../button/button';
import { dialogOverlay, dialogContent, dialogTitle, dialogDescription, closeButton } from './dialog.css';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export const DialogDemo = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant='primary'>Test Dialog</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogTitle className={dialogTitle}>Test Dialog</DialogTitle>
      <DialogDescription className={dialogDescription}>
        This is the description of the dialog. You can put any content here, including forms, text, or other components.
      </DialogDescription>
      <h3>Maybe a H3?</h3>
      <p>This is a paragraph inside the dialog content.</p>

      <DialogClose asChild className='flex'>
        <Button variant='light' size='large' className='mt-4'>
          A buttom to close the dialog
        </Button>
      </DialogClose>

      <DialogCloseButton />
    </DialogContent>
  </Dialog>
);

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;
export const DialogClose = DialogPrimitive.Close;

export const DialogContent = ({ children }: { children: ReactNode }) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className={dialogOverlay} />
    <DialogPrimitive.Content className={dialogContent}>{children}</DialogPrimitive.Content>
  </DialogPrimitive.Portal>
);

export const DialogCloseButton = ({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <DialogClose asChild>
    <button className={closeButton} aria-label='Close' {...props}>
      <Cross2Icon />
    </button>
  </DialogClose>
);
