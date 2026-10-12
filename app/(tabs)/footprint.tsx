import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";

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
  gold: "#765922",
};
const months = ["Jun", "Jul", "Aug", "Sep"];

export default function FootprintScreen() {
  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>LEARN FROM YOUR HABITS</Text>
        <Text style={styles.title}>My money footprint</Text>

        <View style={styles.notice}>
          <SymbolView name={{ ios: "leaf.fill", android: "eco", web: "eco" }} size={19} tintColor={colors.gold} />
          <Text style={styles.noticeText}>An educational demo, not a credit score. These sample habits do not guarantee a loan or approval.</Text>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <Text style={styles.heroCaption}>Thandi&apos;s community saving record</Text>
            <Text style={styles.demoBadge}>Demo data</Text>
          </View>
          <Text style={styles.heroTitle}>Steady contributions.{"\n"}A story worth keeping.</Text>
          <Text style={styles.heroFootnote}>Ubuntu Savers · June–September 2026</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>4 of 4</Text>
            <Text style={styles.statLabel}>Monthly contributions on time</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>R 3,200</Text>
            <Text style={styles.statLabel}>Contributed to Ubuntu Savers</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>A habit taking root</Text>
          <View style={styles.monthRow}>
            {months.map((month) => (
              <View key={month} style={styles.month}>
                <View style={styles.checkCircle}>
                  <SymbolView name={{ ios: "checkmark", android: "check", web: "check" }} size={15} tintColor={colors.green} />
                </View>
                <Text style={styles.monthName}>{month}</Text>
                <Text style={styles.monthAmount}>R 800</Text>
              </View>
            ))}
          </View>
          <Text style={styles.cardFootnote}>Sample contributions paid by the 25th each month.</Text>
        </View>

        <Text style={styles.sectionTitle}>Why does consistency matter?</Text>
        <Text style={styles.body}>Regular community saving can help tell a fuller money story. A lender would still apply its own checks and affordability rules.</Text>
        <View style={styles.depositNote}>
          <SymbolView name={{ ios: "wallet.bifold", android: "account_balance_wallet", web: "account_balance_wallet" }} size={18} tintColor={colors.green} />
          <Text style={styles.depositText}>3 sample cash deposits recorded. Deposits alone do not establish creditworthiness.</Text>
        </View>

        <Link href="/(tabs)/credit-score" asChild>
          <Pressable style={({ pressed }) => [styles.outlineButton, pressed && styles.pressed]}>
            <Text style={styles.outlineButtonText}>Understand your credit score</Text>
            <SymbolView name={{ ios: "arrow.right", android: "arrow_forward", web: "arrow_forward" }} size={17} tintColor={colors.green} />
          </Pressable>
        </Link>
        <Link href={{ pathname: "/(tabs)/lesson", params: { id: "emergency-savings" } }} asChild>
          <Pressable style={({ pressed }) => [styles.secondaryLink, pressed && styles.pressed]}>
            <Text style={styles.secondaryLinkText}>Learn about healthy money habits</Text>
          </Pressable>
        </Link>
        <Text style={styles.disclaimer}>All figures are demo data. Nothing is shared with a lender or credit bureau.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 28 },
  eyebrow: { color: colors.muted, fontSize: 11, letterSpacing: 0.4 },
  title: { color: colors.darkGreen, fontSize: 25, fontWeight: "800", marginTop: 5 },
  notice: { flexDirection: "row", alignItems: "flex-start", gap: 9, padding: 12, marginTop: 17, borderRadius: 14, backgroundColor: colors.yellow },
  noticeText: { flex: 1, color: colors.gold, fontSize: 12, lineHeight: 17 },
  heroCard: { padding: 16, marginTop: 17, borderRadius: 18, backgroundColor: colors.green },
  heroHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  heroCaption: { color: colors.white, fontSize: 12 },
  demoBadge: { color: colors.gold, backgroundColor: colors.yellow, overflow: "hidden", paddingHorizontal: 9, paddingVertical: 4, borderRadius: 15, fontSize: 10, fontWeight: "700" },
  heroTitle: { color: colors.white, fontSize: 23, lineHeight: 31, fontWeight: "800", marginTop: 13 },
  heroFootnote: { color: "#E3F0E9", fontSize: 11, marginTop: 8 },
  statsRow: { flexDirection: "row", gap: 10, marginTop: 14 },
  statCard: { flex: 1, minHeight: 100, justifyContent: "center", padding: 13, borderRadius: 16, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white },
  statValue: { color: colors.green, fontSize: 22, fontWeight: "800" },
  statLabel: { color: colors.muted, fontSize: 11, lineHeight: 16, marginTop: 6 },
  card: { padding: 15, marginTop: 17, borderRadius: 17, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white },
  cardTitle: { color: colors.darkGreen, fontSize: 15, fontWeight: "800" },
  monthRow: { flexDirection: "row", justifyContent: "space-around", marginTop: 13 },
  month: { alignItems: "center", gap: 5 },
  checkCircle: { width: 31, height: 31, alignItems: "center", justifyContent: "center", borderRadius: 16, backgroundColor: colors.paleGreen },
  monthName: { color: colors.darkGreen, fontSize: 11, fontWeight: "800" },
  monthAmount: { color: colors.muted, fontSize: 10 },
  cardFootnote: { color: colors.muted, fontSize: 10, marginTop: 13 },
  sectionTitle: { color: colors.darkGreen, fontSize: 16, fontWeight: "800", marginTop: 22 },
  body: { color: colors.muted, fontSize: 13, lineHeight: 19, marginTop: 7 },
  depositNote: { flexDirection: "row", alignItems: "flex-start", gap: 8, marginTop: 12 },
  depositText: { flex: 1, color: colors.muted, fontSize: 11, lineHeight: 16 },
  outlineButton: { minHeight: 49, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingHorizontal: 12, marginTop: 18, borderWidth: 1, borderColor: colors.border, borderRadius: 13, backgroundColor: colors.white },
  outlineButtonText: { color: colors.green, fontSize: 13, fontWeight: "800" },
  secondaryLink: { minHeight: 46, alignItems: "center", justifyContent: "center", marginTop: 8, borderRadius: 13, backgroundColor: colors.paleGreen },
  secondaryLinkText: { color: colors.green, fontSize: 12, fontWeight: "800" },
  disclaimer: { color: colors.muted, fontSize: 10, lineHeight: 15, textAlign: "center", marginTop: 16 },
  pressed: { opacity: 0.85 },
});