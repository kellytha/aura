import { useAuth } from "@clerk/expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";

const colors = {
  background: "#F7F8F3",
  green: "#175B45",
  darkGreen: "#173D32",
  muted: "#738078",
  border: "#DDE4DC",
  paleGreen: "#E8F2EB",
  white: "#FFFFFF",
};

const features = [
  {
    title: "Wallets",
    description: "Send, receive and manage everyday money with a simple, community-first wallet.",
    icon: { ios: "wallet.bifold", android: "account_balance_wallet", web: "account_balance_wallet" },
  },
  {
    title: "Retail cash-in",
    description: "Add cash at trusted retail partners and keep your money moving with confidence.",
    icon: { ios: "storefront", android: "storefront", web: "storefront" },
  },
  {
    title: "Community Stokvel saving",
    description: "Save together with your community and build money confidence through shared goals.",
    icon: { ios: "person.2.fill", android: "people", web: "people" },
  },
] as const;

export default function WelcomeScreen() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [isContinuing, setIsContinuing] = useState(false);

  const handleContinue = () => {
    setIsContinuing(true);
    router.push(isSignedIn ? "/(tabs)" : "/get-started");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.brandRow}>
          <View style={styles.brand}>
            <Image
              accessibilityLabel="Aura logo"
              source={require("../assets/images/aura-icon.png")}
              style={styles.logo}
            />
            <Text style={styles.brandName}>Aura</Text>
          </View>
          <Text style={styles.conceptLabel}>DEMO CONCEPT</Text>
        </View>

        <Text style={styles.title}>Money confidence.{"\n"}Together.</Text>
        <Text style={styles.subtitle}>
          A South African financial inclusion concept centered on wallets, retail cash-in,
          community Stokvel saving and money confidence.
        </Text>

        {features.map((feature) => (
          <View key={feature.title} style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <SymbolView name={feature.icon} size={21} tintColor={colors.green} />
            </View>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureDescription}>{feature.description}</Text>
          </View>
        ))}

        <Pressable
          accessibilityRole="button"
          disabled={!isLoaded || isContinuing}
          onPress={handleContinue}
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.pressed,
            (!isLoaded || isContinuing) && styles.disabled,
          ]}
        >
          {!isLoaded || isContinuing ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <>
              <Text style={styles.primaryButtonText}>Explore Aura</Text>
              <SymbolView
                name={{ ios: "arrow.right", android: "arrow_forward", web: "arrow_forward" }}
                size={19}
                tintColor={colors.white}
              />
            </>
          )}
        </Pressable>

        <View style={styles.notice}>
          <SymbolView
            name={{ ios: "heart", android: "favorite_border", web: "favorite_border" }}
            size={18}
            tintColor={colors.green}
          />
          <Text style={styles.noticeText}>
            A community-finance concept. Explore sample money tools; no real account or
            financial service is provided.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 24 },
  brandRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  brand: { flexDirection: "row", alignItems: "center", gap: 9 },
  logo: { width: 32, height: 32, borderRadius: 9 },
  brandName: { color: colors.darkGreen, fontSize: 20, fontWeight: "800" },
  conceptLabel: { color: colors.muted, fontSize: 10, letterSpacing: 0.3 },
  title: {
    color: colors.darkGreen,
    fontSize: 31,
    fontWeight: "800",
    lineHeight: 43,
    marginTop: 20,
  },
  subtitle: { color: colors.muted, fontSize: 14, lineHeight: 21, marginTop: 10, marginBottom: 15 },
  featureCard: {
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 17,
    backgroundColor: colors.white,
  },
  featureIcon: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 11,
    backgroundColor: colors.paleGreen,
    marginBottom: 8,
  },
  featureTitle: { color: colors.darkGreen, fontSize: 15, fontWeight: "800" },
  featureDescription: { color: colors.muted, fontSize: 12, lineHeight: 17, marginTop: 5 },
  primaryButton: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 2,
    borderRadius: 12,
    backgroundColor: colors.green,
  },
  primaryButtonText: { color: colors.white, fontSize: 15, fontWeight: "800" },
  pressed: { opacity: 0.84 },
  disabled: { opacity: 0.65 },
  notice: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    padding: 13,
    marginTop: 16,
    borderRadius: 13,
    backgroundColor: colors.paleGreen,
  },
  noticeText: { flex: 1, color: colors.green, fontSize: 11, lineHeight: 16 },
});
