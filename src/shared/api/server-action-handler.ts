import { z } from 'zod';

export type ActionResult<T> =
  | { success: true; data: T }
  | {
      success: false;
      error: { code: string; message: string; fieldErrors?: Record<string, string[]> };
    };

// Re-throw Next.js internal redirect/not-found errors so they propagate correctly
function isNextInternalError(err: unknown): boolean {
  if (!(err instanceof Error)) return false;
  const digest = (err as { digest?: string }).digest;
  return (
    typeof digest === 'string' &&
    (digest.startsWith('NEXT_REDIRECT') || digest.startsWith('NEXT_NOT_FOUND'))
  );
}

export function serverActionHandler<TSchema extends z.ZodTypeAny, TResult>(
  schema: TSchema,
  handler: (input: z.infer<TSchema>) => Promise<TResult>,
): (input: unknown) => Promise<ActionResult<TResult>> {
  return async (input: unknown): Promise<ActionResult<TResult>> => {
    const parsed = schema.safeParse(input);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors as Record<string, string[]>;
      return {
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Validation failed', fieldErrors },
      };
    }

    try {
      const data = await handler(parsed.data as z.infer<TSchema>);
      return { success: true, data };
    } catch (err) {
      if (isNextInternalError(err)) throw err;

      if (err instanceof z.ZodError) {
        const fieldErrors = err.flatten().fieldErrors as Record<string, string[]>;
        return {
          success: false,
          error: { code: 'VALIDATION_ERROR', message: 'Validation failed', fieldErrors },
        };
      }

      console.error('[serverActionHandler]', err);
      const message = err instanceof Error ? err.message : 'Internal server error';
      return {
        success: false,
        error: { code: 'INTERNAL_ERROR', message },
      };
    }
  };
}
