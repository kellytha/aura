import { SymbolView } from "expo-symbols";
import { useRouter } from "expo-router";
import { useSSO } from "@clerk/expo";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

WebBrowser.maybeCompleteAuthSession();

type AuthPageProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
  onBack: () => void;
};

type OAuthStrategy = "oauth_google" | "oauth_apple";

const palette = {
  background: "#F7F8F3",
  white: "#FFFFFF",
  green: "#175B45",
  darkGreen: "#173D32",
  text: "#263B34",
  muted: "#738078",
  border: "#DDE4DC",
  paleGreen: "#E8F2EB",
  paleYellow: "#FFF3D4",
  red: "#A33932",
};

export function AuthPage({ eyebrow, title, children, onBack }: AuthPageProps) {
  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.page}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Pressable
            accessibilityLabel="Go back"
            accessibilityRole="button"
            onPress={onBack}
            style={styles.backButton}
          >
            <SymbolView
              name={{ ios: "arrow.left", android: "arrow_back", web: "arrow_back" }}
              size={19}
              tintColor={palette.green}
            />
          </Pressable>
          <View>
            <Text style={styles.eyebrow}>{eyebrow}</Text>
            <Text style={styles.headerTitle}>{title}</Text>
          </View>
        </View>
        <Image
          accessibilityLabel="Aura — Empowering Your Wealth"
          resizeMode="contain"
          source={require("../../assets/images/aura.jpg")}
          style={styles.logo}
        />
        {children}
        <Text style={styles.brand}>Empowering Your Wealth</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export function AuthHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <View style={styles.heading}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

export function OAuthButtons() {
  const { startSSOFlow } = useSSO();
  const router = useRouter();
  const [loadingStrategy, setLoadingStrategy] = useState<OAuthStrategy | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (Platform.OS !== "android") return;
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);

  const handleOAuth = async (strategy: OAuthStrategy) => {
    setLoadingStrategy(strategy);
    setErrorMessage("");

    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        ...(Platform.OS === "web"
          ? {}
          : {
              redirectUrl: AuthSession.makeRedirectUri({
                scheme: "mobile",
                path: "oauth-native-callback",
              }),
            }),
      });

      if (!createdSessionId) {
        setErrorMessage("Sign-in wasn't completed. Please try again.");
        return;
      }
      if (!setActive) {
        throw new Error("Clerk did not return a session activation handler.");
      }

      await setActive({ session: createdSessionId });
      router.replace("/(tabs)");
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error));
    } finally {
      setLoadingStrategy(null);
    }
  };

  return (
    <View style={styles.oauthContainer}>
      <Text style={styles.continueLabel}>Continue with</Text>
      <View style={styles.oauthRow}>
        <Pressable
          accessibilityRole="button"
          disabled={loadingStrategy !== null}
          onPress={() => void handleOAuth("oauth_google")}
          style={({ pressed }) => [
            styles.oauthButton,
            pressed && styles.pressed,
            loadingStrategy !== null && styles.disabled,
          ]}
        >
          {loadingStrategy === "oauth_google" ? (
            <ActivityIndicator color={palette.green} />
          ) : (
            <Text style={styles.googleMark}>G</Text>
          )}
          <Text style={styles.oauthText}>
            {loadingStrategy === "oauth_google" ? "Opening…" : "Google"}
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          disabled={loadingStrategy !== null}
          onPress={() => void handleOAuth("oauth_apple")}
          style={({ pressed }) => [
            styles.oauthButton,
            pressed && styles.pressed,
            loadingStrategy !== null && styles.disabled,
          ]}
        >
          {loadingStrategy === "oauth_apple" ? (
            <ActivityIndicator color={palette.green} />
          ) : (
            <SymbolView
              name={{ ios: "apple.logo", android: "phone_iphone", web: "phone_iphone" }}
              size={19}
              tintColor={palette.darkGreen}
            />
          )}
          <Text style={styles.oauthText}>
            {loadingStrategy === "oauth_apple" ? "Opening…" : "Apple"}
          </Text>
        </Pressable>
      </View>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
}

export function OrDivider() {
  return (
    <View style={styles.divider}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerText}>or</Text>
      <View style={styles.dividerLine} />
    </View>
  );
}

export function EmailInput({
  email,
  setEmail,
}: {
  email: string;
  setEmail: (value: string) => void;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>Email address</Text>
      <View style={styles.emailInputWrap}>
        <SymbolView
          name={{ ios: "envelope", android: "mail", web: "mail" }}
          size={19}
          tintColor={palette.green}
        />
        <TextInput
          accessibilityLabel="Email address"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="Enter your email address"
          placeholderTextColor={palette.muted}
          returnKeyType="done"
          style={styles.emailInput}
          textContentType="emailAddress"
          value={email}
        />
      </View>
      <Text style={styles.hint}>Use an email address you can open now.</Text>
    </View>
  );
}

export function PrimaryButton({
  title,
  loading,
  disabled,
  onPress,
}: {
  title: string;
  loading: boolean;
  disabled?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.primaryButton,
        pressed && !loading && styles.pressed,
        (disabled || loading) && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={palette.white} />
      ) : (
        <>
          <Text style={styles.primaryButtonText}>{title}</Text>
          <SymbolView
            name={{ ios: "arrow.right", android: "arrow_forward", web: "arrow_forward" }}
            size={19}
            tintColor={palette.white}
          />
        </>
      )}
    </Pressable>
  );
}

export function SecurityNotice() {
  return (
    <View style={styles.securityCard}>
      <SymbolView
        name={{ ios: "checkmark.shield", android: "verified_user", web: "verified_user" }}
        size={20}
        tintColor={palette.green}
      />
      <View style={styles.securityCopy}>
        <Text style={styles.securityTitle}>Your code is just for you</Text>
        <Text style={styles.securityText}>
          Never share a sign-in code. We won&apos;t ask for it in a call or message.
        </Text>
      </View>
    </View>
  );
}

export function AuthError({ message }: { message: string }) {
  if (!message) return null;
  return <Text accessibilityRole="alert" style={styles.error}>{message}</Text>;
}

export function getAuthErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "object" && error !== null && "errors" in error) {
    const errors = error.errors;
    if (Array.isArray(errors) && errors.length > 0) {
      const firstError = errors[0];
      if (
        typeof firstError === "object" &&
        firstError !== null &&
        "longMessage" in firstError &&
        typeof firstError.longMessage === "string"
      ) {
        return firstError.longMessage;
      }
      if (
        typeof firstError === "object" &&
        firstError !== null &&
        "message" in firstError &&
        typeof firstError.message === "string"
      ) {
        return firstError.message;
      }
    }
  }
  return "Something went wrong. Please try again.";
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  page: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 22,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.white,
  },
  eyebrow: {
    color: palette.muted,
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.6,
  },
  headerTitle: {
    color: palette.darkGreen,
    fontSize: 23,
    fontWeight: "800",
  },
  logo: {
    width: 180,
    height: 98,
    alignSelf: "flex-start",
    marginTop: 24,
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: "#06261E",
  },
  heading: {
    marginBottom: 24,
  },
  title: {
    color: palette.darkGreen,
    fontSize: 27,
    lineHeight: 34,
    fontWeight: "800",
    marginBottom: 9,
  },
  description: {
    color: palette.muted,
    fontSize: 14,
    lineHeight: 21,
  },
  oauthContainer: {
    marginBottom: 18,
  },
  continueLabel: {
    color: palette.muted,
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 10,
  },
  oauthRow: {
    flexDirection: "row",
    gap: 12,
  },
  oauthButton: {
    flex: 1,
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.white,
  },
  googleMark: {
    color: "#4285F4",
    fontSize: 21,
    fontWeight: "800",
  },
  oauthText: {
    color: palette.text,
    fontSize: 14,
    fontWeight: "700",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: palette.border,
  },
  dividerText: {
    color: palette.muted,
    fontSize: 12,
  },
  field: {
    marginBottom: 14,
  },
  label: {
    color: palette.text,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 8,
  },
  emailInputWrap: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 13,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: palette.green,
    backgroundColor: palette.white,
  },
  emailInput: {
    flex: 1,
    minHeight: 52,
    paddingVertical: 8,
    color: palette.text,
    fontSize: 14,
  },
  hint: {
    color: palette.muted,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 8,
  },
  primaryButton: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 2,
    borderRadius: 12,
    backgroundColor: palette.green,
  },
  primaryButtonText: {
    color: palette.white,
    fontSize: 15,
    fontWeight: "800",
  },
  pressed: {
    opacity: 0.78,
  },
  disabled: {
    opacity: 0.6,
  },
  legal: {
    color: palette.muted,
    fontSize: 11,
    lineHeight: 17,
    marginTop: 15,
  },
  securityCard: {
    flexDirection: "row",
    gap: 10,
    padding: 14,
    marginTop: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.white,
  },
  securityCopy: {
    flex: 1,
  },
  securityTitle: {
    color: palette.text,
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 5,
  },
  securityText: {
    color: palette.muted,
    fontSize: 12,
    lineHeight: 17,
  },
  brand: {
    color: palette.muted,
    fontSize: 10,
    textAlign: "center",
    marginTop: 20,
  },
  error: {
    color: palette.red,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    marginVertical: 14,
  },
  linkText: {
    color: palette.muted,
    fontSize: 12,
  },
  link: {
    color: palette.green,
    fontSize: 12,
    fontWeight: "800",
  },
  codeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 7,
    marginBottom: 10,
  },
  codeCell: {
    flex: 1,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.white,
  },
  codeCellActive: {
    borderWidth: 1.5,
    borderColor: palette.green,
  },
  codeDigit: {
    color: palette.darkGreen,
    fontSize: 23,
    fontWeight: "700",
  },
  codeInput: {
    ...StyleSheet.absoluteFill,
    opacity: 0.02,
    color: "transparent",
  },
  resend: {
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  resendText: {
    color: palette.green,
    fontSize: 13,
    fontWeight: "700",
  },
  editEmail: {
    color: palette.green,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 7,
  },
  emailAddress: {
    color: palette.darkGreen,
    fontSize: 14,
    fontWeight: "700",
  },
  resendHint: {
    color: palette.muted,
    fontSize: 12,
    textAlign: "center",
    marginTop: 18,
  },
  footerNote: {
    color: palette.muted,
    fontSize: 10,
    lineHeight: 15,
    textAlign: "center",
    marginTop: 16,
  },
  safety: {
    flexDirection: "row",
    gap: 9,
    padding: 12,
    marginTop: 20,
    borderRadius: 13,
    backgroundColor: palette.paleGreen,
  },
  safetyText: {
    flex: 1,
    color: palette.green,
    fontSize: 11,
    lineHeight: 16,
  },
  verifySpacer: {
    flex: 1,
    minHeight: 24,
  },
});

export const authStyles = StyleSheet.create({
  field: styles.field,
  label: styles.label,
  hint: styles.hint,
  linkRow: styles.linkRow,
  linkText: styles.linkText,
  link: styles.link,
  legal: styles.legal,
  error: styles.error,
  codeRow: styles.codeRow,
  codeCell: styles.codeCell,
  codeCellActive: styles.codeCellActive,
  codeDigit: styles.codeDigit,
  codeInput: styles.codeInput,
  resend: styles.resend,
  resendText: styles.resendText,
  editEmail: styles.editEmail,
  emailAddress: styles.emailAddress,
  resendHint: styles.resendHint,
  footerNote: styles.footerNote,
  safety: styles.safety,
  safetyText: styles.safetyText,
  verifySpacer: styles.verifySpacer,
});
