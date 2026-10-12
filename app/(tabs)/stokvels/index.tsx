import { Link } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";

import { stokvelGroups, totalUserContributions } from "@/lib/stokvel-data";

const colors = {
  background: "#F7F8F3",
  green: "#175B45",
  darkGreen: "#173D32",
  text: "#263B34",
  muted: "#738078",
  border: "#DDE4DC",
  paleGreen: "#E8F2EB",
  white: "#FFFFFF",
};

function formatRand(amount: number, decimals = 0) {
  return `R ${amount.toLocaleString("en-ZA", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

export default function StokvelsScreen() {
  const [showExploreNote, setShowExploreNote] = useState(false);

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>SAVE TOGETHER</Text>
        <Text style={styles.title}>My stokvels</Text>

        <View style={styles.totalCard}>
          <View style={styles.totalHeader}>
            <Text style={styles.totalCaption}>My contributions across 2 groups</Text>
            <Text style={styles.demoBadge}>Demo data</Text>
          </View>
          <Text style={styles.totalAmount}>{formatRand(totalUserContributions, 2)}</Text>
          <Text style={styles.totalFootnote}>
            Your contribution record, not a withdrawable balance.
          </Text>
        </View>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Your saving circles</Text>
          <Text style={styles.groupCount}>2 groups</Text>
        </View>

        {stokvelGroups.map((group) => {
          const progress = Math.min(group.paidThisMonth / group.monthlyTarget, 1);
          return (
            <Link
              asChild
              href={{ pathname: "/stokvels/[id]", params: { id: group.id } }}
              key={group.id}
            >
              <Pressable
                accessibilityRole="link"
                accessibilityLabel={`${group.name}, group balance ${formatRand(group.balance)}`}
                style={({ pressed }) => [styles.groupCard, pressed && styles.pressed]}
              >
                <View style={styles.groupHeading}>
                  <View style={styles.groupIcon}>
                    <SymbolView
                      name={{ ios: "person.2.fill", android: "people", web: "people" }}
                      size={21}
                      tintColor={colors.green}
                    />
                  </View>
                  <View style={styles.groupTitleBlock}>
                    <Text style={styles.groupName}>{group.name}</Text>
                    <Text style={styles.groupSubhead}>
                      {group.memberCount} members · {group.purpose}
                    </Text>
                  </View>
                  <SymbolView
                    name={{ ios: "chevron.right", android: "chevron_right", web: "chevron_right" }}
                    size={17}
                    tintColor={colors.green}
                  />
                </View>

                <View style={styles.balanceRow}>
                  <Text style={styles.balance}>{formatRand(group.balance)}</Text>
                  <Text style={styles.balanceCaption}>Group balance</Text>
                </View>

                <View
                  accessibilityLabel={`${Math.round(progress * 100)} percent of monthly group contributions`}
                  style={styles.progressTrack}
                >
                  <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
                </View>
                <Text style={styles.progressCaption}>
                  {formatRand(group.paidThisMonth)} of {formatRand(group.monthlyTarget)} · {group.month}
                </Text>

                <View style={styles.nextRow}>
                  <SymbolView
                    name={{ ios: "calendar", android: "calendar_month", web: "calendar_month" }}
                    size={16}
                    tintColor={colors.green}
                  />
                  <Text style={styles.nextText}>
                    Your next: {formatRand(group.nextContribution)} · {group.nextDate}
                  </Text>
                </View>
              </Pressable>
            </Link>
          );
        })}

        <Pressable
          accessibilityRole="button"
          onPress={() => setShowExploreNote((visible) => !visible)}
          style={({ pressed }) => [styles.exploreButton, pressed && styles.pressed]}
        >
          <Text style={styles.exploreText}>Explore joining a stokvel</Text>
          <SymbolView
            name={{ ios: "person.2", android: "people", web: "people" }}
            size={19}
            tintColor={colors.green}
          />
        </Pressable>
        {showExploreNote ? (
          <Text style={styles.exploreNote}>
            Stokvel discovery and joining are not available in this demo.
          </Text>
        ) : null}

        <View style={styles.infoBox}>
          <SymbolView
            name={{ ios: "heart", android: "favorite_border", web: "favorite_border" }}
            size={18}
            tintColor={colors.green}
          />
          <Text style={styles.infoText}>
            Shared goals, clear records. Group rules and contribution decisions stay with members.
            All balances and records shown are demo data.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 24 },
  eyebrow: { color: colors.muted, fontSize: 12, letterSpacing: 0.5 },
  title: { color: colors.darkGreen, fontSize: 25, fontWeight: "800", marginTop: 5 },
  totalCard: {
    marginTop: 22,
    padding: 16,
    borderRadius: 17,
    backgroundColor: colors.green,
  },
  totalHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  totalCaption: { color: colors.white, fontSize: 13 },
  demoBadge: {
    color: "#765922",
    backgroundColor: "#FFF3D4",
    borderRadius: 20,
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 11,
    fontWeight: "700",
  },
  totalAmount: { color: colors.white, fontSize: 33, fontWeight: "800", marginTop: 12 },
  totalFootnote: { color: "#E3F0E9", fontSize: 12, marginTop: 8 },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 22,
    marginBottom: 10,
  },
  sectionTitle: { color: colors.darkGreen, fontSize: 17, fontWeight: "800" },
  groupCount: { color: colors.green, fontSize: 12, fontWeight: "700" },
  groupCard: {
    marginBottom: 12,
    padding: 15,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  pressed: { opacity: 0.82 },
  groupHeading: { flexDirection: "row", alignItems: "center" },
  groupIcon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: colors.paleGreen,
  },
  groupTitleBlock: { flex: 1, marginLeft: 10 },
  groupName: { color: colors.darkGreen, fontSize: 15, fontWeight: "800" },
  groupSubhead: { color: colors.muted, fontSize: 11, marginTop: 3 },
  balanceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginTop: 10,
  },
  balance: { color: colors.darkGreen, fontSize: 27, fontWeight: "800" },
  balanceCaption: { color: colors.muted, fontSize: 11 },
  progressTrack: {
    height: 8,
    overflow: "hidden",
    borderRadius: 8,
    backgroundColor: colors.paleGreen,
    marginTop: 8,
  },
  progressFill: { height: "100%", borderRadius: 8, backgroundColor: colors.green },
  progressCaption: { color: colors.muted, fontSize: 11, marginTop: 7 },
  nextRow: { flexDirection: "row", alignItems: "center", gap: 7, marginTop: 12 },
  nextText: { color: colors.green, fontSize: 12, fontWeight: "700" },
  exploreButton: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 7,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 13,
    backgroundColor: colors.white,
  },
  exploreText: { color: colors.green, fontSize: 14, fontWeight: "700" },
  exploreNote: { color: colors.muted, fontSize: 12, textAlign: "center", marginTop: 9 },
  infoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginTop: 18,
    padding: 13,
    borderRadius: 13,
    backgroundColor: colors.paleGreen,
  },
  infoText: { flex: 1, color: colors.green, fontSize: 11, lineHeight: 16 },
});
