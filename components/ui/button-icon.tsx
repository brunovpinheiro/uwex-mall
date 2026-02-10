import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils/cn';

const buttonIconVariants = cva(
  'inline-flex items-center justify-center rounded-[12px] transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        solid: 'bg-primary text-primary-foreground hover:bg-primary-hover',
        outline:
          'border border-border bg-background text-foreground hover:bg-secondary',
        ghost: 'text-foreground hover:bg-secondary',
      },
      size: {
        lg: 'size-12',
        md: 'size-10',
        sm: 'size-8',
        xs: 'size-6',
      },
    },
    defaultVariants: {
      variant: 'solid',
      size: 'lg',
    },
  }
);

const iconSizeMap = {
  lg: 'size-6',
  md: 'size-6',
  sm: 'size-4',
  xs: 'size-3',
} as const;

export interface ButtonIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonIconVariants> {
  asChild?: boolean;
  icon: React.ReactNode;
}

const ButtonIcon = React.forwardRef<HTMLButtonElement, ButtonIconProps>(
  ({ className, variant, size, asChild = false, icon, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    const resolvedSize = size ?? 'lg';

    return (
      <Comp
        className={cn(buttonIconVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className={cn('shrink-0', iconSizeMap[resolvedSize])}>
          {icon}
        </span>
      </Comp>
    );
  }
);
ButtonIcon.displayName = 'ButtonIcon';

export { ButtonIcon, buttonIconVariants };
