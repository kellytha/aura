ALTER TABLE public."IncomeSource"
ADD COLUMN IF NOT EXISTS "sourceOfFunds" text NOT NULL DEFAULT 'OTHER';
