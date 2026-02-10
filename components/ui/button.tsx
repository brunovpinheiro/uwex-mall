import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-semibold rounded-[12px] transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary-hover',
        outline:
          'border border-border bg-background text-foreground hover:bg-secondary',
        ghost: 'text-foreground hover:bg-secondary',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        lg: 'h-12 px-6 py-3 text-base gap-2',
        default: 'h-10 px-5 py-2 text-base gap-2',
        sm: 'h-8 px-4 py-1.5 text-[13px] gap-1',
        xs: 'h-6 px-3 py-2 text-[11px] gap-1',
        icon: 'h-10 w-10',
      },
      iconPosition: {
        none: '',
        left: '',
        right: '',
      },
    },
    compoundVariants: [
      // Left icon: less left padding, more right padding
      { iconPosition: 'left', size: 'lg', className: 'pl-[18px] pr-6' },
      { iconPosition: 'left', size: 'default', className: 'pl-4 pr-5' },
      { iconPosition: 'left', size: 'sm', className: 'pl-3 pr-4' },
      { iconPosition: 'left', size: 'xs', className: 'pl-2 pr-3' },
      // Right icon: more left padding, less right padding
      { iconPosition: 'right', size: 'lg', className: 'pl-6 pr-[18px]' },
      { iconPosition: 'right', size: 'default', className: 'pl-5 pr-4' },
      { iconPosition: 'right', size: 'sm', className: 'pl-4 pr-3' },
      { iconPosition: 'right', size: 'xs', className: 'pl-3 pr-2' },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      iconPosition: 'none',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, iconPosition, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, iconPosition, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
