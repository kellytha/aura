import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";

import { LessonLanguagePicker } from "@/components/LessonLanguagePicker";
import { lessons } from "@/lib/lesson-content";
import { useLessonLanguage } from "@/lib/lesson-language";

const colors = {
  background: "#F7F8F3",
  green: "#175B45",
  darkGreen: "#173D32",
  muted: "#738078",
  border: "#DDE4DC",
  white: "#FFFFFF",
  yellow: "#FFF3D4",
  gold: "#765922",
};

export default function LessonsScreen() {
  const { language } = useLessonLanguage();
  const [featured, ...remaining] = lessons;

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>LEARN TOGETHER</Text>
        <Text style={styles.title}>Financial literacy</Text>
        <Text style={styles.subtitle}>Small lessons. More confident money choices.</Text>

        <Text style={styles.languageTitle}>Choose your language</Text>
        <LessonLanguagePicker />

        <Link href={{ pathname: "/(tabs)/lesson", params: { id: featured.id } }} asChild>
          <Pressable style={({ pressed }) => [styles.featuredCard, pressed && styles.pressed]}>
            <View style={styles.featuredMeta}>
              <Text style={styles.featuredEyebrow}>A GOOD PLACE TO START</Text>
              <Text style={styles.timeBadge}>{featured.minutes} min · Read</Text>
            </View>
            <Text style={styles.featuredTitle}>{featured.title[language]}</Text>
            <Text numberOfLines={3} style={styles.featuredBody}>{featured.body[language]}</Text>
            <View style={styles.startButton}>
              <Text style={styles.startText}>Start lesson</Text>
              <SymbolView name={{ ios: "arrow.right", android: "arrow_forward", web: "arrow_forward" }} size={17} tintColor={colors.green} />
            </View>
          </Pressable>
        </Link>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Keep learning</Text>
          <Text style={styles.count}>{lessons.length} beginner lessons</Text>
        </View>
        {remaining.map((lesson) => (
          <Link
            key={lesson.id}
            href={{ pathname: "/(tabs)/lesson", params: { id: lesson.id } }}
            asChild
          >
            <Pressable style={({ pressed }) => [styles.lessonCard, pressed && styles.pressed]}>
              <Text style={styles.lessonTitle}>{lesson.title[language]}</Text>
              <Text numberOfLines={3} style={styles.lessonBody}>{lesson.body[language]}</Text>
              <View style={styles.lessonFooter}>
                <Text style={styles.lessonMeta}>{lesson.minutes} min · Read</Text>
                <View style={styles.lessonAction}>
                  <Text style={styles.lessonActionText}>Start lesson</Text>
                  <SymbolView name={{ ios: "arrow.right", android: "arrow_forward", web: "arrow_forward" }} size={15} tintColor={colors.green} />
                </View>
              </View>
            </Pressable>
          </Link>
        ))}

        <View style={styles.note}>
          <Text style={styles.noteTitle}>One small step at a time.</Text>
          <Text style={styles.noteBody}>General learning, not personal financial advice. Rand amounts are illustrative examples.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 28 },
  eyebrow: { color: colors.muted, fontSize: 11, letterSpacing: 0.4 },
  title: { color: colors.darkGreen, fontSize: 25, fontWeight: "800", marginTop: 5 },
  subtitle: { color: colors.muted, fontSize: 13, marginTop: 5, marginBottom: 17 },
  languageTitle: { color: colors.darkGreen, fontSize: 13, fontWeight: "800", marginBottom: 7 },
  featuredCard: { padding: 16, marginTop: 13, borderRadius: 17, backgroundColor: colors.green },
  featuredMeta: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  featuredEyebrow: { color: "#E3F0E9", fontSize: 10, letterSpacing: 0.3 },
  timeBadge: { color: colors.gold, backgroundColor: colors.yellow, overflow: "hidden", paddingHorizontal: 9, paddingVertical: 4, borderRadius: 15, fontSize: 10, fontWeight: "700" },
  featuredTitle: { color: colors.white, fontSize: 20, fontWeight: "800", marginTop: 11 },
  featuredBody: { color: "#E3F0E9", fontSize: 12, lineHeight: 18, marginTop: 6 },
  startButton: { minHeight: 44, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7, marginTop: 12, borderRadius: 11, backgroundColor: colors.white },
  startText: { color: colors.green, fontSize: 12, fontWeight: "800" },
  sectionHeading: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 22, marginBottom: 10 },
  sectionTitle: { color: colors.darkGreen, fontSize: 17, fontWeight: "800" },
  count: { color: colors.green, fontSize: 11 },
  lessonCard: { padding: 14, marginBottom: 10, borderRadius: 16, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white },
  lessonTitle: { color: colors.darkGreen, fontSize: 14, fontWeight: "800" },
  lessonBody: { color: colors.muted, fontSize: 11, lineHeight: 16, marginTop: 5 },
  lessonFooter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 },
  lessonMeta: { color: colors.muted, fontSize: 10 },
  lessonAction: { flexDirection: "row", alignItems: "center", gap: 4 },
  lessonActionText: { color: colors.green, fontSize: 11, fontWeight: "800" },
  note: { padding: 13, marginTop: 3, borderRadius: 13, backgroundColor: colors.yellow },
  noteTitle: { color: colors.darkGreen, fontSize: 12, fontWeight: "800" },
  noteBody: { color: colors.gold, fontSize: 11, lineHeight: 16, marginTop: 4 },
  pressed: { opacity: 0.85 },
});