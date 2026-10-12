import { useClerk, useUser } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";

import { LessonLanguagePicker } from "@/components/LessonLanguagePicker";
import { useLessonLanguage } from "@/lib/lesson-language";
import { lessons } from "@/lib/lesson-content";

const colors = {
  background: "#F7F8F3",
  green: "#175B45",
  darkGreen: "#173D32",
  text: "#263B34",
  muted: "#738078",
  border: "#DDE4DC",
  paleGreen: "#E8F2EB",
  white: "#FFFFFF",
  yellow: "#FFF3D4",
};

function formatRand(amount: number) {
  return `R ${amount.toLocaleString("en-ZA")}`;
}

export default function HomeScreen() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const { language } = useLessonLanguage();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const featuredLesson = lessons[0];

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      router.replace("/sign-in");
    } catch (error) {
      Alert.alert(
        "Couldn't sign out",
        error instanceof Error ? error.message : "Please try again.",
      );
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>AURA · MONEY CONFIDENCE</Text>
            <Text style={styles.title}>Hello{user?.firstName ? `, ${user.firstName}` : ""}</Text>
          </View>
          <View style={styles.headerActions}>
            <Link href="/(tabs)/profile" asChild>
              <Pressable accessibilityRole="button" accessibilityLabel="Open profile" style={styles.profileButton}>
                <SymbolView
                  name={{ ios: "person.crop.circle", android: "account_circle", web: "account_circle" }}
                  size={25}
                  tintColor={colors.green}
                />
              </Pressable>
            </Link>
            <Pressable
              accessibilityRole="button"
              disabled={isSigningOut}
              onPress={() => void handleSignOut()}
              style={styles.signOutButton}
            >
              {isSigningOut ? (
                <ActivityIndicator size="small" color={colors.green} />
              ) : (
                <Text style={styles.signOutText}>Sign out</Text>
              )}
            </Pressable>
          </View>
        </View>
        <Text style={styles.subtitle}>Small steps can build healthier money habits.</Text>

        <Link href="/(tabs)/credit-score" asChild>
          <Pressable style={({ pressed }) => [styles.scoreCard, pressed && styles.pressed]}>
            <View style={styles.scoreHeading}>
              <Text style={styles.scoreLabel}>UNDERSTAND YOUR CREDIT</Text>
              <Text style={styles.demoBadge}>Demo</Text>
            </View>
            <View style={styles.scoreRow}>
              <Text style={styles.score}>680</Text>
              <View>
                <Text style={styles.scoreRating}>Good</Text>
                <Text style={styles.scoreNote}>on this example scale</Text>
              </View>
            </View>
            <View style={styles.scoreTrack}>
              <View style={styles.scoreFill} />
            </View>
            <Text style={styles.scoreFootnote}>Illustrative only · no credit bureau is connected</Text>
          </Pressable>
        </Link>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Financial literacy</Text>
          <Link href="/(tabs)/lessons" style={styles.viewAll}>All lessons</Link>
        </View>
        <View style={styles.languageCard}>
          <Text style={styles.languageLabel}>Choose your lesson language</Text>
          <LessonLanguagePicker />
        </View>
        <Link href={{ pathname: "/(tabs)/lesson", params: { id: featuredLesson.id } }} asChild>
          <Pressable style={({ pressed }) => [styles.featuredLesson, pressed && styles.pressed]}>
            <View style={styles.featuredTop}>
              <Text style={styles.featuredEyebrow}>A GOOD PLACE TO START</Text>
              <Text style={styles.timeBadge}>{featuredLesson.minutes} min · Read</Text>
            </View>
            <Text style={styles.featuredTitle}>{featuredLesson.title[language]}</Text>
            <Text numberOfLines={3} style={styles.featuredBody}>{featuredLesson.body[language]}</Text>
            <View style={styles.startButton}>
              <Text style={styles.startText}>Start budgeting lesson</Text>
              <SymbolView name={{ ios: "arrow.right", android: "arrow_forward", web: "arrow_forward" }} size={17} tintColor={colors.green} />
            </View>
          </Pressable>
        </Link>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Your money footprint</Text>
          <Link href="/(tabs)/footprint" style={styles.viewAll}>View details</Link>
        </View>
        <Link href="/(tabs)/footprint" asChild>
          <Pressable style={({ pressed }) => [styles.footprintCard, pressed && styles.pressed]}>
            <View style={styles.footprintIcon}>
              <SymbolView name={{ ios: "leaf.fill", android: "eco", web: "eco" }} size={21} tintColor={colors.green} />
            </View>
            <View style={styles.footprintText}>
              <Text style={styles.footprintTitle}>Steady contributions. A story worth keeping.</Text>
              <Text style={styles.footprintSubtitle}>4 of 4 sample contributions on time</Text>
            </View>
            <Text style={styles.footprintAmount}>{formatRand(3200)}</Text>
          </Pressable>
        </Link>

        <Link href="/(tabs)/cash-in" asChild>
          <Pressable style={styles.quickLink}>
            <View style={styles.quickIcon}>
              <SymbolView name={{ ios: "wallet.bifold", android: "account_balance_wallet", web: "account_balance_wallet" }} size={20} tintColor={colors.green} />
            </View>
            <View style={styles.quickText}>
              <Text style={styles.quickTitle}>Explore cash-in</Text>
              <Text style={styles.quickCaption}>See how a future retail deposit could work</Text>
            </View>
            <SymbolView name={{ ios: "chevron.right", android: "chevron_right", web: "chevron_right" }} size={17} tintColor={colors.green} />
          </Pressable>
        </Link>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>All figures are demo data. No cash is accepted or moved by this concept.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingTop: 15, paddingBottom: 28 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerActions: { flexDirection: "row", alignItems: "center", gap: 8 },
  eyebrow: { color: colors.muted, fontSize: 11, letterSpacing: 0.5, fontWeight: "600" },
  title: { color: colors.darkGreen, fontSize: 25, fontWeight: "800", marginTop: 5 },
  subtitle: { color: colors.muted, fontSize: 13, lineHeight: 19, marginTop: 5, marginBottom: 16 },
  profileButton: { width: 45, height: 45, alignItems: "center", justifyContent: "center", borderRadius: 15, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white },
  signOutButton: { minHeight: 40, justifyContent: "center", paddingHorizontal: 11, borderRadius: 12, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white },
  signOutText: { color: colors.green, fontSize: 11, fontWeight: "700" },
  scoreCard: { padding: 16, borderRadius: 18, backgroundColor: colors.green },
  scoreHeading: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  scoreLabel: { color: colors.white, fontSize: 11, letterSpacing: 0.4 },
  demoBadge: { color: "#765922", backgroundColor: colors.yellow, overflow: "hidden", paddingHorizontal: 9, paddingVertical: 4, borderRadius: 15, fontSize: 10, fontWeight: "700" },
  scoreRow: { flexDirection: "row", alignItems: "center", gap: 11, marginTop: 8 },
  score: { color: colors.white, fontSize: 43, fontWeight: "800" },
  scoreRating: { color: colors.white, fontSize: 18, fontWeight: "800" },
  scoreNote: { color: "#E3F0E9", fontSize: 11, marginTop: 2 },
  scoreTrack: { height: 8, borderRadius: 5, backgroundColor: "#E3F0E9", marginTop: 8, overflow: "hidden" },
  scoreFill: { width: "71%", height: "100%", borderRadius: 5, backgroundColor: "#E7B960" },
  scoreFootnote: { color: "#E3F0E9", fontSize: 10, marginTop: 8 },
  sectionHeading: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 22, marginBottom: 10 },
  sectionTitle: { color: colors.darkGreen, fontSize: 17, fontWeight: "800" },
  viewAll: { color: colors.green, fontSize: 12, fontWeight: "700" },
  languageCard: { padding: 13, borderRadius: 15, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white },
  languageLabel: { color: colors.text, fontSize: 12, fontWeight: "700", marginBottom: 9 },
  featuredLesson: { marginTop: 10, padding: 16, borderRadius: 17, backgroundColor: colors.green },
  featuredTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  featuredEyebrow: { color: "#E3F0E9", fontSize: 10, letterSpacing: 0.3 },
  timeBadge: { color: "#765922", backgroundColor: colors.yellow, overflow: "hidden", paddingHorizontal: 9, paddingVertical: 4, borderRadius: 15, fontSize: 10, fontWeight: "700" },
  featuredTitle: { color: colors.white, fontSize: 20, fontWeight: "800", marginTop: 11 },
  featuredBody: { color: "#E3F0E9", fontSize: 12, lineHeight: 18, marginTop: 6 },
  startButton: { minHeight: 44, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7, marginTop: 12, borderRadius: 11, backgroundColor: colors.white },
  startText: { color: colors.green, fontSize: 12, fontWeight: "800" },
  footprintCard: { flexDirection: "row", alignItems: "center", gap: 11, padding: 14, borderRadius: 15, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white },
  footprintIcon: { width: 39, height: 39, alignItems: "center", justifyContent: "center", borderRadius: 12, backgroundColor: colors.paleGreen },
  footprintText: { flex: 1 },
  footprintTitle: { color: colors.darkGreen, fontSize: 13, fontWeight: "800", lineHeight: 18 },
  footprintSubtitle: { color: colors.muted, fontSize: 11, marginTop: 4 },
  footprintAmount: { color: colors.green, fontSize: 14, fontWeight: "800" },
  quickLink: { flexDirection: "row", alignItems: "center", gap: 11, padding: 13, marginTop: 10, borderRadius: 15, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border },
  quickIcon: { width: 38, height: 38, alignItems: "center", justifyContent: "center", borderRadius: 12, backgroundColor: colors.paleGreen },
  quickText: { flex: 1 },
  quickTitle: { color: colors.darkGreen, fontSize: 13, fontWeight: "800" },
  quickCaption: { color: colors.muted, fontSize: 11, marginTop: 3 },
  disclaimer: { padding: 12, marginTop: 13, borderRadius: 12, backgroundColor: colors.yellow },
  disclaimerText: { color: "#765922", fontSize: 11, lineHeight: 16 },
  pressed: { opacity: 0.85 },
});
