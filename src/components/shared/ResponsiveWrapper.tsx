'use client';

import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function ResponsiveWrapper({ children }: Props) {
  return (
    <div className="responsive-container">
      {children}
    </div>
  );
}
