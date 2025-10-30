import { ThemeSwitcher } from "@/components/theme-switcher";
import { ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center gap-8 p-4">
        <Text className="text-2xl font-bold text-foreground">
          Uniwind Theme Bug Reproduction
        </Text>

        <View className="w-full p-4 bg-card rounded-lg border border-border">
          <ThemeSwitcher />
        </View>

        <View className="w-full gap-4 p-4 bg-card rounded-lg border border-border">
          <View className="gap-4">
            <Text className="text-lg font-semibold text-card-foreground">
              Bug Reproduction Steps:
            </Text>
            <Text className="text-sm text-muted-foreground">
              1. Start with device in dark mode{"\n"}
              2. Switch to &quot;System&quot; theme (works fine){"\n"}
              3. Try to switch to &quot;Dark&quot; standalone theme{"\n"}
              4. Bug: The app breaks/crashes{"\n"}
              {"\n"}
              Note: Switching from &quot;System&quot; (dark device) to
              &quot;Light&quot; works fine.
            </Text>
          </View>

          <View className="gap-2 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
            <Text className="text-sm font-semibold text-destructive">
              Actual Behavior:
            </Text>
            <Text className="text-xs text-muted-foreground">
              {`When switching from "System" theme to a standalone theme that matches the device theme (e.g., System with dark device → Dark standalone), the app breaks. Switching to the opposite theme (System with dark device → Light standalone) works correctly.`}
            </Text>
          </View>

          <View className="gap-2 p-4 bg-muted rounded-lg">
            <Text className="text-sm font-semibold text-foreground">
              Expected Behavior:
            </Text>
            <Text className="text-xs text-muted-foreground">
              You should be able to switch from &quot;System&quot; theme to any
              standalone theme (Light or Dark), regardless of the device&apos;s
              current theme.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
