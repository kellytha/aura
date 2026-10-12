import { ScrollView, StyleSheet, Text, Pressable } from "react-native";

import { lessonLanguages } from "@/lib/lesson-content";
import { useLessonLanguage } from "@/lib/lesson-language";

export function LessonLanguagePicker() {
  const { language, setLanguage } = useLessonLanguage();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
      accessibilityLabel="Choose lesson language"
    >
      {lessonLanguages.map((option) => {
        const selected = option.code === language;
        return (
          <Pressable
            key={option.code}
            accessibilityRole="radio"
            accessibilityState={{ checked: selected }}
            onPress={() => setLanguage(option.code)}
            style={[styles.option, selected && styles.selected]}
          >
            <Text style={[styles.label, selected && styles.selectedLabel]}>{option.name}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { gap: 8, paddingVertical: 3 },
  option: {
    minHeight: 36,
    justifyContent: "center",
    paddingHorizontal: 13,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DDE4DC",
    backgroundColor: "#FFFFFF",
  },
  selected: { borderColor: "#175B45", backgroundColor: "#E8F2EB" },
  label: { color: "#52645B", fontSize: 12, fontWeight: "600" },
  selectedLabel: { color: "#175B45", fontWeight: "800" },
});
