ALTER TABLE public."Profile"
ADD COLUMN IF NOT EXISTS "clerkUserId" text;

CREATE UNIQUE INDEX IF NOT EXISTS "Profile_clerkUserId_key"
ON public."Profile" ("clerkUserId");

ALTER TABLE public."Profile" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."IncomeSource" ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public."Profile", public."IncomeSource" FROM anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public."Profile", public."IncomeSource" TO authenticated;

DROP POLICY IF EXISTS "profile_select_own_clerk_user" ON public."Profile";
CREATE POLICY "profile_select_own_clerk_user"
ON public."Profile"
FOR SELECT
TO authenticated
USING ("clerkUserId" = (SELECT auth.jwt() ->> 'sub'));

DROP POLICY IF EXISTS "profile_select_restrict_own_clerk_user" ON public."Profile";
CREATE POLICY "profile_select_restrict_own_clerk_user"
ON public."Profile"
AS RESTRICTIVE
FOR SELECT
TO authenticated
USING ("clerkUserId" = (SELECT auth.jwt() ->> 'sub'));

DROP POLICY IF EXISTS "profile_insert_own_clerk_user" ON public."Profile";
CREATE POLICY "profile_insert_own_clerk_user"
ON public."Profile"
FOR INSERT
TO authenticated
WITH CHECK ("clerkUserId" = (SELECT auth.jwt() ->> 'sub'));

DROP POLICY IF EXISTS "profile_insert_restrict_own_clerk_user" ON public."Profile";
CREATE POLICY "profile_insert_restrict_own_clerk_user"
ON public."Profile"
AS RESTRICTIVE
FOR INSERT
TO authenticated
WITH CHECK ("clerkUserId" = (SELECT auth.jwt() ->> 'sub'));

DROP POLICY IF EXISTS "profile_update_own_clerk_user" ON public."Profile";
CREATE POLICY "profile_update_own_clerk_user"
ON public."Profile"
FOR UPDATE
TO authenticated
USING ("clerkUserId" = (SELECT auth.jwt() ->> 'sub'))
WITH CHECK ("clerkUserId" = (SELECT auth.jwt() ->> 'sub'));

DROP POLICY IF EXISTS "profile_update_restrict_own_clerk_user" ON public."Profile";
CREATE POLICY "profile_update_restrict_own_clerk_user"
ON public."Profile"
AS RESTRICTIVE
FOR UPDATE
TO authenticated
USING ("clerkUserId" = (SELECT auth.jwt() ->> 'sub'))
WITH CHECK ("clerkUserId" = (SELECT auth.jwt() ->> 'sub'));

DROP POLICY IF EXISTS "income_source_select_own_clerk_user" ON public."IncomeSource";
CREATE POLICY "income_source_select_own_clerk_user"
ON public."IncomeSource"
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public."Profile" AS profile
    WHERE profile.id = "IncomeSource"."userId"
      AND profile."clerkUserId" = (SELECT auth.jwt() ->> 'sub')
  )
);

DROP POLICY IF EXISTS "income_source_select_restrict_own_clerk_user" ON public."IncomeSource";
CREATE POLICY "income_source_select_restrict_own_clerk_user"
ON public."IncomeSource"
AS RESTRICTIVE
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public."Profile" AS profile
    WHERE profile.id = "IncomeSource"."userId"
      AND profile."clerkUserId" = (SELECT auth.jwt() ->> 'sub')
  )
);

DROP POLICY IF EXISTS "income_source_insert_own_clerk_user" ON public."IncomeSource";
CREATE POLICY "income_source_insert_own_clerk_user"
ON public."IncomeSource"
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public."Profile" AS profile
    WHERE profile.id = "IncomeSource"."userId"
      AND profile."clerkUserId" = (SELECT auth.jwt() ->> 'sub')
  )
);

DROP POLICY IF EXISTS "income_source_insert_restrict_own_clerk_user" ON public."IncomeSource";
CREATE POLICY "income_source_insert_restrict_own_clerk_user"
ON public."IncomeSource"
AS RESTRICTIVE
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public."Profile" AS profile
    WHERE profile.id = "IncomeSource"."userId"
      AND profile."clerkUserId" = (SELECT auth.jwt() ->> 'sub')
  )
);

DROP POLICY IF EXISTS "income_source_update_own_clerk_user" ON public."IncomeSource";
CREATE POLICY "income_source_update_own_clerk_user"
ON public."IncomeSource"
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public."Profile" AS profile
    WHERE profile.id = "IncomeSource"."userId"
      AND profile."clerkUserId" = (SELECT auth.jwt() ->> 'sub')
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public."Profile" AS profile
    WHERE profile.id = "IncomeSource"."userId"
      AND profile."clerkUserId" = (SELECT auth.jwt() ->> 'sub')
  )
);

DROP POLICY IF EXISTS "income_source_update_restrict_own_clerk_user" ON public."IncomeSource";
CREATE POLICY "income_source_update_restrict_own_clerk_user"
ON public."IncomeSource"
AS RESTRICTIVE
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public."Profile" AS profile
    WHERE profile.id = "IncomeSource"."userId"
      AND profile."clerkUserId" = (SELECT auth.jwt() ->> 'sub')
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public."Profile" AS profile
    WHERE profile.id = "IncomeSource"."userId"
      AND profile."clerkUserId" = (SELECT auth.jwt() ->> 'sub')
  )
);
