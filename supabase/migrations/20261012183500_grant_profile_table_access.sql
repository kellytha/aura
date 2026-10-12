GRANT USAGE ON SCHEMA public TO authenticated;

GRANT SELECT, INSERT, UPDATE
ON TABLE public."Profile", public."IncomeSource"
TO authenticated;

REVOKE ALL
ON TABLE public."Profile", public."IncomeSource"
FROM anon;
