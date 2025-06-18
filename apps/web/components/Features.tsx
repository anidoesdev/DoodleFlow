// import { Card, CardContent } from "@/components/ui/card";
import { Palette, Zap, Users, Share2 } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Palette,
      title: "Simple Drawing Tools",
      description: "Basic brushes, shapes, and colors. Everything you need to get creative without the complexity.",
      gradient: "from-teal-400 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Super Fast",
      description: "No loading screens, no lag. Just open and start drawing immediately.",
      gradient: "from-cyan-400 to-teal-500"
    },
    {
      icon: Users,
      title: "Draw Together",
      description: "Invite friends to doodle together in real-time. Perfect for brainstorming or just having fun.",
      gradient: "from-teal-500 to-cyan-600"
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Share your creations with a simple link or download as an image.",
      gradient: "from-cyan-500 to-teal-600"
    }
  ];

  // Local Card and CardContent components
  function Card({ className, children }: { className?: string; children: React.ReactNode }) {
    return <div className={className}>{children}</div>;
  }
  function CardContent({ className, children }: { className?: string; children: React.ReactNode }) {
    return <div className={className}>{children}</div>;
  }

  return (
    <section id="features" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer bg-gray-800/50 backdrop-blur border border-teal-500/20">
              <CardContent className="p-8">
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-100 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
