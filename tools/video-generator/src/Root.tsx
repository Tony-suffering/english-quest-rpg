import "./index.css";
import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import { RenovationReveal, renovationSchema } from "./RenovationReveal";
import { DiagnosticScanner, diagnosticSchema } from "./DiagnosticScanner";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DiagnosticScanner"
        component={DiagnosticScanner}
        durationInFrames={210} // 7 seconds
        fps={30}
        width={1920}
        height={1080}
        schema={diagnosticSchema}
        defaultProps={{
          beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1920&h=1080&fit=crop",
          afterImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1920&h=1080&fit=crop",
          scanPoints: [
            { x: 500, y: 700, label: "FLOOR DAMAGE" },
            { x: 1200, y: 400, label: "WALL CRACKS" },
            { x: 800, y: 300, label: "MOISTURE" }
          ]
        }}
      />

      <Composition
        id="RenovationReveal"
        component={RenovationReveal}
        durationInFrames={250} // ~8 seconds
        fps={30}
        width={1920}
        height={1080}
        schema={renovationSchema}
        defaultProps={{
          beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1920&h=1080&fit=crop", // Dark/Old room
          afterImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1920&h=1080&fit=crop", // Bright/New room
          title: "Living Room Renewal",
          price: "¥3,500,000",
          features: ["全面クロス張り替え", "間接照明導入"],
          accentColor: "#D4AF37",
        }}
      />

      <Composition
        // You can take the "id" to render a video:
        // npx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />

      {/* Mount any React component to make it show up in the sidebar and work on it individually! */}
      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />
    </>
  );
};
