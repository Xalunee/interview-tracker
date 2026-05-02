'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/shared/ui';
import { STAGES_ORDERED } from '@/entities/company';
import type { Company } from '@/entities/company/model/types';
import { createCompany } from '../api/create-company';
import { createCompanySchema } from '../model/schema';
import { COMPANY_CREATE_STRINGS as S } from '../model/strings';

// v5 @hookform/resolvers pattern: input type for fields, output type for submit handler
type FormInput = z.input<typeof createCompanySchema>;
type FormOutput = z.output<typeof createCompanySchema>;

type Props = {
  onSuccess?: () => void;
  defaultStatus?: Company['status'] | undefined;
};

export function CreateCompanyForm({ onSuccess, defaultStatus = 'wishlist' }: Props) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormInput, undefined, FormOutput>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      status: defaultStatus,
      salaryCurrency: 'RUB',
      priority: 0,
    },
  });

  const onSubmit = (data: FormOutput) => {
    startTransition(async () => {
      const result = await createCompany(data);
      if (result.success) {
        toast.success(S.successMessage);
        reset();
        onSuccess?.();
      } else {
        toast.error(result.error.message ?? S.errorMessage);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      {/* Name */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Label htmlFor="name">{S.fields.name.label}</Label>
        <Input id="name" placeholder={S.fields.name.placeholder} {...register('name')} />
        {errors.name && (
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-danger-text)' }}>
            {errors.name.message}
          </span>
        )}
      </div>

      {/* Position */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Label htmlFor="position">{S.fields.position.label}</Label>
        <Input
          id="position"
          placeholder={S.fields.position.placeholder}
          {...register('position')}
        />
        {errors.position && (
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-danger-text)' }}>
            {errors.position.message}
          </span>
        )}
      </div>

      {/* Status */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Label>{S.fields.status.label}</Label>
        <Select
          defaultValue={defaultStatus}
          onValueChange={(v) => setValue('status', v as Company['status'])}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STAGES_ORDERED.map((stage) => (
              <SelectItem key={stage.value} value={stage.value}>
                {stage.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Website */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Label htmlFor="website">{S.fields.website.label}</Label>
        <Input id="website" placeholder={S.fields.website.placeholder} {...register('website')} />
        {errors.website && (
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-danger-text)' }}>
            {errors.website.message}
          </span>
        )}
      </div>

      {/* Job URL */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Label htmlFor="jobUrl">{S.fields.jobUrl.label}</Label>
        <Input id="jobUrl" placeholder={S.fields.jobUrl.placeholder} {...register('jobUrl')} />
        {errors.jobUrl && (
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-danger-text)' }}>
            {errors.jobUrl.message}
          </span>
        )}
      </div>

      {/* Source */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Label>{S.fields.source.label}</Label>
        <Select onValueChange={(v) => setValue('source', v as NonNullable<Company['source']>)}>
          <SelectTrigger>
            <SelectValue placeholder="Не выбрано" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(S.sourceOptions).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Salary row */}
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Label htmlFor="salaryMin">{S.fields.salaryMin.label}</Label>
          <Input
            id="salaryMin"
            type="number"
            placeholder={S.fields.salaryMin.placeholder}
            {...register('salaryMin')}
          />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Label htmlFor="salaryMax">{S.fields.salaryMax.label}</Label>
          <Input
            id="salaryMax"
            type="number"
            placeholder={S.fields.salaryMax.placeholder}
            {...register('salaryMax')}
          />
        </div>
        <div style={{ width: 90, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Label>{S.fields.salaryCurrency.label}</Label>
          <Select
            defaultValue={watch('salaryCurrency') ?? 'RUB'}
            onValueChange={(v) => setValue('salaryCurrency', v as FormInput['salaryCurrency'])}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(['RUB', 'USD', 'EUR', 'KZT', 'AMD', 'GEL'] as const).map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {errors.salaryMax && (
        <span
          style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--color-danger-text)',
            marginTop: -8,
          }}
        >
          {errors.salaryMax.message}
        </span>
      )}

      {/* Tech stack */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Label htmlFor="techStack">{S.fields.techStack.label}</Label>
        <Input
          id="techStack"
          placeholder={S.fields.techStack.placeholder}
          {...register('techStack')}
        />
      </div>

      {/* Priority */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Label>{S.fields.priority.label}</Label>
        <Select defaultValue="0" onValueChange={(v) => setValue('priority', Number(v))}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(S.priorityOptions).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Notes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Label htmlFor="notes">{S.fields.notes.label}</Label>
        <Textarea
          id="notes"
          placeholder={S.fields.notes.placeholder}
          rows={3}
          {...register('notes')}
        />
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', paddingTop: 4 }}>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Добавление...' : S.submitButton}
        </Button>
      </div>
    </form>
  );
}
