import { useAuth } from "@clerk/expo";
import { Link } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { createClerkSupabaseClient } from "@/lib/supabase";

type Option = {
  label: string;
  value: string;
};

type SelectName = "province" | "employmentStatus" | "sourceOfFunds";
type SectionIcon = "identity" | "contact" | "address" | "work";

const provinces: Option[] = [
  { label: "Eastern Cape", value: "Eastern Cape" },
  { label: "Free State", value: "Free State" },
  { label: "Gauteng", value: "Gauteng" },
  { label: "KwaZulu-Natal", value: "KwaZulu-Natal" },
  { label: "Limpopo", value: "Limpopo" },
  { label: "Mpumalanga", value: "Mpumalanga" },
  { label: "Northern Cape", value: "Northern Cape" },
  { label: "North West", value: "North West" },
  { label: "Western Cape", value: "Western Cape" },
];

const employmentStatuses: Option[] = [
  { label: "Formal employment", value: "FORMAL_EMPLOYMENT" },
  { label: "Informal trader", value: "INFORMAL_TRADER" },
  { label: "Gig worker", value: "GIG_WORKER" },
  { label: "Casual labour", value: "CASUAL_LABOR" },
  { label: "Social grant", value: "SOCIAL_GRANT" },
  { label: "Money from family abroad", value: "REMOTE_REMITTANCE" },
];

const sourcesOfFunds: Option[] = [
  { label: "Salary or wages", value: "SALARY" },
  { label: "Business income", value: "BUSINESS_INCOME" },
  { label: "Government grant", value: "GRANT" },
  { label: "Pension", value: "PENSION" },
  { label: "Family support", value: "FAMILY_SUPPORT" },
  { label: "Remittances", value: "REMITTANCE" },
  { label: "Savings or investments", value: "SAVINGS" },
  { label: "Other", value: "OTHER" },
];

const sectionIcons = {
  identity: { ios: "person.text.rectangle", android: "badge", web: "badge" },
  contact: { ios: "phone", android: "call", web: "call" },
  address: { ios: "mappin.and.ellipse", android: "location_on", web: "location_on" },
  work: { ios: "briefcase", android: "work", web: "work" },
} as const;

function getErrorMessage(error: unknown) {
  const code =
    typeof error === "object" && error !== null && "code" in error
      ? error.code
      : undefined;
  const message =
    error instanceof Error
      ? error.message
      : typeof error === "object" &&
          error !== null &&
          "message" in error &&
          typeof error.message === "string"
        ? error.message
        : "";

  if (/permission denied for (table|schema)/i.test(message)) {
    return 'Supabase denied table access. Since the SQL grants target "authenticated", check the Clerk session token includes the claim role="authenticated". In Clerk Dashboard, open Sessions > Customize session token and add that claim; keep Clerk configured as a Supabase third-party provider with the matching domain. Save, then sign out and back in. Also confirm the app uses this Supabase project’s publishable/anon key.';
  }

  if (/row-level security policy/i.test(message)) {
    return 'Supabase rejected this row using its RLS policy. Confirm the Clerk session token role is "authenticated" and that the Profile row clerkUserId exactly matches the token sub claim.';
  }

  if (/no suitable key or wrong key type/i.test(message)) {
    return "Supabase cannot validate your Clerk session token. Activate the Supabase integration in Clerk, add the matching Clerk domain under Supabase Authentication > Sign In / Providers > Clerk, and sign in again. Also confirm the app uses the Supabase publishable/anon key, not a secret or service-role key.";
  }

  if (message) return message;
  return "Please try again.";
}

function SectionCard({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle?: string;
  icon: SectionIcon;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeading}>
        <View style={styles.sectionIcon}>
          <SymbolView
            name={sectionIcons[icon]}
            size={19}
            tintColor={colors.green}
          />
        </View>
        <View style={styles.sectionHeadingText}>
          <Text style={styles.sectionTitle}>{title}</Text>
          {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
        </View>
      </View>
      {children}
    </View>
  );
}

function PreviewSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: SectionIcon;
  children: React.ReactNode;
}) {
  return (
    <SectionCard icon={icon} title={title}>
      {children}
    </SectionCard>
  );
}

function PreviewField({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.previewField}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text selectable style={styles.previewValue}>{value || "Not provided"}</Text>
    </View>
  );
}

function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  autoCapitalize = "sentences",
  maxLength,
  hint,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad" | "decimal-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  maxLength?: number;
  hint?: string;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        keyboardType={keyboardType}
        maxLength={maxLength}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        style={styles.input}
        value={value}
      />
      {hint ? <Text style={styles.fieldHint}>{hint}</Text> : null}
    </View>
  );
}

function SelectField({
  label,
  placeholder,
  options,
  value,
  open,
  onToggle,
  onSelect,
}: {
  label: string;
  placeholder: string;
  options: Option[];
  value: string;
  open: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
}) {
  const selectedLabel = options.find((option) => option.value === value)?.label;

  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${selectedLabel ?? placeholder}`}
        accessibilityState={{ expanded: open }}
        onPress={onToggle}
        style={styles.selectButton}
      >
        <Text style={selectedLabel ? styles.selectText : styles.selectPlaceholder}>
          {selectedLabel ?? placeholder}
        </Text>
        <SymbolView
          name={{ ios: "chevron.down", android: "arrow_drop_down", web: "arrow_drop_down" }}
          size={17}
          tintColor={colors.muted}
        />
      </Pressable>
      {open ? (
        <View style={styles.optionsList}>
          {options.map((option) => (
            <Pressable
              accessibilityRole="button"
              key={option.value}
              onPress={() => onSelect(option.value)}
              style={styles.option}
            >
              <Text style={styles.optionText}>{option.label}</Text>
              {option.value === value ? (
                <SymbolView
                  name={{ ios: "checkmark", android: "check", web: "check" }}
                  size={16}
                  tintColor={colors.green}
                />
              ) : null}
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const colors = {
  background: "#F7F8F3",
  card: "#FFFFFF",
  green: "#175B45",
  darkGreen: "#173D32",
  text: "#263B34",
  muted: "#738078",
  placeholder: "#99A39D",
  border: "#E1E7E1",
  input: "#F6F7F3",
  paleGreen: "#E8F2EB",
  notice: "#FFF4D5",
  noticeText: "#7A5B16",
};

export default function MyProfileScreen() {
  const { getToken, userId } = useAuth();
  const supabase = useMemo(() => createClerkSupabaseClient(getToken), [getToken]);
  const [saving, setSaving] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileLoadError, setProfileLoadError] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [openSelect, setOpenSelect] = useState<SelectName | null>(null);

  const [givenNames, setGivenNames] = useState("");
  const [surname, setSurname] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [buildingUnit, setBuildingUnit] = useState("");
  const [suburb, setSuburb] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [occupation, setOccupation] = useState("");
  const [monthlyEstimate, setMonthlyEstimate] = useState("");
  const [sourceOfFunds, setSourceOfFunds] = useState("");

  const loadProfile = useCallback(async () => {
    if (!userId) {
      setProfileLoadError("Sign in to view your profile.");
      setProfileLoading(false);
      return;
    }

    setProfileLoading(true);
    setProfileLoadError("");
    setIsPreview(false);
    setGivenNames("");
    setSurname("");
    setIdNumber("");
    setMobileNumber("");
    setEmail("");
    setStreetAddress("");
    setBuildingUnit("");
    setSuburb("");
    setCity("");
    setProvince("");
    setPostalCode("");
    setEmploymentStatus("");
    setOccupation("");
    setMonthlyEstimate("");
    setSourceOfFunds("");
    try {
      const { data: profileData, error: profileError } = await supabase
        .from("Profile")
        .select(
          "id, email, fullName, idNumber, phoneNumber, streetAddress, buildingUnit, suburb, city, province, postalCode",
        )
        .eq("clerkUserId", userId)
        .maybeSingle();

      if (profileError) throw profileError;
      if (!profileData) {
        return;
      }

      const nameParts =
        typeof profileData.fullName === "string"
          ? profileData.fullName.trim().split(/\s+/).filter(Boolean)
          : [];
      setGivenNames(nameParts.length > 1 ? nameParts.slice(0, -1).join(" ") : "");
      setSurname(nameParts.length > 1 ? nameParts[nameParts.length - 1] : nameParts[0] ?? "");
      setIdNumber(String(profileData.idNumber ?? ""));
      setMobileNumber(String(profileData.phoneNumber ?? "").replace(/^\+?27/, "").replace(/^0/, ""));
      setEmail(String(profileData.email ?? ""));
      setStreetAddress(String(profileData.streetAddress ?? ""));
      setBuildingUnit(String(profileData.buildingUnit ?? ""));
      setSuburb(String(profileData.suburb ?? ""));
      setCity(String(profileData.city ?? ""));
      setProvince(String(profileData.province ?? ""));
      setPostalCode(String(profileData.postalCode ?? ""));

      const { data: incomeData, error: incomeError } = await supabase
        .from("IncomeSource")
        .select("incomeType, employerOrBiz, monthlyEstimate, sourceOfFunds")
        .eq("userId", profileData.id)
        .limit(1)
        .maybeSingle();

      if (incomeError) throw incomeError;
      setEmploymentStatus(String(incomeData?.incomeType ?? ""));
      setOccupation(String(incomeData?.employerOrBiz ?? ""));
      setMonthlyEstimate(String(incomeData?.monthlyEstimate ?? ""));
      setSourceOfFunds(String(incomeData?.sourceOfFunds ?? ""));
      setIsPreview(true);
    } catch (error) {
      setProfileLoadError(getErrorMessage(error));
    } finally {
      setProfileLoading(false);
    }
  }, [supabase, userId]);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  const handleSaveDetails = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedId = idNumber.replace(/\D/g, "");
    let normalizedPhone = mobileNumber.replace(/\D/g, "");
    if (normalizedPhone.startsWith("27")) normalizedPhone = normalizedPhone.slice(2);
    if (normalizedPhone.startsWith("0")) normalizedPhone = normalizedPhone.slice(1);

    if (
      !givenNames.trim() ||
      !surname.trim() ||
      !streetAddress.trim() ||
      !suburb.trim() ||
      !city.trim() ||
      !province ||
      !employmentStatus ||
      !sourceOfFunds
    ) {
      Alert.alert("Missing details", "Complete all required fields before saving.");
      return;
    }

    if (normalizedId.length !== 13) {
      Alert.alert("Check your ID number", "Enter a 13-digit South African ID number.");
      return;
    }

    if (normalizedPhone.length !== 9) {
      Alert.alert("Check your mobile number", "Enter 9 digits after the +27 country code.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      Alert.alert("Check your email", "Enter a valid email address.");
      return;
    }

    if (!/^\d{4}$/.test(postalCode)) {
      Alert.alert("Check your postal code", "Enter a 4-digit South African postal code.");
      return;
    }

    if (!/^\d+(\.\d{1,2})?$/.test(monthlyEstimate.trim())) {
      Alert.alert("Check your income", "Enter a monthly amount in rand, such as 4500.");
      return;
    }

    const monthlyAmount = Number(monthlyEstimate);
    if (!Number.isFinite(monthlyAmount) || monthlyAmount < 0) {
      Alert.alert("Check your income", "Enter a valid monthly income amount.");
      return;
    }

    setSaving(true);
    let profileSaved = false;

    try {
      if (!userId) {
        throw new Error("Your session has expired. Sign in again before saving your profile.");
      }

      const { data: profileData, error: profileError } = await supabase
        .from("Profile")
        .upsert(
          {
            clerkUserId: userId,
            email: normalizedEmail,
            fullName: `${givenNames.trim()} ${surname.trim()}`,
            idNumber: normalizedId,
            phoneNumber: `+27${normalizedPhone}`,
            streetAddress: streetAddress.trim(),
            buildingUnit: buildingUnit.trim(),
            suburb: suburb.trim(),
            city: city.trim(),
            province,
            postalCode,
          },
          { onConflict: "clerkUserId" },
        )
        .select("id")
        .single();

      if (profileError) throw profileError;

      profileSaved = true;
      const incomeDetails = {
        incomeType: employmentStatus,
        employerOrBiz: occupation.trim() || "Not provided",
        monthlyEstimate: monthlyAmount,
        sourceOfFunds,
        frequency: "Monthly",
      };

      const { data: existingIncome, error: lookupError } = await supabase
        .from("IncomeSource")
        .select("id")
        .eq("userId", profileData.id)
        .limit(1)
        .maybeSingle();

      if (lookupError) throw lookupError;

      if (existingIncome) {
        const { error: incomeError } = await supabase
          .from("IncomeSource")
          .update(incomeDetails)
          .eq("id", existingIncome.id)
          .select("id")
          .single();

        if (incomeError) throw incomeError;
      } else {
        const { error: incomeError } = await supabase
          .from("IncomeSource")
          .insert({ userId: profileData.id, ...incomeDetails })
          .select("id")
          .single();

        if (incomeError) throw incomeError;
      }

      setIsPreview(true);
      Alert.alert("Details saved", "Your profile and income details were saved to Aura.");
    } catch (error) {
      const message = getErrorMessage(error);
      Alert.alert(
        profileSaved ? "Profile saved, income not saved" : "Couldn't save your details",
        message,
      );
    } finally {
      setSaving(false);
    }
  };

  const toggleSelect = (name: SelectName) => {
    setOpenSelect((current) => (current === name ? null : name));
  };

  const maskedIdNumber = idNumber
    ? `${"•".repeat(Math.max(idNumber.length - 4, 0))}${idNumber.slice(-4)}`
    : "Not provided";
  const incomeAmount = Number(monthlyEstimate);
  const formattedIncome =
    Number.isFinite(incomeAmount) && monthlyEstimate
      ? `R ${incomeAmount.toLocaleString("en-ZA", { maximumFractionDigits: 2 })} per month`
      : "Not provided";

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Link href="/(tabs)" asChild>
          <Pressable accessibilityLabel="Back to home" style={styles.backButton}>
            <SymbolView
              name={{ ios: "arrow.left", android: "arrow_back", web: "arrow_back" }}
              size={19}
              tintColor={colors.green}
            />
          </Pressable>
        </Link>
        <View style={styles.headerTitleBlock}>
          <Text style={styles.eyebrow}>YOUR ACCOUNT</Text>
          <Text style={styles.headerTitle}>My profile</Text>
        </View>
        <View style={styles.avatar}>
          <SymbolView
            name={{ ios: "person", android: "person", web: "person" }}
            size={20}
            tintColor={colors.green}
          />
        </View>
      </View>

      {profileLoading ? (
        <View style={styles.profileState}>
          <ActivityIndicator color={colors.green} />
          <Text style={styles.profileStateText}>Loading your profile…</Text>
        </View>
      ) : profileLoadError ? (
        <View style={styles.profileStateCard}>
          <Text style={styles.noticeTitle}>We couldn&apos;t load your profile</Text>
          <Text style={styles.noticeBody}>{profileLoadError}</Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => void loadProfile()}
            style={styles.retryButton}
          >
            <Text style={styles.editButtonText}>Try again</Text>
          </Pressable>
        </View>
      ) : isPreview ? (
        <>
          <Text style={styles.intro}>
            Review the details saved to your Aura profile. You can edit them whenever you need.
          </Text>

          <View style={styles.notice}>
            <SymbolView
              name={{ ios: "info.circle", android: "info", web: "info" }}
              size={17}
              tintColor={colors.noticeText}
            />
            <View style={styles.noticeCopy}>
              <Text style={styles.noticeTitle}>Profile saved · not verified</Text>
              <Text style={styles.noticeBody}>
                These details have not been verified or sent to a bank. Keep your personal
                information private.
              </Text>
            </View>
          </View>

          <PreviewSection icon="identity" title="Your identity">
            <PreviewField label="Full legal name" value={`${givenNames} ${surname}`.trim()} />
            <PreviewField label="South African ID number" value={maskedIdNumber} />
          </PreviewSection>

          <PreviewSection icon="contact" title="Contact details">
            <PreviewField label="Mobile phone number" value={`+27 ${mobileNumber}`} />
            <PreviewField label="Email address" value={email} />
          </PreviewSection>

          <PreviewSection icon="address" title="Residential address">
            <PreviewField label="Street address" value={streetAddress} />
            <PreviewField label="Unit or building" value={buildingUnit} />
            <PreviewField label="Suburb or township" value={suburb} />
            <PreviewField label="City or town" value={city} />
            <PreviewField label="Province" value={province} />
            <PreviewField label="Postal code" value={postalCode} />
            <PreviewField label="Country" value="South Africa" />
          </PreviewSection>

          <PreviewSection icon="work" title="Work & source of funds">
            <PreviewField
              label="Employment status"
              value={
                employmentStatuses.find((option) => option.value === employmentStatus)?.label ??
                employmentStatus
              }
            />
            <PreviewField label="Occupation" value={occupation} />
            <PreviewField
              label="Main source of funds"
              value={
                sourcesOfFunds.find((option) => option.value === sourceOfFunds)?.label ??
                sourceOfFunds
              }
            />
            <PreviewField label="Estimated monthly income" value={formattedIncome} />
          </PreviewSection>

          <Pressable
            accessibilityRole="button"
            onPress={() => setIsPreview(false)}
            style={({ pressed }) => [
              styles.saveButton,
              pressed && styles.saveButtonPressed,
            ]}
          >
            <Text style={styles.saveButtonText}>Edit profile</Text>
          </Pressable>
        </>
      ) : (
        <>
      <Text style={styles.intro}>
        Let&apos;s get your details together. These are some of the things a bank may ask for.
      </Text>

      <View style={styles.notice}>
        <SymbolView
          name={{ ios: "info.circle", android: "info", web: "info" }}
          size={17}
          tintColor={colors.noticeText}
        />
        <View style={styles.noticeCopy}>
          <Text style={styles.noticeTitle}>Your profile · not verified</Text>
          <Text style={styles.noticeBody}>
            Your details are saved to your Aura profile. Never share your PIN, password or
            one-time codes.
          </Text>
        </View>
      </View>

      <SectionCard
        icon="identity"
        subtitle="Use your full legal names exactly as on your ID."
        title="Your identity"
      >
        <FormField
          label="Given names (as on ID)"
          onChangeText={setGivenNames}
          placeholder="Enter all given names"
          value={givenNames}
        />
        <FormField
          label="Surname (as on ID)"
          onChangeText={setSurname}
          placeholder="Enter your surname"
          value={surname}
        />
        <FormField
          hint="Enter 13 digits, with no spaces."
          keyboardType="numeric"
          label="South African ID number"
          maxLength={13}
          onChangeText={(value) => setIdNumber(value.replace(/\D/g, "").slice(0, 13))}
          placeholder="Enter your 13-digit ID number"
          value={idNumber}
        />
      </SectionCard>

      <SectionCard
        icon="contact"
        subtitle="How you can be reached."
        title="Contact details"
      >
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Mobile phone number</Text>
          <View style={styles.phoneRow}>
            <View style={styles.phonePrefix}>
              <Text style={styles.phonePrefixText}>+27</Text>
            </View>
            <TextInput
              accessibilityLabel="Mobile phone number"
              autoCapitalize="none"
              keyboardType="phone-pad"
              onChangeText={(value) => setMobileNumber(value.replace(/[^\d+]/g, ""))}
              placeholder="Enter mobile number"
              placeholderTextColor={colors.placeholder}
              style={[styles.input, styles.phoneInput]}
              value={mobileNumber}
            />
          </View>
        </View>
        <FormField
          autoCapitalize="none"
          keyboardType="email-address"
          label="Email address"
          onChangeText={setEmail}
          placeholder="Enter your email address"
          value={email}
        />
      </SectionCard>

      <SectionCard
        icon="address"
        subtitle="Where you currently live."
        title="Residential address"
      >
        <FormField
          label="Street address"
          onChangeText={setStreetAddress}
          placeholder="House number and street name"
          value={streetAddress}
        />
        <FormField
          label="Unit or building (optional)"
          onChangeText={setBuildingUnit}
          placeholder="Flat, unit or building name"
          value={buildingUnit}
        />
        <FormField
          label="Suburb or township"
          onChangeText={setSuburb}
          placeholder="Enter suburb or township"
          value={suburb}
        />
        <FormField
          label="City or town"
          onChangeText={setCity}
          placeholder="Enter city or town"
          value={city}
        />
        <View style={styles.addressRow}>
          <View style={styles.provinceField}>
            <SelectField
              label="Province"
              onSelect={(value) => {
                setProvince(value);
                setOpenSelect(null);
              }}
              onToggle={() => toggleSelect("province")}
              open={openSelect === "province"}
              options={provinces}
              placeholder="Select province"
              value={province}
            />
          </View>
          <View style={styles.postalField}>
            <FormField
              keyboardType="numeric"
              label="Postal code"
              maxLength={4}
              onChangeText={(value) => setPostalCode(value.replace(/\D/g, "").slice(0, 4))}
              placeholder="4 digits"
              value={postalCode}
            />
          </View>
        </View>
        <View style={styles.countryRow}>
          <Text style={styles.fieldLabel}>Country</Text>
          <View style={styles.countryValue}>
            <Text style={styles.selectText}>South Africa</Text>
          </View>
        </View>
      </SectionCard>

      <SectionCard
        icon="work"
        subtitle="A little about where your money comes from."
        title="Work & source of funds"
      >
        <SelectField
          label="Employment status"
          onSelect={(value) => {
            setEmploymentStatus(value);
            setOpenSelect(null);
          }}
          onToggle={() => toggleSelect("employmentStatus")}
          open={openSelect === "employmentStatus"}
          options={employmentStatuses}
          placeholder="Select employment status"
          value={employmentStatus}
        />
        <FormField
          label="Occupation (if applicable)"
          onChangeText={setOccupation}
          placeholder="Job, trade or type of work"
          value={occupation}
        />
        <SelectField
          label="Main source of funds"
          onSelect={(value) => {
            setSourceOfFunds(value);
            setOpenSelect(null);
          }}
          onToggle={() => toggleSelect("sourceOfFunds")}
          open={openSelect === "sourceOfFunds"}
          options={sourcesOfFunds}
          placeholder="Select source of funds"
          value={sourceOfFunds}
        />
        <Text style={styles.fieldHint}>
          For example: salary, business income, a grant, pension or family support.
        </Text>
        <FormField
          keyboardType="decimal-pad"
          label="Estimated monthly income (ZAR)"
          onChangeText={(value) => setMonthlyEstimate(value.replace(/[^\d.]/g, ""))}
          placeholder="e.g. 4500"
          value={monthlyEstimate}
        />
      </SectionCard>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>A starting point, not a bank approval</Text>
        <Text style={styles.infoText}>
          A bank may ask for more information or documents, such as your ID or proof of
          address. Requirements vary by bank.
        </Text>
      </View>

      <View style={styles.privacy}>
        <Text style={styles.privacyTitle}>Your details are personal</Text>
        <Text style={styles.privacyText}>
          Only share them through official channels. Never share your PIN, password or OTP.
        </Text>
        <Text style={styles.helpText}>
          Need help? Ask your bank which details and documents they accept.
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        disabled={saving}
        onPress={handleSaveDetails}
        style={({ pressed }) => [
          styles.saveButton,
          pressed && !saving ? styles.saveButtonPressed : null,
          saving ? styles.saveButtonDisabled : null,
        ]}
      >
        {saving ? (
          <ActivityIndicator color={colors.card} />
        ) : (
          <Text style={styles.saveButtonText}>Save details</Text>
        )}
      </Pressable>
      <Text style={styles.footerNote}>
        Your details are saved to Aura and aren&apos;t sent to a bank automatically.
      </Text>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 32,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerTitleBlock: {
    flex: 1,
    marginLeft: 10,
  },
  eyebrow: {
    color: colors.muted,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.7,
  },
  headerTitle: {
    color: colors.darkGreen,
    fontSize: 23,
    fontWeight: "800",
  },
  avatar: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#F5D978",
  },
  intro: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 14,
  },
  profileState: {
    minHeight: 180,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  profileStateText: {
    color: colors.muted,
    fontSize: 13,
  },
  profileStateCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    backgroundColor: colors.card,
  },
  retryButton: {
    minHeight: 42,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    borderRadius: 10,
    backgroundColor: colors.paleGreen,
  },
  editButtonText: {
    color: colors.green,
    fontSize: 13,
    fontWeight: "800",
  },
  previewField: {
    paddingVertical: 7,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  previewValue: {
    color: colors.darkGreen,
    fontSize: 13,
    lineHeight: 19,
  },
  notice: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    padding: 11,
    marginBottom: 14,
    borderRadius: 12,
    backgroundColor: colors.notice,
  },
  noticeCopy: {
    flex: 1,
  },
  noticeTitle: {
    color: colors.noticeText,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 3,
  },
  noticeBody: {
    color: "#78683B",
    fontSize: 10,
    lineHeight: 15,
  },
  sectionCard: {
    padding: 12,
    marginBottom: 13,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9,
  },
  sectionIcon: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    borderRadius: 9,
    backgroundColor: colors.paleGreen,
  },
  sectionHeadingText: {
    flex: 1,
  },
  sectionTitle: {
    color: colors.darkGreen,
    fontSize: 14,
    fontWeight: "800",
  },
  sectionSubtitle: {
    color: colors.muted,
    fontSize: 10,
    marginTop: 2,
  },
  field: {
    marginTop: 7,
  },
  fieldLabel: {
    color: colors.text,
    fontSize: 10,
    fontWeight: "700",
    marginBottom: 5,
  },
  input: {
    minHeight: 39,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.input,
    color: colors.text,
    fontSize: 12,
  },
  fieldHint: {
    color: colors.muted,
    fontSize: 9,
    lineHeight: 13,
    marginTop: 5,
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  phonePrefix: {
    minWidth: 42,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
    borderRadius: 10,
    backgroundColor: colors.paleGreen,
  },
  phonePrefixText: {
    color: colors.green,
    fontSize: 12,
    fontWeight: "700",
  },
  phoneInput: {
    flex: 1,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  provinceField: {
    flex: 1,
  },
  postalField: {
    width: 100,
  },
  selectButton: {
    minHeight: 39,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.input,
  },
  selectText: {
    color: colors.text,
    fontSize: 11,
  },
  selectPlaceholder: {
    color: colors.placeholder,
    fontSize: 11,
  },
  optionsList: {
    marginTop: 5,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  option: {
    minHeight: 38,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  optionText: {
    color: colors.text,
    fontSize: 11,
  },
  countryRow: {
    marginTop: 10,
  },
  countryValue: {
    minHeight: 39,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.input,
  },
  infoCard: {
    padding: 12,
    marginBottom: 13,
    borderRadius: 13,
    backgroundColor: colors.paleGreen,
  },
  infoTitle: {
    color: colors.green,
    fontSize: 11,
    fontWeight: "800",
    marginBottom: 4,
  },
  infoText: {
    color: "#567267",
    fontSize: 10,
    lineHeight: 15,
  },
  privacy: {
    marginBottom: 14,
  },
  privacyTitle: {
    color: colors.text,
    fontSize: 11,
    fontWeight: "800",
    marginBottom: 4,
  },
  privacyText: {
    color: colors.muted,
    fontSize: 10,
    lineHeight: 14,
  },
  helpText: {
    color: colors.green,
    fontSize: 10,
    lineHeight: 14,
    marginTop: 5,
  },
  saveButton: {
    minHeight: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 11,
    backgroundColor: colors.green,
  },
  saveButtonPressed: {
    opacity: 0.85,
  },
  saveButtonDisabled: {
    opacity: 0.65,
  },
  saveButtonText: {
    color: colors.card,
    fontSize: 14,
    fontWeight: "800",
  },
  footerNote: {
    color: colors.muted,
    fontSize: 9,
    textAlign: "center",
    marginTop: 9,
  },
});
