'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui';
import type { Company } from '@/entities/company/model/types';
import { COMPANY_CREATE_STRINGS as S } from '../model/strings';
import { CreateCompanyForm } from './CreateCompanyForm';

type Props = {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultStatus?: Company['status'];
};

export function CreateCompanyDialog({ children, open, onOpenChange, defaultStatus }: Props) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const setOpen = isControlled ? (onOpenChange ?? (() => {})) : setInternalOpen;

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent style={{ maxWidth: 540, maxHeight: '90vh', overflowY: 'auto' }}>
        <DialogHeader>
          <DialogTitle>{S.dialogTitle}</DialogTitle>
          <DialogDescription>{S.dialogDescription}</DialogDescription>
        </DialogHeader>
        <CreateCompanyForm
          defaultStatus={defaultStatus ?? undefined}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
