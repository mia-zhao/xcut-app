import {
  Clock,
  Keyboard,
  MousePointer,
  Search,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function WhyXCut() {
  const t = useTranslations("why");

  const oldItems = t.raw("old.items") as Item[];
  const newItems = t.raw("new.items") as Item[];

  const sections: Section[] = [
    {
      title: t("old.title"),
      items: oldItems,
      icons: [MousePointer, Clock],
      colorScheme: "red",
    },
    {
      title: t("new.title"),
      items: newItems,
      icons: [Keyboard, Search],
      colorScheme: "green",
    },
  ];

  return (
    <section id="why">
      <div className="content">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-primary/10 text-primary px-4 py-2 mb-6">
            <Zap className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">{t("pill")}</span>
          </div>
          <h2 className="mb-6">{t("title")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {sections.map((section, index) => (
            <Section key={index} section={section} />
          ))}
        </div>
      </div>
    </section>
  );
}

type Item = {
  title: string;
  desc: string;
};

type Section = {
  title: string;
  items: Item[];
  icons: LucideIcon[];
  colorScheme: "red" | "green";
};

const Section = ({ section }: { section: Section }) => (
  <div className="space-y-8">
    <h3 className="text-2xl font-bold text-center lg:text-left">
      {section.title}
    </h3>
    <div className="space-y-6">
      {section.items.map((item, index) => (
        <FeatureItem
          key={index}
          item={item}
          icon={section.icons[index]}
          colorScheme={section.colorScheme}
        />
      ))}
    </div>
  </div>
);

const FeatureItem = ({
  item,
  icon: Icon,
  colorScheme,
}: {
  item: Item;
  icon: LucideIcon;
  colorScheme: "red" | "green";
}) => {
  const colors = {
    red: {
      bg: "bg-red-100 dark:bg-red-900/20",
      text: "text-red-600 dark:text-red-400",
    },
    green: {
      bg: "bg-green-100 dark:bg-green-900/20",
      text: "text-green-600 dark:text-green-400",
    },
  };

  return (
    <div className="flex items-start space-x-4">
      <div
        className={`rounded-full ${colors[colorScheme].bg} p-2 flex-shrink-0`}
      >
        <Icon className={`h-5 w-5 ${colors[colorScheme].text}`} />
      </div>
      <div>
        <h4 className="font-semibold mb-1">{item.title}</h4>
        <p className="text-sm text-muted-foreground">{item.desc}</p>
      </div>
    </div>
  );
};
